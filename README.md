# 🛒 AadiiCart - Full Stack E-commerce Platform

A modern, feature-rich e-commerce web application built with React, Node.js, and MongoDB. AadiiCart provides a complete online shopping experience with separate customer and admin interfaces.

## 🌟 Features

### Customer Features
- 🔐 User authentication (Register/Login/Logout)
- 🛍️ Product browsing and search
- 🛒 Shopping cart management
- 💳 Secure payment integration with Razorpay
- 📦 Order tracking and history
- 👤 User profile management
- 📧 Contact and newsletter subscription

### Admin Features
- 📊 Admin dashboard
- 📦 Product management (Add/Edit/Delete)
- 👥 User management
- 📋 Order management and processing
- 📈 Sales analytics
- 📧 Contact form management

### Technical Features
- 🔒 JWT-based authentication
- 📱 Responsive design with Tailwind CSS
- ☁️ Cloud image storage with Cloudinary
- 📧 Email notifications with Nodemailer
- 🧾 Invoice generation
- 🔄 Real-time updates

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Navigation
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image storage
- **Razorpay** - Payment gateway
- **Nodemailer** - Email service

## 📁 Project Structure

```
AadiiCart/
├── Frontend/          # Customer-facing React app
├── admin/            # Admin panel React app
├── backend/          # Node.js API server
│   ├── config/       # Database and service configs
│   ├── controller/   # Route controllers
│   ├── middleware/   # Authentication middleware
│   ├── model/        # MongoDB models
│   ├── routes/       # API routes
│   └── utils/        # Utility functions
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/aadiiguptagithub/AadiiCart.git
cd AadiiCart
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env

```

3. **Frontend Setup**
```bash
cd ../Frontend
npm install
```

Create `.env` file in Frontend directory:
```env

```

4. **Admin Panel Setup**
```bash
cd ../admin
npm install
```

Create `.env` file in admin directory:
```env
VITE_API_URL=http://localhost:8000
```

### Running the Application

1. **Start MongoDB** (if running locally)
```bash
mongod
```

2. **Start Backend Server**
```bash
cd backend
npm run dev
```
Server runs on http://localhost:8000

3. **Start Frontend (Customer)**
```bash
cd Frontend
npm run dev
```
Frontend runs on http://localhost:5173

4. **Start Admin Panel**
```bash
cd admin
npm run dev
```
Admin panel runs on http://localhost:5174

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/registration` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Product Endpoints
- `GET /api/product/all` - Get all products
- `POST /api/product/add` - Add new product (Admin)
- `PUT /api/product/update/:id` - Update product (Admin)
- `DELETE /api/product/delete/:id` - Delete product (Admin)

### Cart Endpoints
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove item from cart

### Order Endpoints
- `POST /api/order/create` - Create new order
- `GET /api/order/user` - Get user orders
- `GET /api/order/all` - Get all orders (Admin)
- `PUT /api/order/status` - Update order status (Admin)

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=8000

```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000

```

## 🚀 Deployment

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or DigitalOcean
2. Set environment variables in your hosting platform
3. Ensure MongoDB connection string is updated for production

### Frontend Deployment
1. Build the applications:
```bash
# Customer Frontend
cd Frontend && npm run build

# Admin Panel
cd admin && npm run build
```
2. Deploy to Netlify, Vercel, or similar platforms
3. Update API URLs in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aditya**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the flexible database
- Cloudinary for image management
- Razorpay for payment integration
- All open-source contributors

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/aadiiguptagithub/AadiiCart/issues) page
2. Create a new issue if your problem isn't already listed
3. Contact the maintainer directly

---

⭐ **Star this repository if you found it helpful!**