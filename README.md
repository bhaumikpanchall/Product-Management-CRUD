Product Management App — MERN Stack
===================================

This README was written by the team to give you a friendly, human walkthrough of the project. If something feels unclear, it probably just needs a quick tweak—feel free to open an issue or PR so we can keep it helpful for the next person.

We built a full-stack MERN application that lets users register, log in, and manage products using secure JWT-based authentication. The dashboard includes search, filtering, pagination, and a responsive Tailwind-powered UI with logout confirmation. Everything below is based on how we actually run the project day to day.

## Tech Stack

**Backend**
- Node.js, Express.js
- MongoDB & Mongoose
- JWT-based auth with bcrypt password hashing

**Frontend**
- React (Vite) & React Router
- Axios
- Tailwind CSS

## Getting Started

If you already cloned the repo or installed dependencies, just jump to whatever section you need.

### 1. Prerequisites
- Node.js 18+ and npm (we test on the current LTS release)
- MongoDB instance (Atlas or local; a free tier cluster works fine)

### 2. Clone and install
git clone <repo-url>
cd Mobio

# install backend deps
cd server
npm install

# install frontend deps
cd ../client
npm install

### 3. Environment variables
Create `.env` files from the provided examples so you never guess which keys are required:

# backend
cp server/env.example server/.env

# frontend
cp client/env.example client/.env

Update the variables with your real values:
- `server/.env`: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
- `client/.env`: `VITE_API_BASE_URL` (e.g., `http://localhost:5000/api`)

### 4. Run the apps
Open two terminals and start each side:

# backend API
cd server
npm run dev

# frontend UI
cd client
npm run dev

The Vite dev server prints the local URL (default `http://localhost:5173`). The backend defaults to `http://localhost:5000`.

### 5. Build for production
cd client
npm run build

Serve the `dist` folder with your preferred static host and point it to the running backend API. We normally keep the Express server running separately and proxy API calls from the frontend host.

## API Reference

### Auth Routes
Method Endpoint         Description                
------ --------------  ---------------------------
POST   `/auth/register` Register a new user         
POST   `/auth/login`    Login and receive JWT token 

### Product Routes
All product routes require `Authorization: Bearer <token>`.

 Method  Endpoint           Description        
 ------  -----------------  ------------------ 
 POST    `/products`        Create a product   
 GET     `/products`        Get all products   
 PUT     `/products/:id`    Update product     
 DELETE  `/products/:id`    Delete product     

#### Query Params for `GET /products`
 Param      Description                                
 ---------  ------------------------------------------ 
 `search`   match on product name                
 `category` Case-insensitive category filter           
 `minPrice` Minimum price filter                       
 `maxPrice` Maximum price filter                       
 `page`     Page number (default 1)                    
 `limit`    Items per page (default 10)                

## Frontend Features
- User registration & login with validation
- Protected routes with auth-aware redirects
- Modal-based add/edit/delete products
- Search, category, and price range filtering
- Pagination with page size selector
- Responsive Tailwind CSS layout
- Logout confirmation popup
