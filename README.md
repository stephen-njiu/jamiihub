# Community Information and Action Application (Flask)

This is a Flask-based web application for **Challenge 3: Community Information and Action**.<br> The application allows community members to register, log in, and report issues or request services from local authorities or organizations. The goal is to enhance communication, engagement, and crisis management within communities, aligning with **SDG 11 (Sustainable Cities and Communities)**.

## Features

- User registration and login with **email verification**.
- Password hashing for secure user credentials.
- Session management for user authentication.
- Dashboard for authenticated users.
- SQLite database integration for storing user data.


## Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/jamiihub.git
   cd jamiihub

### 2. Set up a virtual environment (optional but recommended):

    python -m venv venv
    source venv/bin/activate  # For Linux/macOS
    venv\Scripts\activate     # For Windows


### 3. Install Dependencies
    pip install -r requirements.txt

### 4. Set up the SQLite database:
    python app.py
### 5. Run the Flask app:
    python app.py
    python main.py

### Routes

* /: Home page where users can log in or register.
* /login: Handles login requests.
* /register: Handles registration requests.
* /dashboard: Dashboard for logged-in users.
* /logout: Logs out the user and redirects to the home page.

### How to Contribute


* Fork the repository.
* Create a branch for your feature or bug fix: git checkout -b feature/your-feature-name.
* Commit your changes: git commit -m 'Add new feature'.
* Push to the branch: git push origin feature/your-feature-name.
* Create a Pull Request on GitHub.

### License

This project is licensed under the MIT License.

