
markdown
# Rwanda Digital Solidarity (RDS)

A digital platform connecting Rwandan citizens with national infrastructure projects through feedback, engagement, and community participation.

---

## Overview

Rwanda Digital Solidarity (RDS) is a web-based platform that bridges the gap between government infrastructure projects and citizens. Users can track project progress, submit feedback, earn impact points, and engage directly with project administrators. The platform features role-based access for citizens and administrators, ensuring a secure and organized experience.

---

## Features

###  Authentication
- **User Registration & Login** – Create an account with email and password
- **Admin Registration & Login** – Secure admin access with email pattern validation (must contain "admin" and end with "rds@.com")
- **Role-Based Redirects** – Users go to citizen dashboard, admins go to management portal

###  Citizen Dashboard
- **Project Explorer** – Browse active infrastructure projects with progress indicators
- **Feedback Submission** – Rate projects (1-5 stars) and share detailed observations
- **Impact Points System** – Earn 10 base points + 2 points per star rating
- **Achievement Badges** – Unlock badges as you contribute more
- **Support Hub** – Contact support via Email, SMS, or WhatsApp
- **Digital ID Card** – View your personalized digital citizen ID
- **Impact Statistics** – Track total reports, points earned, and average rating
- **Rwanda Map** – View all project locations on an interactive map

###  Admin Dashboard
- **Statistics Overview** – Total users, active projects, feedback count, pending replies
- **Feedback Management** – Review citizen feedback and respond with admin replies
- **Project Management** – Create, edit, and delete infrastructure projects
- **User Management** – View all registered users with their points and activity

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure and layout |
| CSS3 | Styling and responsive design |
| JavaScript | Interactivity and logic |
| LocalStorage | Data persistence |
| Font Awesome 6 | Icons and visual elements |
| Google Fonts (Inter) | Typography |

---

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rds-platform.git
   cd rds-platform
Open the application

Option A: Double-click index.html to open in your browser

Option B: Use Live Server extension in VS Code for auto-refresh

No build steps or dependencies required – Everything runs client-side

How It Works
User Journey
Step	Action	Result
1	Sign up with email and password	Account created
2	Login with credentials	Redirected to citizen dashboard
3	Browse projects	See all active projects with progress
4	Click a project	Opens feedback form
5	Write feedback and rate project	Points awarded, badge progress updates
6	View impact stats	Track your contributions
Admin Journey
Step	Action	Result
1	Sign up with admin email pattern	Admin account created
2	Login with credentials	Redirected to admin dashboard
3	View pending feedback	See unread citizen submissions
4	Reply to feedback	User receives admin response
5	Add/edit projects	Projects updated for all users
6	View users	Monitor platform activity
Project Structure
text

rds-platform/
│
├── index.html              # Login/Signup page
├── dashboard.html          # Citizen dashboard
├── admin-dashboard.html    # Admin management portal
├── style.css               # Global styles
├── script.js               # Application logic
│
└── README.md               # Project documentation

Note: The final version consolidates all dashboards into index.html for simplicity.

Impact Points System
Action	Points
Submitting feedback	10
1-star rating	+2
2-star rating	+4
3-star rating	+6
4-star rating	+8
5-star rating	+10
Maximum per feedback	20
Badges
Badge	Requirement
🪴 First Report	1 feedback submitted
⭐ Active Citizen	5 feedbacks submitted
💎 Contributor	100 impact points
🏆 Community Champion	10 feedbacks submitted
👑 Elite Member	500 impact points
Support Hub
### Channel	Contact
 Email	support@rds.gov.rw
 Phone/SMS	+250 790 801 866
 WhatsApp	+250 790 801 866
### Browser Support
Chrome	Firefox	Safari	Edge

Demo Accounts
Regular User
Sign up with any email (e.g., citizen@example.com)

Password: 123456 (minimum 6 characters)

Admin
Email must contain "admin" and end with "rds@.com"
Example: admin.john.rds@.com

Password: Your choice (minimum 4 characters)

Future Roadmap
Feature	Status
Backend API (Node.js + MongoDB)	📋 Planned
Real-time notifications	📋 Planned
Email notifications for feedback replies	📋 Planned
Mobile app (React Native)	📋 Planned
Kinyarwanda language support	📋 Planned
Project image uploads	📋 Planned
Contributing
Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit changes: git commit -m 'Add amazing feature'

Push: git push origin feature/amazing-feature

Open a Pull Request

License
MIT License – see LICENSE file for details.

Contact
Project Maintainer:
📧 Email: support@rds.gov.rw
📞 Phone: +250 790 801 866

Built with ❤️ for Rwanda's digital future.
🇷🇼 "Together, we build."

