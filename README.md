# DealDock

A full-stack marketplace application inspired by OLX, where users can browse products, authenticate securely, upload products for sale, manage their cart, and proceed through the checkout flow.

DealDock is built using **React, TypeScript, Redux Toolkit, Tailwind CSS, Node.js, Express, MongoDB, and Cloudinary**.

## 📌 Project Status

> 🚧 This project is currently running locally for development and is **not deployed/hosted**.

---

## 🚀 Features

### 👤 Authentication

* User registration
* User login
* Logout functionality
* JWT-based authentication
* Protected routes
* Authentication state management using Redux Toolkit
* Protected backend APIs

### 🛍️ Product Management

* Browse products
* View product details
* Upload products for sale
* Upload product images
* Multiple image support
* Cloudinary image storage
* Product management through REST APIs
* MongoDB product persistence

### 🛒 Cart

* Add products to cart
* View cart items
* Remove products from cart
* Manage product quantities
* Calculate cart totals
* Navigate from cart to checkout

### 💳 Checkout

* Review cart items
* View order summary
* Calculate total amount
* Place orders
* Handle loading states during checkout

### 🔐 Route Protection

The application separates public and protected routes.

```text
Public Routes
    │
    ├── Login
    ├── Register
    ├── Product Listing
    └── Product Details
            │
            ▼
      Authentication
            │
            ▼
Protected Routes
    │
    ├── Cart
    ├── Checkout
    └── Sell Product
```

---

# 🏗️ Architecture

The application follows a feature-based frontend architecture with centralized state management.

```text
                    React Application
                           │
                           ▼
                    Redux Toolkit
                           │
                    ┌──────┴──────┐
                    │             │
                 Slices         Thunks
                    │             │
                    └──────┬──────┘
                           ▼
                       API Layer
                           │
                           ▼
                    Express Backend
                           │
                    ┌──────┴──────┐
                    │             │
              Middleware     Controllers
                    │             │
                    └──────┬──────┘
                           ▼
                        Models
                           │
                           ▼
                       MongoDB
```

### Image Upload Architecture

```text
React
  │
  ▼
Product Form
  │
  ▼
FormData
  │
  ▼
Express API
  │
  ▼
Multer
  │
  ▼
Cloudinary
  │
  ▼
Image URL
  │
  ▼
MongoDB
```

---

# 📁 Frontend Structure

```text
olx/
│
src/
│
├── api/
│   └── productApi.ts
│
├── app/
│   └── store.ts
│
├── components/
│   ├── Cart/
│   ├── Login/
│   ├── Logout/
│   ├── Navbar/
│   ├── Register/
│   └── Sell/
│
├── features/
│   ├── authSlice.ts
│   ├── cartSlice.ts
│   ├── checkoutSlice.ts
│   ├── checkoutThunk.ts
│   ├── productSlice.ts
│   └── productThunk.ts
│
├── pages/
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── LoginPage.tsx
│   ├── ProductDetailsPage.tsx
│   ├── RegisterPage.tsx
│   └── SellPage.tsx
│
├── routes/
│   ├── ProtectedRoute.tsx
│   └── PublicRoute.tsx
│
├── types/
│   ├── auth.ts
│   └── product.ts
│
├── utils/
│   ├── getAuthHeader.ts
│   └── notify.ts
│
├── App.tsx
├── index.css
└── main.tsx
```

---

# ⚙️ Backend Structure

The backend is located inside the `server` directory.

```text
server/
│
├── config/
│   ├── cloudinary.js
│   ├── db.js
│   └── env.js
│
├── controllers/
│   ├── authController.js
│   ├── checkoutController.js
│   └── productController.js
│
├── middleware/
│   ├── errorHandling.js
│   ├── ProtectingRoutes.js
│   └── upload.js
│
├── models/
│   ├── productModel.js
│   └── userModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── checkoutRoutes.js
│   └── productRoutes.js
│
├── .env
├── server.js
└── package.json
```

The backend is responsible for:

* Authentication
* User management
* Product APIs
* Cart/order operations
* MongoDB communication
* Cloudinary integration
* Image uploads
* Protected API routes
* Authentication middleware
* Error handling

---

# 🧠 State Management

DealDock uses **Redux Toolkit** for centralized application state management.

