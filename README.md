# OpsSync Backend

A robust Node.js backend API for the OpsSync application, built with Express.js and Sequelize ORM.

## 📋 Project Overview

OpsSync Backend is a comprehensive server-side application that provides:
- User authentication and authorization
- Admin panel functionality
- Account management
- Operations tracking
- Sales management
- Site engineering tools

## 🛠️ Tech Stack

- **Runtime**: Node.js (v12)
- **Framework**: Express.js
- **Database ORM**: Sequelize
- **Database**: MySQL/PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, bcryptjs, CORS, Rate Limiting
- **Testing**: Jest, Supertest
- **Development**: Nodemon

## 📁 Project Structure

```
├── app.js                 # Main application entry point
├── config/
│   └── sequelize.js       # Database configuration
├── controllers/           # Request handlers
│   ├── adminController.js
│   ├── accounts/
│   ├── admin/
│   ├── operations/
│   ├── sales/
│   └── site-eng/
├── middleware/            # Custom middleware
│   ├── authentication.js
│   ├── corsMiddeleware.js
│   ├── error-handler.js
│   └── not-found.js
├── modals/               # Database models
│   ├── index.js
│   └── User.js
├── routes/               # API routes
├── errors/               # Custom error handlers
└── utils/                # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js version 12
- npm or yarn
- MySQL or PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd OpsSync-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with your configuration:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=OpsSync_db
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the application**
   
   **Development mode:**
   ```bash
   npm run dev
   ```
   
   **Production mode:**
   ```bash
   npm start
   ```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🔐 API Features

- **Authentication**: JWT-based user authentication
- **Authorization**: Role-based access control
- **Input Validation**: Express-validator for request validation
- **Security**: Helmet for security headers, CORS configuration
- **Rate Limiting**: Protection against brute force attacks
- **Error Handling**: Centralized error management

## 📝 API Documentation

The API provides endpoints for:
- User management
- Admin operations
- Account handling
- Sales tracking
- Site engineering operations
- General utilities

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

---

**Version**: 1.0.0  
**Node.js Version Required**: 12
