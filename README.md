Product Management App — MERN Stack

A full-stack MERN application that allows users to register, log in, and manage products using secure JWT-based authentication. The dashboard includes search, filtering, pagination, and a responsive Tailwind-powered UI with logout confirmation.

->Tech Stack

#Backend
Node.js
Express.js
MongoDB & Mongoose
JWT Authentication
bcrypt for password hashing

#Frontend
React (Vite)
React Router
Axios
Tailwind CSS


Auth Routes
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Login and receive JWT token

Product Routes
All routes below require:
Authorization: Bearer <token>
Method	Endpoint	Description
POST	/products	Create a product
GET	/products	Get all products
PUT	/products/:id	Update product
DELETE	/products/:id	Delete product


Query Params for GET /products
Parameter	Description
search	Search by product name (fuzzy)
category	Filter by category (case-insensitive)
minPrice	Filter by minimum price
maxPrice	Filter by maximum price
page	Pagination page (default: 1)
limit	Items per page (default: 10)


#Frontend Features
User registration & login with validation
Protected routes (redirect if not authenticated)
Add/Edit/Delete products (modal-based UI)
Search, category filter, and price range filtering
Pagination with page size selector
Responsive Tailwind CSS layout
Logout confirmation popup