```text
                         Redux Store
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
           Auth              Cart            Product
             │                │                │
             └────────────────┼────────────────┘
                              │
                              ▼
                       React Components
```

## Redux Slices

The application state is separated by feature:

```text
features/
│
├── auth/
│   ├── authSlice.ts
│   └── authThunk.ts
│
├── cart/
│   ├── cartSlice.ts
│   └── cartThunk.ts
│
├── checkout/
│   ├── checkoutSlice.ts
│   └── checkoutThunk.ts
│
└── product/
    ├── productSlice.ts
    └── productThunk.ts
```

This feature-based approach keeps related state and asynchronous logic together and makes the application easier to maintain.

---

# 🔄 Redux Async Flow

Asynchronous operations are handled using Redux Thunk.

```text
React Component
       │
       ▼
Dispatch Async Thunk
       │
       ▼
    API Layer
       │
       ▼
  Express Backend
       │
       ▼
    Controller
       │
       ▼
    MongoDB
       │
       ▼
    Response
       │
       ▼
 Redux Reducer
       │
       ▼
 Updated Redux State
       │
       ▼
 Updated UI
```

---

# 🔄 Application Flow

## Authentication Flow

```text
User
 │
 ▼
Login / Register
 │
 ▼
React Component
 │
 ▼
Redux Thunk
 │
 ▼
API Layer
 │
 ▼
Express API
 │
 ▼
Authentication Controller
 │
 ▼
MongoDB
 │
 ▼
JWT Response
 │
 ▼
Redux Store
 │
 ▼
Protected Application
```

---

## Product Flow

```text
User
 │
 ▼
Product Page
 │
 ▼
Redux Thunk
 │
 ▼
API Layer
 │
 ▼
Express API
 │
 ▼
Product Controller
 │
 ▼
MongoDB
 │
 ▼
Product Data
 │
 ▼
Redux Store
 │
 ▼
React UI
```

---

## Sell Product Flow

```text
User
 │
 ▼
Sell Product
 │
 ▼
Select Images
 │
 ▼
FormData
 │
 ▼
Product API
 │
 ▼
Multer
 │
 ▼
Cloudinary
 │
 ▼
Image URLs
 │
 ▼
MongoDB
```

---

## Checkout Flow

```text
Cart
 │
 ▼
Checkout Page
 │
 ▼
Order Summary
 │
 ▼
Checkout Thunk
 │
 ▼
API Layer
 │
 ▼
Express API
 │
 ▼
Checkout Controller
 │
 ▼
MongoDB
 │
 ▼
Order Created
 │
 ▼
Redux State Updated
```

---

# 🛠️ Tech Stack

## Frontend

| Technology    | Purpose                       |
| ------------- | ----------------------------- |
| React         | UI development                |
| TypeScript    | Type safety                   |
| Tailwind CSS  | Styling                       |
| Redux Toolkit | Global state management       |
| Redux Thunk   | Asynchronous state operations |
| React Router  | Client-side routing           |
| Axios / Fetch | API communication             |
| Vite          | Development and build tool    |

## Backend

| Technology | Purpose              |
| ---------- | -------------------- |
| Node.js    | JavaScript runtime   |
| Express.js | REST API             |
| MongoDB    | Database             |
| Mongoose   | MongoDB ODM          |
| Cloudinary | Image storage        |
| JWT        | Authentication       |
| Multer     | File upload handling |

---

# 🔑 Environment Variables

The backend uses environment variables for sensitive configuration.

Create:

```text
server/.env
```

Example:

```env
MONGO_URI=your_mongodb_connection_string

PORT=5000

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### ⚠️ Important

Never commit your actual `.env` file to GitHub.

The `.env` file should contain your real credentials locally, but the README should only contain placeholders.

Add this to `.gitignore`:

```gitignore
.env
.env.local
node_modules/
dist/
```

If credentials have already been pushed to a public GitHub repository, **rotate the credentials immediately**.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB / MongoDB Atlas account
* Cloudinary account

---

## 1. Clone the Repository

```bash
git clone https://github.com/Noushidh/DealDock.git
```

Then move into the project:

```bash
cd DealDock
```

---

# 2. Install Frontend Dependencies

From the project root:

```bash
npm install
```

The frontend is located at:

```text
DealDock/
```

---

# 3. Install Backend Dependencies

Move into the server directory:

```bash
cd server
```

Then install dependencies:

```bash
npm install
```

---

# 4. Configure Backend Environment Variables

Inside the `server` directory, create:

```text
server/.env
```

Add your own credentials:

```env
MONGO_URI=your_mongodb_connection_string

