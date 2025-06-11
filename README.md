# ♻️ Waste Management Backend – Node.js + Express + MongoDB

A backend system built using **Node.js**, **Express**, and **MongoDB (Mongoose)**. It supports full **user & admin authentication**, **role-based access control**, **category and waste management**, **PDF report generation**, and **email notifications**.

---

## 🚀 Features

- ✅ User and Admin Authentication
- 🧑‍⚖️ Role-based Access Control
- 🗂️ Category & Waste (Déchet) Management
- 🧾 Automatic PDF Report Generation
- 📧 Email Notifications (via Nodemailer)

---

## 📦 Prerequisites

Make sure the following are installed:

- **Node.js** (v14 or higher)
- **MongoDB** (Local or Cloud like Atlas)

---

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Backend_PFE-main.git
   cd Backend_PFE-main

2. **Install dependencies:**
    ```bash
    npm install
3. **Environment configuration:**

Create a **.env** file inside the **config/** folder
```ini
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-db
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

🔒 Note: Do not commit the .env file to version control!

---
## 🖥️ Running the Server
Start the development server with:
```
npm start

 ```
 If everything is set up correctly, visit: http://localhost:3000

---
## 🧱 Project Structure

```
Backend_PFE-main/
├── index.js                 # Entry point – Express setup
├── dbConfig/
│   └── dbConfig.js          # MongoDB connection
├── config/
│   └── .env                 # Environment variables
├── controller/              # Business logic
├── model/                   # Mongoose models
├── route/                   # Express route handlers

```
---
## 🔗 API Endpoints

Each endpoint has its own controller, model, and route file:


| Endpoint      | Purpose                         |
| ------------- | ------------------------------- |
| `/user`       | User registration & listing     |
| `/auth`       | User login/authentication       |
| `/admin`      | Admin-specific operations       |
| `/auth/admin` | Admin login/authentication      |
| `/role`       | Role creation and assignment    |
| `/categorie`  | CRUD operations for categories  |
| `/dechet`     | Waste (Déchet) management       |
| `/pvDechet`   | PDF generation related to waste |


---
## 🧪 API Testing (Examples)


You can use Postman, Insomnia, or Thunder Client to test the API:


**Register a new user:**
```
POST /user/register
Content-Type: application/json

{
  "firstName": "john",
  "name" : "walker"
  "email": "john@example.com",
  "password": "yourpassword",
  "role" : "emetteur",
}
```

**Login :** 
```
http://localhost:3000/auth/admin/login
```
---

## 📚 Dependencies

express – Web framework

mongoose – MongoDB ODM

dotenv – Environment variables

cors – Cross-Origin Resource Sharing

body-parser – Parse incoming requests

bcrypt – Password hashing

jsonwebtoken – Token-based authentication

nodemailer – Email sending

pdfkit – PDF report generation

---
## 📬 Contact

For any queries or contributions, feel free to open an issue or contact the maintainer.

***Happy coding! 💻***





