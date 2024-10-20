# __JamiiHub - Community Information and Action Application (Flask)__

# __Try it Out: --> https://jamiihub.onrender.com__

This is a Flask-based web application for **Challenge 3: Community Information and Action**.<br> The application allows community members to register, log in, and report issues or request services from local authorities or organizations. The goal is to enhance communication, engagement, and crisis management within communities, aligning with **SDG 11 (Sustainable Cities and Communities)**.

## Features

- User registration and login with **email verification**.
- Password hashing for secure user credentials.
- Session management for user authentication.
- Dashboard for authenticated users.
- Services Posted by Services Providers
- Ability for Members to order services
- Section for upcoming news
- Access to EMregency Services
- SQLite database integration for storing user data.


# __PITCH DECK__
1: Problem & Opportunity
Title: Connecting Communities to Services and Opportunities in Africa
Content:
Across Africa, millions of people face challenges in accessing essential community services,
such as waste management, cleaning, health, and repair services. Citizens often struggle to
find reliable service providers, while small businesses lack a platform to connect with
potential customers.
In addition, organizing and promoting community events, such as public forums, cultural
gatherings, and workshops, are hampered by inefficient communication and limited platforms
for ticketing.
This lack of connectivity between citizens, service providers, and local governments leads to
delayed services, missed opportunities, and a disconnect that impacts the overall quality of
life in African communities. The challenge is to bridge this gap, empowering communities
and enabling seamless access to both services and community activities.

### Solution Overview
Title: JamiiHub – Transforming Community Service and Engagement
JamiiHub is a dynamic digital platform that connects African communities with essential
services and local events. We provide a one-stop solution where residents can easily order
services such as cleaning, waste collection, home repairs, and more. Service providers can
register on the platform, enabling them to reach a broader audience and expand their
customer base.
Additionally, JamiiHub acts as a platform for local events, where users can explore, promote,
and purchase tickets to community activities, from social gatherings to government-organized
events.
Key Features:
• For Residents: An easy-to-use interface for ordering community services and
purchasing event tickets.
• For Service Providers: A platform to offer services and receive orders, growing their
businesses.
• For Event Organizers: A streamlined ticketing system for community events,
allowing for efficient planning and participation.
JamiiHub fosters stronger connections between citizens, small businesses, and local
authorities, making service access and community engagement seamless and transparent.
3: Business Model & Impact
Title: Empowering Communities Through Commissions and Event Ticketing:
JamiiHub operates on a commission-based business model. For every service ordered through
the platform, we take a small commission, ensuring sustainability while keeping the platform
accessible. Additionally, JamiiHub monetizes event ticketing by charging a percentage on
every ticket sold for community events hosted via the platform.
Revenue Streams:
• Service Commission: A small fee from each service paid for via JamiiHub.
• Event Ticketing Commission: A percentage of each ticket sold through the platform.
Impact:
• Economic Growth: JamiiHub empowers small businesses by providing them with
direct access to customers, helping them grow and contribute to the local economy.
• Community Engagement: By offering an event ticketing system, we foster stronger
community connections and more vibrant local events.
• Improved Public Services: Governments and organizations can easily register to
provide services or host events, fostering greater transparency and efficiency in public
service delivery.

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

