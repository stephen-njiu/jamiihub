from flask import Flask, render_template, request, redirect, session, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
import re
from itsdangerous import URLSafeTimedSerializer
import os

app = Flask(__name__)
app.secret_key = "origin_fest"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'lindensmark@gmail.com'
app.config['MAIL_PASSWORD'] = 'skil uzwq ubsm mpfe'
app.config['MAIL_DEFAULT_SENDER'] = 'lindensmark@gmail.com'

db = SQLAlchemy(app)
mail = Mail(app)
serializer = URLSafeTimedSerializer(app.secret_key)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

# Password validation function
def is_valid_password(password):
    if len(password) < 8:
        return False
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[a-z]", password):
        return False
    if not re.search(r"\d", password):
        return False
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False
    return True

# Email validation function
def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

# Function to send verification email
def send_verification_email(email):
    token = serializer.dumps(email, salt='email-verify')
    msg = Message('Verify Your Email',
                  recipients=[email])
    link = url_for('verify_email', token=token, _external=True)
    msg.body = f'Click the following link to verify your email: {link}'
    mail.send(msg)

@app.route("/")
def home():
    if "username" in session:
        return redirect(url_for('dashboard'))
    return render_template("index.html")

@app.route("/login", methods=["POST"])
def login():
    username = request.form['username']
    password = request.form['password']
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        if user.is_verified:
            session['username'] = username
            return redirect(url_for('dashboard'))
        else:
            return render_template("index.html", error="Please verify your email before logging in.")
    else:
        return render_template("index.html", error="Incorrect Password/Username Provided!")

@app.route("/register", methods=["POST"])
def register():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    if not is_valid_email(email):
        return render_template("index.html", error="Invalid email format")

    if not is_valid_password(password):
        return render_template("index.html", error="Password does not meet criteria")

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return render_template("index.html", error="Username or email already registered")
    else:
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        send_verification_email(email)
        return render_template("index.html", message="Please check your email to verify your account")

@app.route("/verify_email/<token>")
def verify_email(token):
    try:
        email = serializer.loads(token, salt='email-verify', max_age=3600)
    except:
        return render_template("index.html", error="The verification link is invalid or has expired")
    
    user = User.query.filter_by(email=email).first()
    if user:
        user.is_verified = True
        db.session.commit()
        return render_template("index.html", message="Your email has been verified. You can now log in.")
    else:
        return render_template("index.html", error="User not found")

@app.route("/dashboard")
def dashboard():
    if "username" in session:
        return render_template("dashboard.html", username=session['username'])
    return redirect(url_for('home'))

@app.route("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))

def recreate_database():
    with app.app_context():
        db.drop_all()
        db.create_all()
    print("Database recreated successfully.")


## CHAT APPLICATION


## 

if __name__ == "__main__":
    recreate_database()  # This will recreate the database. Comment out after first run.
    app.run(debug=True)