# Nexora - Full Stack MERN E-Commerce Platform

A production-ready, full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Tailwind CSS.

## 🚀 Live Demo & Repository
- **GitHub Repository:** https://github.com/Zishan-Saifi/E-commerce-website
- **Live Deployed Site:** [Paste Your Vercel / Live URL Here]

---

## ✨ Features Implemented
- **Dynamic Storefront:** Auto-sliding banner carousel with promotional tags and discount deals.
- **Real-Time Database Persistence:** Products, orders, and users managed live via MongoDB Atlas.
- **Product Catalog & Filtering:** Filter by categories (Electronics, Wearables, Accessories) and sort by price/rating.
- **Product Quick View Modal:** View high-res details, stock status, and add directly to cart.
- **Persistent Shopping Cart & Wishlist:** Real-time quantity adjustments, tax & shipping calculation.
- **Order Flow & Instant Cancellation:** Real-time checkout to MongoDB Atlas with order tracking and cancellation option.
- **User Authentication:** Registration and login with JWT and bcrypt password hashing.
- **Admin Dashboard:** Real-time statistics, inventory overview, and product management.

---

## 🛠️ Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React, React Router v6, Context API
- **Backend:** Node.js, Express.js, Mongoose, JSON Web Tokens (JWT), bcryptjs, CORS
- **Database:** MongoDB Atlas (Cloud)

---

## 📂 Project Structure
```text
practice/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── package.json
├── server/          # Node.js + Express backend
│   ├── config/      # MongoDB connection
│   ├── models/      # Mongoose schemas (User, Product, Order)
│   ├── routes/      # REST API endpoints (auth, products, orders)
│   ├── seeder.js    # Database seeder script
│   └── server.js
└── README.md