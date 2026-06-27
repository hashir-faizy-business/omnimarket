# 🛒 OmniMarket — E-Commerce Platform

**A modern, full-stack e-commerce marketplace built with the MERN stack (MongoDB, Express, React, Node.js) with TypeScript support.**

---

## 📖 Overview

OmniMarket is a complete e-commerce solution that connects vendors and customers in a seamless marketplace experience. Built with modern web technologies, it offers a robust backend API and a responsive React frontend with real-time updates.

---

## ✨ Features

### 🛍️ Customer Features
- **Product Browsing** — Browse products by categories, sections, and vendors
- **Advanced Search** — Filter products by price, category, vendor, and more
- **Shopping Cart** — Add, remove, and update quantities in real-time
- **Wishlist** — Save favorite products for later
- **Order Management** — Track orders and view order history
- **Vendor Information** — View vendor profiles and their product catalogs
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile

### 🏪 Vendor Features
- **Product Management** — Add, edit, and delete products
- **Inventory Control** — Update stock quantities and prices
- **Order Management** — View and process customer orders
- **Vendor Dashboard** — Track sales and performance metrics
- **Product Categories** — Organize products into categories and sections

### 👑 Admin Features
- **User Management** — Manage customers and vendors
- **Category Management** — Create and manage product categories
- **Section Management** — Organize products into sections
- **Vendor Approval** — Approve or reject vendor registrations
- **Analytics Dashboard** — View platform-wide metrics

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │   Pages      │  │  Components  │  │     Context      │ │
│  │  - Home      │  │  - Cart      │  │   - Auth Context │ │
│  │  - Cart      │  │  - Product   │  │   - Cart Context │ │
│  │  - Product   │  │  - Vendor    │  │   - Wishlist     │ │
│  │  - Wishlist  │  │  - Category  │  │                  │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
│                          │                                  │
│                    Axios / API Calls                       │
│                          ▼                                  │
├─────────────────────────────────────────────────────────────┤
│                    Express.js Backend                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ Controllers  │  │   Models     │  │     Routes       │ │
│  │ - Category   │  │ - Product    │  │  - /api/         │ │
│  │ - Product    │  │ - Vendor     │  │    products      │ │
│  │ - Section    │  │ - User       │  │  - /api/         │ │
│  │ - Vendor     │  │ - Order      │  │    categories    │ │
│  │ - Video      │  │ - Cart       │  │  - /api/         │ │
│  └──────────────┘  └──────────────┘  └─────vendors──────┘ │
│                          │                                  │
│                    MongoDB Database                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication |
| **TypeScript** | Type safety |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React** | UI framework |
| **TypeScript** | Type safety |
| **Context API** | State management |
| **Axios** | HTTP client |
| **CSS** | Styling |

---

## 📁 Project Structure

```
omnimarket/
├── backend/
│   ├── config/              # Configuration files
│   │   ├── database.ts      # MongoDB connection
│   │   └── auth.ts          # JWT configuration
│   ├── controllers/         # Request handlers
│   │   ├── CategoryController.ts
│   │   ├── ProductController.ts
│   │   ├── SectionController.ts
│   │   ├── VendorController.ts
│   │   └── VideoController.ts
│   ├── data/                # Data files and seeders
│   ├── models/              # Mongoose models
│   │   ├── Category.ts
│   │   ├── Product.ts
│   │   ├── Section.ts
│   │   ├── User.ts
│   │   └── Vendor.ts
│   ├── routes/              # API routes
│   │   ├── categoryRoutes.ts
│   │   ├── productRoutes.ts
│   │   ├── sectionRoutes.ts
│   │   └── vendorRoutes.ts
│   └── index.ts             # Backend entry point
├── frontend/
│   ├── components/          # React components
│   │   ├── common/          # Reusable components
│   │   ├── layout/          # Layout components
│   │   └── features/        # Feature-specific components
│   ├── lib/                 # Utilities and helpers
│   │   ├── AppContext.tsx   # Global state context
│   │   └── utils.ts         # Utility functions
│   ├── pages/               # Page components
│   │   ├── Cart.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── VendorInfo.tsx
│   │   └── Wishlist.tsx
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── node_modules/            # Dependencies
├── .env.example             # Environment variables template
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── metadata.json            # Project metadata
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/hashir-faizy-business/omnimarket.git
cd omnimarket
```

#### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 3. Environment Setup

Create a `.env` file in the `backend` directory:

```env
# Backend .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/OmniMarket
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file in the `frontend` directory:

```env
# Frontend .env
VITE_API_URL=http://localhost:5000/api
```

#### 4. Run the Application

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

---

## 📡 API Endpoints

### Category Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get category by ID |
| POST | `/api/categories` | Create category (Admin) |
| PUT | `/api/categories/:id` | Update category (Admin) |
| DELETE | `/api/categories/:id` | Delete category (Admin) |

### Product Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create product (Vendor) |
| PUT | `/api/products/:id` | Update product (Vendor) |
| DELETE | `/api/products/:id` | Delete product (Vendor) |
| GET | `/api/products/search` | Search products |
| GET | `/api/products/category/:categoryId` | Get products by category |

### Vendor Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vendors` | Get all vendors |
| GET | `/api/vendors/:id` | Get vendor by ID |
| POST | `/api/vendors/register` | Register as vendor |
| PUT | `/api/vendors/:id` | Update vendor profile |
| GET | `/api/vendors/:id/products` | Get vendor products |

### Section Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sections` | Get all sections |
| POST | `/api/sections` | Create section (Admin) |
| PUT | `/api/sections/:id` | Update section (Admin) |
| DELETE | `/api/sections/:id` | Delete section (Admin) |

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

---

## 📦 Deployment

### Deploy Backend to Render/Vercel

1. Push your code to GitHub
2. Connect your repository to Render/Vercel
3. Set environment variables
4. Deploy

### Deploy Frontend to Vercel/Netlify

```bash
cd frontend
npm run build
# Upload the dist/ folder to your hosting provider
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **MongoDB** for the database
- **Express.js** for the backend framework
- **React** for the frontend library
- **Node.js** for the runtime
- **All contributors** who have helped improve this project

---

## 🚧 Roadmap

- [ ] User authentication with JWT
- [ ] Payment integration (Stripe/PayPal)
- [ ] Order tracking and management
- [ ] Vendor dashboard with analytics
- [ ] Product reviews and ratings
- [ ] Real-time notifications
- [ ] AI-powered product recommendations
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Admin dashboard with advanced analytics

---
