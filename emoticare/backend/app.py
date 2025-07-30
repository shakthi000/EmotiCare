import eventlet
eventlet.monkey_patch()

from flask import Flask, request, jsonify, redirect, url_for, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from authlib.integrations.flask_client import OAuth
from authlib.common.security import generate_token
from flask_socketio import SocketIO, emit, join_room
from dotenv import load_dotenv
import random, requests, os
from datetime import datetime
from collections import defaultdict

from langchain.memory import ConversationBufferMemory
from langchain.schema import HumanMessage, AIMessage
from langchain.chat_models import ChatOpenAI

# In-memory Chat Logs
chat_memory_store = {
    "ai_chats": {},         # key: user_id, value: list of (user, ai) tuples
    "therapist_chats": {}   # key: room, value: list of (sender, text)
}

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "super-secret")
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///emoticare.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), nullable=False)
db.init_app(app)

with app.app_context():
    db.create_all()
socketio = SocketIO(app, cors_allowed_origins="*")

# --- Authlib OAuth Setup ---
oauth = OAuth(app)
app.config['GOOGLE_CLIENT_ID'] = os.getenv("GOOGLE_CLIENT_ID")
app.config['GOOGLE_CLIENT_SECRET'] = os.getenv("GOOGLE_CLIENT_SECRET")
app.config['SESSION_COOKIE_SAMESITE'] = "Lax"

google = oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    access_token_url='https://oauth2.googleapis.com/token',
    authorize_url='https://accounts.google.com/o/oauth2/v2/auth',
    api_base_url='https://www.googleapis.com/oauth2/v2/',
    client_kwargs={
        'scope': 'openid email profile',
        'access_type': 'offline'
    },
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    # Optional override (can help fix metadata fetch issues)
    userinfo_endpoint='https://www.googleapis.com/oauth2/v3/userinfo'
)


# In-memory DB
users_db = {
    "patients": [],
    "therapists": [],
    "admins": [],
    "assessment_data": {},
    "mood_history": {},
    "ai_chat_history": defaultdict(list),
    "therapist_chat_history": defaultdict(list)
}
user_profiles = {}

# Utility to find a user
def find_user(email, role):
    return next((user for user in users_db[role] if user["email"] == email), None)

# ------------------ OAuth Routes ------------------

@app.route('/api/auth/google')
def google_login():
    redirect_uri = url_for('google_callback', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/api/auth/google/callback')
def google_callback():
    try:
        token = google.authorize_access_token()
        resp = google.get('userinfo')
        userinfo = resp.json()
        email = userinfo['email']
    except Exception as e:
        return f"<script>window.opener.postMessage({{ success: false, error: '{str(e)}' }}, '*'); window.close();</script>"

    if not User.query.filter_by(email=email, role='patients').first():
        new_user = User(email=email, password='oauth', role='patients')
        db.session.add(new_user)
        db.session.commit()
        user_profiles[email] = {
            "firstName": email.split('@')[0].capitalize(),
            "lastName": "", "email": email, "phone": "", "birth": "", "gender": ""
        }

    return f"""
    <script>
    window.opener.postMessage({{
        success: true,
        email: "{email}"
    }}, "*");
    window.close();
    </script>
    """

# ------------------ Auth Routes ------------------

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not email or not password or not role:
        return jsonify({'message': 'Missing required fields'}), 400

    existing_user = User.query.filter_by(email=email, role=role).first()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    user = User.query.filter_by(email=email, role=role).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    return jsonify({'message': 'Login successful', 'email': user.email, 'role': user.role}), 200

if __name__ == '__main__':
    app.run(debug=True)


# 🧠 Step handler (1–14)
def handle_step(user_id, step_key, value):
    if not user_id or value is None:
        return False
    users_db["assessment_data"].setdefault(user_id, {})[step_key] = value
    return True

# Step 1–14 Routes
def make_step_route(step_key, field):
    def route():
        data = request.json
        user_id, value = data.get("user_id"), data.get(field)
        if not handle_step(user_id, step_key, value):
            return jsonify({"error": f"Missing user_id or {field}"}), 400
        return jsonify({"message": f"{step_key} saved"}), 200
    return route

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
        app.add_url_rule(
            f"/api/step{i}",
            f"step{i}",
            make_step_route(f"step{i}", field),
            methods=["POST"]
        )

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
@app.route("/api/chat/therapist", methods=["POST"])
def chat_therapist():
    data = request.json
    message = data.get("message")
    user_id = request.args.get("user_id") or request.json.get("user_id")  # Support both

    if not message:
        return jsonify({"error": "Message required"}), 400

    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "mistralai/mistral-7b-instruct:free",
                "messages": [
                    {"role": "system", "content": "You are a kind and helpful therapist."},
                    {"role": "user", "content": message}
                ]
            }
        )
        res_data = response.json()
        reply = res_data["choices"][0]["message"]["content"]

        # 🧠 Save AI chat history
        if user_id:
            users_db["ai_chat_history"].setdefault(user_id, []).append((message, reply))

        return jsonify({ "reply": reply })

    except Exception as e:
        return jsonify({ "error": str(e) }), 500


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
    active_patients = int(total_patients * 1)
    new_patients = int(total_patients * 0.24)
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
        "chart": [25, 30, 35]
    })

# --------------------------------------------
# 🔄 Real-Time Chat: Therapist ⇄ Patient
# --------------------------------------------

@socketio.on("join")
def join_room_event(data):
    join_room(data["room"])
    system_msg = f"{data['username']} joined the room."
    emit("message", {"from": "system", "text": system_msg}, to=data["room"])

    # Store the join message
    chat_memory_store["therapist_chats"].setdefault(data["room"], []).append(("system", system_msg))

@socketio.on("send_message")
def send_message(data):
    room = data.get("room")
    sender = data.get("sender")
    text = data.get("text")

    emit("message", {
        "from": sender,
        "text": text
    }, to=room)

    # 💾 Save message to therapist_chat_history
    if room:
        users_db["therapist_chat_history"].setdefault(room, []).append((sender, text))

@app.route("/api/chat/history", methods=["GET"])
def get_chat_history():
    user_id = request.args.get("user_id")
    room = request.args.get("room")

    ai_chat = users_db["ai_chat_history"].get(user_id, [])
    therapist_chat = users_db["therapist_chat_history"].get(room, [])

    return jsonify({
        "ai_chat": ai_chat,
        "therapist_chat": therapist_chat
    }), 200

# --------------------------------------------
# 🏁 Run the Server
# --------------------------------------------

if __name__ == "__main__":
  socketio.run(app, host='0.0.0.0', debug=True, port=5000, use_reloader=False)