PORT=5000

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

# 5. Start the Backend

From:

```text
DealDock/server
```

Run:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

---

# 6. Start the Frontend

Open another terminal.

From the project root:

```text
DealDock/
```

Run:

```bash
npm run dev
```

The Vite development server will start the React application.

---

# 🖥️ Local Development

You need two terminals running at the same time.

### Terminal 1 — Frontend

```bash
cd DealDock
npm run dev
```

### Terminal 2 — Backend

```bash
cd DealDock/server
node server.js
```

The development architecture is:

```text
┌─────────────────────────────┐
│       React + Vite          │
│       Frontend              │
│                             │
│       localhost:5173        │
└──────────────┬──────────────┘
               │
               │ HTTP API
               ▼
┌─────────────────────────────┐
│       Node + Express        │
│       Backend               │
│                             │
│       localhost:5000        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       MongoDB Atlas         │
└─────────────────────────────┘

               │
               │ Image Upload
               ▼
┌─────────────────────────────┐
│         Cloudinary          │
└─────────────────────────────┘
```

---

# 🔒 Security

The project implements several security mechanisms:

* JWT-based authentication
* Protected frontend routes
* Protected backend routes
* Authentication middleware
* Environment-based secrets
* Server-side validation
* Centralized error handling
* Restricted API access
* Secure handling of API credentials

Sensitive credentials are stored in environment variables instead of source code.

---

# 🧪 Testing

Testing can be added using:

* Vitest
* Jest
* React Testing Library
* Supertest

Potential testing structure:

```text
React Components
       │
       ▼
     Redux
       │
       ▼
      API
       │
       ▼
  Controllers
       │
       ▼
    Database
```

---

# 📈 Future Improvements

Possible future improvements include:

* 🔎 Advanced product search
* 🏷️ Product categories
* 📍 Location-based product discovery
* ❤️ Wishlist
* 💬 Buyer and seller chat
* 🔔 Real-time notifications
* ⭐ Seller ratings and reviews
* 📊 Seller dashboard
* 🧾 Order history
* 💳 Online payment integration
* 📱 Improved mobile experience
* 🔍 Advanced filtering and sorting
* ♾️ Pagination / infinite scrolling
* ⚡ API caching
* 🧪 Unit and integration testing
* 🐳 Docker support
* 🚀 CI/CD pipeline

---

# 📚 What I Learned

Building DealDock provided practical experience with full-stack application development.

### Frontend

* React component architecture
* TypeScript
* Redux Toolkit
* Redux Thunk
* Feature-based state management
* React Router
* Protected routes
* API abstraction
* Tailwind CSS
* Form handling
* Loading and error states

### Backend

* Node.js
* Express.js
* REST API development
* MongoDB
* Mongoose
* JWT authentication
* Middleware
* Error handling
* Protected APIs
* File uploads
* Multer

### External Services

* Cloudinary image management
* MongoDB Atlas

### Architecture

* Separation of concerns
* Feature-based architecture
* Centralized state management
* API layer abstraction
* Frontend/backend separation
* Asynchronous data flow

---

# 🎯 Project Goals

The main goal of DealDock is to build a practical full-stack marketplace while developing a strong understanding of modern web application architecture.

The project focuses on:

* Building scalable React applications
* Type-safe development with TypeScript
* Centralized state management
* Asynchronous API handling
* REST API development
* Authentication and authorization
* Database integration
* Image upload management
* Protected routes
* Responsive UI development
* Separation of concerns
* Full-stack application architecture

---

# 👨‍💻 Author

**Noushidh**

Full-Stack Developer

### Technologies

`JavaScript` · `TypeScript` · `React` · `Redux Toolkit` · `Node.js` · `Express` · `MongoDB`

---

# 🔗 Repository

GitHub:

https://github.com/Noushidh/DealDock

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.
