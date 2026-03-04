🛒 SmashMart
Supermarket Products Manager
Project Documentation — Web Development Assignment 02
New Generation Academy  |  Instructors: Eric Tuyishimire & Emmanuel Niyongabo  |  February 25, 2026


📋 Project Overview
SmashMart is a full-stack Supermarket Products Manager application built with Node.js, Express, MongoDB on the backend and HTML, Tailwind CSS, and vanilla JavaScript on the frontend. The app supports full CRUD operations on products with JWT-based authentication and role-based access control.

Part	Technology	Repository
Backend API	Node.js, Express, MongoDB, Mongoose	github.com/oceanne11/supermarket-backend
Frontend UI	HTML, Tailwind CSS, JavaScript	github.com/oceanne11/supermarket-frontend


🔧 Backend — supermarket-backend
Project Structure
supermarket-backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # Register, Login, GetMe
│   └── productController.js   # Products CRUD
├── middleware/
│   └── authMiddleware.js      # JWT protect + adminOnly + managerOrAdmin
├── models/
│   ├── User.js                # User schema with roles
│   └── Product.js             # Product schema
├── routes/
│   ├── authRoutes.js          # /api/auth
│   └── productRoutes.js       # /api/products
├── uploads/                   # Auto-created by multer
├── screenshots/               # Postman test screenshots
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md

Setup & Installation
1. Clone the repository:
git clone https://github.com/oceanne11/supermarket-backend.git
cd supermarket-backend
2. Install dependencies:
npm install
3. Configure environment variables — copy .env.example to .env:
MONGO_URI=mongodb://localhost:27017/supermarket
PORT=5000
JWT_SECRET=your_secret_key_here
4. Start the server:
npm run dev

Auth Endpoints — /api/auth
Method	Endpoint	Access	Description
POST	/api/auth/register	Public	Register new user
POST	/api/auth/login	Public	Login, returns JWT token
GET	/api/auth/me	Protected	Get logged-in user info

Product Endpoints — /api/products
Method	Endpoint	Access	Description
GET	/api/products	Public	Get all products (optional ?category= filter)
GET	/api/products/:id	Public	Get single product by ID
POST	/api/products	Admin / Manager	Create product with image upload
PUT	/api/products/:id	Admin / Manager	Update product fields and image
DELETE	/api/products/:id	Admin / Manager	Delete product and image file

Product Schema
Field	Type	Required	Default	Notes
name	String	Yes	-	trim: true
description	String	No	''	Short description
price	Number	Yes	-	min: 0, price in RWF
category	String	Yes	-	e.g. Dairy, Snacks
stock	Number	No	0	Quantity available
image	String	No	''	Filename saved by multer

User Roles & Permissions
Feature	Customer	Manager	Admin
View products	✅	✅	✅
Add product	❌	✅	✅
Edit product	❌	✅	✅
Delete product	❌	✅	✅
Manage users	❌	❌	✅

