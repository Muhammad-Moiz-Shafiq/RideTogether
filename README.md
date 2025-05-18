# RideTogether 🚗

![RideTogether Logo](./Frontend/src/images/logo.PNG)

**RideTogether** is a modern carpooling web application specifically designed for students at the National University of Sciences and Technology (NUST). The platform enables students to share rides, reduce transportation costs, decrease carbon emissions, and build community connections.

## 🌐 Live Demo

[View Live Demo](https://ridetogether.vercel.app)

## 📋 Overview

RideTogether connects drivers who have available seats with passengers headed in the same direction. The application features an intuitive user interface, comprehensive search functionality, and secure account management to create a seamless carpooling experience for university students.

## ✨ Key Features

- **User Authentication** - Secure registration, login, email verification, and password recovery
- **Ride Management** - Post, edit, and delete ride offers with detailed information
- **Advanced Search** - Find rides based on location, time, date, and passenger capacity
- **Interactive Maps** - Select exact pickup and drop-off locations using interactive maps
- **Profile Management** - View and edit personal information and ride history
- **Responsive Design** - Fully functional experience across desktop and mobile devices
- **Admin Dashboard** - Content and user management for platform administrators
- **Help Center** - FAQs and support information for platform users

## 🛠️ Technology Stack

### Frontend

- **React** (v19) - Modern UI library for building the user interface
- **React Router** - For routing and navigation
- **Axios** - For API requests
- **Leaflet** - For interactive maps integration
- **Bootstrap** - For responsive layout and UI components
- **AOS** - For scroll animations
- **Vite** - For fast development and building

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database for storing application data
- **Mongoose** - MongoDB object modeling
- **JWT** - For secure authentication
- **Bcrypt** - For password hashing
- **Nodemailer** - For email notifications

## 🔍 Core Functionality

- **Ride Posting**: Drivers can create ride listings with details about:

  - Route (start location, destination, stops)
  - Schedule (date, time, frequency)
  - Vehicle information (type, capacity, details)
  - Cost and preferences

- **Ride Finding**: Passengers can:
  - Search available rides with multiple filters
  - View detailed ride information
  - Contact ride providers
  - Manage their ride history

## 🔄 Application Workflow

1. Users register and create profiles
2. Drivers post rides with relevant details
3. Passengers search for rides matching their requirements
4. Riders connect through the platform
5. Both parties provide feedback after completed rides

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or newer)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/MuhammadHaseebUlHaqq/RideTogether.git
cd RideTogether
```

2. Install dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd Frontend
npm install --force

# Install backend dependencies
cd ../backend
npm install
```

3. Configure environment variables

```bash
# In the backend folder, create a .env file with:
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run the application

```bash
# Run backend only
cd backend
npm run server

# Run frontend only
cd Frontend
npm run dev

# Run both concurrently (from backend folder)
npm run dev
```

## 👥 Team

| Name                   | ID     |
| ---------------------- | ------ |
| Muhammad Haseeb Ul Haq | 454512 |
| Muhammad Moiz          | 464192 |
| Muhammad Omar Farooq   | 461846 |
| Obaid Satti            | 464870 |
| Abdul Ahad             | 457564 |

## 📱 Future Enhancements

- Real-time notifications
- In-app messaging system
- Ride ratings and reviews
- Payment integration
- Mobile applications (iOS/Android)
- Ride scheduling and calendar integration
- Enhanced analytics for route optimization

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions, feedback, or support, please [open an issue](https://github.com/MuhammadHaseebUlHaqq/RideTogether/issues) on GitHub.
