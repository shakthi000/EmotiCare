import eventlet
eventlet.monkey_patch()

from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from flask import redirect, url_for, session
from flask_oauthlib.client import OAuth
from flask_socketio import SocketIO, emit, join_room

from datetime import datetime
from collections import defaultdict
import requests
import os 

from dotenv import load_dotenv
load_dotenv()

# 🔧 Flask Setup
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "shakthiSuperSecretKey123")
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

oauth = OAuth(app)
print("🔐 CLIENT_ID:", os.getenv("GOOGLE_CLIENT_ID"))
print("🔐 CLIENT_SECRET:", os.getenv("GOOGLE_CLIENT_SECRET"))


google = oauth.remote_app(
    'google',
    consumer_key=os.getenv("GOOGLE_CLIENT_ID"),
    consumer_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    request_token_params={
        'scope': 'email profile',
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# In-memory DB
users_db = {
    "patients": [],
    "therapists": [{"email": "therapist@emoticare.com", "password": "therapist@123"}],
    "admins": [{"email": "admin@emoticare.com", "password": "admin@123"}],
    "assessment_data": {},
    "mood_history": {}
}
user_profiles = {}
user_otp_store = {}

# 🔐 Auth
def find_user(email, role):
    return next((user for user in users_db[role] if user["email"] == email), None)

# OAuth (Google)
@app.route('/api/auth/google')
def google_login():
    return google.authorize(callback=url_for('google_callback', _external=True))

@app.route('/api/auth/google/callback')
def google_callback():
    resp = google.authorized_response()
    if resp is None or resp.get('access_token') is None:
        return 'Access denied', 400

    session['google_token'] = (resp['access_token'], '')
    user_info = google.get('userinfo')
    email = user_info.data['email']

    # Auto-register if not exists
    if not find_user(email, 'patients'):
        users_db['patients'].append({'email': email, 'password': 'oauth'})
        user_profiles[email] = {
            "firstName": email.split('@')[0].capitalize(), "lastName": "",
            "email": email, "phone": "", "birth": "", "gender": ""
        }

    return redirect(f'http://localhost:5000/assessment/step1')  # Or any frontend page

@google.tokengetter
def get_google_oauth_token():
    return session.get('google_token')

# Forgot Password Modal
@app.route("/api/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Check if email exists in any user role
    user_exists = any(
        email == user["email"]
        for role in ["patients", "therapists", "admins"]
        for user in users_db[role]
    )

    if not user_exists:
        return jsonify({"error": "Email not registered"}), 404

    # Simulate OTP generation and email sending
    otp = str(random.randint(100000, 999999))
    user_otp_store[email] = otp
    print(f"🔐 OTP for {email}: {otp}")  # You can later replace with actual email service

    return jsonify({"message": "OTP sent to your email!"}), 200

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    email, password, role = data.get("email"), data.get("password"), data.get("role")
    if find_user(email, role):
        return jsonify({"error": "User already exists"}), 409
    users_db[role].append({"email": email, "password": password})
    user_profiles[email] = {
        "firstName": email.split('@')[0].capitalize(),
        "lastName": "", "username": "", "email": email,
        "phone": "", "birth": "", "gender": ""
    }
    return jsonify({"message": f"{role[:-1].capitalize()} signed up successfully ✅!"}), 201

@app.route("/api/signin", methods=["POST"])
def signin():
    data = request.json
    email, password, role = data.get("email"), data.get("password"), data.get("role")
    user = find_user(email, role)
    if not user or user["password"] != password:
        return jsonify({"error": "Invalid credentials"}), 401
    return jsonify({"message": f"{role[:-1].capitalize()} signed in ✅", "user_id": email}), 200

# 🧠 Step handler (1–14)
def handle_step(user_id, step_key, value):
    if not user_id or value is None:
        return False
    users_db["assessment_data"].setdefault(user_id, {})[step_key] = value
    return True

# Step 1–14 Routes
for i in range(1, 15):
    step_key = f"step{i}"
    field = (
        "goal" if i == 1 else "gender" if i == 2 else "age" if i == 3 else
        "weight" if i == 4 else "mood" if i == 5 else "sought_help" if i == 6 else
        "physical_distress" if i == 7 else "sleep_quality" if i == 8 else
        "medication_status" if i == 9 else "tags" if i == 10 else "symptoms" if i == 11 else
        "stress" if i == 12 else "phrase" if i == 13 else "expression"
    )

    if i == 5:
        def mood_route(i=i):
            def inner():
                data = request.json
                user_id, mood = data.get("user_id"), data.get("mood")
                if not handle_step(user_id, f"step{i}", mood):
                    return jsonify({"error": "Missing data"}), 400
                users_db["mood_history"].setdefault(user_id, []).append({
                    "mood": mood,
                    "timestamp": datetime.now().isoformat()
                })
                return jsonify({"message": "Mood saved"}), 200
            return inner
        app.add_url_rule(f"/api/step{i}", f"step{i}", mood_route(), methods=["POST"])
    else:
        app.add_url_rule(f"/api/step{i}", f"step{i}",
                         lambda i=i, f=field: _handle_step_route(f"step{i}", f),
                         methods=["POST"])

def _handle_step_route(step_key, field):
    data = request.json
    user_id, value = data.get("user_id"), data.get(field)
    if not handle_step(user_id, step_key, value):
        return jsonify({"error": f"Missing user_id or {field}"}), 400
    return jsonify({"message": f"{step_key} saved"}), 200

# 📊 Analytics
@app.route("/api/patient/analytics", methods=["GET"])
def analytics():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    mood_map = {'Very Sad': 1, 'Down': 2, 'Neutral': 3, 'Okay': 4, 'Great': 5}
    history = users_db["mood_history"].get(user_id, [])
    sorted_moods = sorted(history, key=lambda x: x["timestamp"])

    mood_week = [m["mood"] for m in sorted_moods[-7:]]

    monthly_moods = defaultdict(list)
    for m in sorted_moods:
        dt = datetime.fromisoformat(m["timestamp"])
        month_index = dt.month - 1
        score = mood_map.get(m["mood"], 3)
        monthly_moods[month_index].append(score)

    monthly_scores = []
    for i in range(12):
        scores = monthly_moods.get(i, [])
        avg = round(sum(scores) / len(scores), 2) if scores else 0
        monthly_scores.append(avg)

    current_data = users_db["assessment_data"].get(user_id, {})
    return jsonify({
        "mood_week": mood_week,
        "monthly_mood_scores": monthly_scores,
        "mood_label": current_data.get("step5", "Neutral"),
        "sleep_quality": current_data.get("step8", "Unknown"),
        "stress_level": current_data.get("step12", 3)
    }), 200

# 👤 Profile
@app.route("/api/patient/profile", methods=["GET"])
def get_profile():
    user_id = request.args.get("user_id")
    return jsonify(user_profiles.get(user_id, {})), 200

@app.route("/api/patient/profile", methods=["POST"])
def update_profile():
    data = request.json
    user_id = data.get("user_id")
    profile_data = data.get("profile", {})
    user_profiles[user_id] = profile_data
    return jsonify({"message": "Profile updated!"}), 200

# 🏠 Dashboard data
@app.route("/api/patient-dashboard", methods=["GET"])
def dashboard():
    user_id = request.args.get("user_id")
    profile = user_profiles.get(user_id, {})
    data = users_db["assessment_data"].get(user_id, {})
    mood = data.get("step5", "Neutral")
    mood_emoji = {"Very Sad": "😞", "Down": "😔", "Neutral": "😐", "Okay": "🙂", "Great": "😄"}.get(mood, "😐")

    return jsonify({
        "name": profile.get("firstName", "User"),
        "tier": "Golden",
        "highlights": [
            {"date": "28 Jun", "desc": f"Feeling '{mood}'", "emoji": mood_emoji},
            {"date": "17 Apr", "desc": "Completed Final Year Project", "emoji": "🎓"},
            {"date": "14 Apr", "desc": "Joined EMOTICARE", "emoji": "💜"}
        ],
        "schedule": {
            "time": "Today, 4:30 pm",
            "meeting": "Meeting with Dr. Chan",
            "location": "EMOTICARE Medical Center"
        }
    }), 200

# ---------------- Therapist APIs ---------------- #
# 🤖 Therapist AI Chat
@app.route("/api/chat/therapist", methods=["POST"])
def chat_therapist():
    data = request.json
    message = data.get("message")
    if not message:
        return jsonify({"error": "Message required"}), 400

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "mistralai/mistral-7b-instruct:free",  # You can try other free models too
                "messages": [
                    {"role": "system", "content": "You are a kind and helpful therapist."},
                    {"role": "user", "content": message}
                ]
            }
        )

        print("🔎 AI Response Status:", response.status_code)
        print("🧾 AI Response Body:", response.text)

        res_data = response.json()
        if "choices" in res_data:
            reply = res_data["choices"][0]["message"]["content"]
            return jsonify({ "reply": reply })
        else:
            return jsonify({ "error": res_data.get("error", "No reply returned") }), 500

    except Exception as e:
        print("🔥 AI Exception:", e)
        return jsonify({ "error": str(e) }), 500


# 🔁 Therapist map of patient names to their user_id/email

therapist_patient_map = {
    "SHAKTHI": "shakthi@demo.com", 
    "SANJAY": "sanjay@demo.com",
    "VIGNESH": "vignesh@demo.com",
    "YUVASRI": "yuvasri@demo.com",
}


@app.route("/api/therapist/analytics", methods=["GET"])
def get_patient_analytics():
    patient_name = request.args.get("name")
    user_id = therapist_patient_map.get(patient_name.upper())
    if not user_id:
        return jsonify({"error": "Invalid patient name"}), 400
    request.args = request.args.copy()
    request.args["user_id"] = user_id
    return analytics()

# ---------------- Admin APIs ---------------- #

@app.route("/api/admin/dashboard", methods=["GET"])
def get_admin_dashboard():
    total_patients = len(users_db["patients"])
    active_patients = int(total_patients * 1)  # example calculation
    new_patients = int(total_patients * 0.24)     # example calculation

    return jsonify({
        "total": total_patients,
        "active": active_patients,
        "new": new_patients
    })


@app.route("/api/admin/patients", methods=["GET", "POST"])
def manage_patients():
    if request.method == "GET":
        names = [user["email"].split('@')[0].capitalize() for user in users_db["patients"]]
        return jsonify(names)

    if request.method == "POST":
        data = request.json
        name = data.get("name")
        if not name:
            return jsonify({"error": "Name required"}), 400
        email = f"{name.lower()}@gmail.com"
        password = f"{name.lower()}@123"
        if find_user(email, "patients"):
            return jsonify({"error": "Patient already exists"}), 409
        users_db["patients"].append({"email": email, "password": password})
        user_profiles[email] = {
            "firstName": name, "lastName": "", "username": "",
            "email": email, "phone": "", "birth": "", "gender": ""
        }
        return jsonify({"message": "Patient added"}), 201


@app.route("/api/admin/therapists", methods=["GET", "POST"])
def manage_therapists():
    if request.method == "GET":
        return jsonify([
            {"name": t["email"].split('@')[0].capitalize(), "role": "Therapist"}
            for t in users_db["therapists"]
        ])

    if request.method == "POST":
        data = request.json
        name = data.get("name")
        role = data.get("role", "Therapist")
        if not name:
            return jsonify({"error": "Name required"}), 400
        email = f"{name.lower()}@gmail.com"
        if find_user(email, "therapists"):
            return jsonify({"error": "Therapist already exists"}), 409
        users_db["therapists"].append({"email": email, "password": "therapist@123"})
        return jsonify({"message": "Therapist added"}), 201


@app.route("/api/admin/reports", methods=["GET"])
def admin_reports():
    return jsonify({
        "therapists": len(users_db["therapists"]),
        "patients": len(users_db["patients"]),
        "satisfaction": "85%",
        "growth": "+5%",
        "chart": [25, 30, 35]  # Jan, Feb, Mar sample
    })

# --------------------------------------------
# 🔄 Real-Time Chat: Therapist ⇄ Patient
# --------------------------------------------

@socketio.on("join")
def join_room_event(data):
    join_room(data["room"])
    emit("message", {
        "from": "system", "text": f"{data['username']} joined the room."
    }, to=data["room"])

@socketio.on("send_message")
def send_message(data):
    emit("message", {
        "from": data["sender"],
        "text": data["text"]
    }, to=data["room"])

# --------------------------------------------
# 🏁 Run the Server
# --------------------------------------------

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', debug=True, port=5000, use_reloader=False)