Backend Project – Node.js + Express + MongoDB
This is a Node.js backend project using Express, MongoDB (via Mongoose), and additional libraries for:

User authentication (including admin)

Role management

Category & waste (déchet) management

PDF generation

Email notifications

🚀 Features
✅ User and admin authentication

🧑‍⚖️ Role-based access control

🗂️ Category & waste (déchet) management

🧾 Automatic PDF generation

📧 Email notifications using Nodemailer

📦 Prerequisites
Make sure you have the following installed:

Node.js (v14 or higher recommended)

MongoDB (local or cloud instance)

⚙️ Installation
Clone the repository:

bash
Copier
Modifier
git clone <your-repo-url>
cd Backend_PFE-main
Install dependencies:

bash
Copier
Modifier
npm install
Configure environment variables:

Create a .env file inside the config/ folder.

Add the required variables like:

ini
Copier
Modifier
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-db
JWT_SECRET=your-secret-key
EMAIL_USER=your-email
EMAIL_PASS=your-password
Make sure this file is NOT committed to version control.

🖥️ Running the Server
Start the development server with:

bash
Copier
Modifier
npm start
The server will run on the port defined in .env (default: 3000).

Visit: http://localhost:3000
You should see: Hello, Node.js!

🧱 Project Structure
bash
Copier
Modifier
Backend_PFE-main/
│
├── index.js                 # Entry point (Express setup)
├── dbConfig/
│   └── dbConfig.js          # MongoDB connection config
├── controller/              # Business logic for each resource
├── model/                   # Mongoose schemas & models
├── route/                   # Express route definitions
└── config/
    └── .env                 # Environment variables (not tracked)
🔗 API Endpoints
Each of these endpoints has its own controller, model, and routes:

Endpoint	Purpose
/user	User operations
/auth	User login/authentication
/admin	Admin operations
/auth/admin	Admin login/authentication
/role	Role creation and assignment
/categorie	Category CRUD
/dechet	Waste (déchet) management
/pvDechet	PDF-related actions for waste

🧪 Testing the API
Use tools like Postman or Insomnia to interact with the API.

Examples:
Register a user: POST /user/register

Login: POST /auth/login

Add category: POST /categorie

Generate waste report: GET /pvDechet/generate

📜 Scripts
Command	Description
npm start	Start the server

📚 Dependencies
Main libraries used:

express – Web framework

mongoose – MongoDB ODM

dotenv – Environment variable loader

cors – Cross-Origin support

body-parser – Parses incoming request bodies

bcrypt – Password hashing

jsonwebtoken – Token-based auth

nodemailer – Sending emails

pdfkit – PDF generation

