import os
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from db import get_connection

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# Allow our React app (port 5173) to talk to this backend
CORS(app, origins=["http://localhost:5173", "http://localhost:5174"])

# 1. Health check: is the backend running?
@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "message": "Backend is running!"})


# 2. Register: create a new user
@app.post("/api/register")
def register():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or not email or not password:
        return jsonify({"message": "Name, email and password are required."}), 400
    if len(password) < 6:
        return jsonify({"message": "Password must be at least 6 characters."}), 400

    # Turn the password into a secret code (hash) before saving
    password_hash = generate_password_hash(password)

    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (name, email, password_hash) VALUES (%s, %s, %s)",
            (name, email, password_hash),
        )
        conn.commit()
    except mysql.connector.IntegrityError:
        return jsonify({"message": "This email is already registered."}), 409
    finally:
        cursor.close()
        conn.close()

    return jsonify({"message": "Account created!"}), 201


# 3. Login: check email and password
@app.post("/api/login")
def login():
    data = request.get_json(silent=True) or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT id, name, email, password_hash FROM users WHERE email = %s",
            (email,),
        )
        user = cursor.fetchone()
    finally:
        cursor.close()
        conn.close()

    # Same message for both cases, so strangers can't guess which emails exist
    if user is None or not check_password_hash(user["password_hash"], password):
        return jsonify({"message": "Wrong email or password."}), 401

    return jsonify({
        "message": "Login successful!",
        "user": {"id": user["id"], "name": user["name"], "email": user["email"]},
    }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)



