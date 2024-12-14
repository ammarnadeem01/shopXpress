# ShopXpress

ShopXpress is a modern e-commerce platform built to provide seamless shopping experiences. The application is built using MERN (MongoDB, Express.js, React.js, Node.js) stack and features a robust, scalable, and interactive architecture to meet modern user expectations.

## Features

- **User Authentication**: Secure user sign-up, log-in, and management using JSON Web Tokens (JWT).
- **Product Management**: Browse, add, update, and delete products.
- **Shopping Cart**: Add/remove items from the cart with live total calculations.
- **Order Management**: Place orders, track order history, and receive updates.
- **Admin Panel**: Admin dashboard for managing products, users, and orders.
- **Reviews and Ratings**: Add reviews and ratings for products.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.

## Tech Stack

### Frontend:

- React.js
- Redux Toolkit for state management
- Tailwind CSS for UI design

### Backend:

- Node.js with Express.js
- MongoDB for database management
- JWT for authentication
- Cloudinary for image upload

### Other Tools:
- Stripe for payment integration.

## Installation

Follow the steps below to set up the project locally:

### Prerequisites:

- Node.js installed
- MongoDB installed
- A Stripe account

### Steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ammarnadeem01/shopxpress.git
   cd shopxpress
   ```

2. **Install dependencies:**

   ```bash
   cd Backend
   npm install

   cd ../Frontend/e-commerce-app
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the `backend` directory and add the following values:

   ```plaintext
   MONGO_URI=your-mongo-uri
   JWT_SECRET=your-jwt-secret
   CLOUDINARY_URL=your-cloudinary-url
   STRIPE_SECRET=dummy-stripe-key
   ```

4. **Run the backend server:**

   ```bash
   cd Backend
   npm start
   ```

5. **Run the frontend server:**

   ```bash
   cd ../Frontend/e-commerce-app
   npm run dev
   ```

6. **Access the application:**
   Open http://localhost:5173 in your browser.

## Folder Structure

### Backend:

- `controllers/` - API logic
- `models/` - Database schemas
- `routes/` - API endpoints

### Frontend:

- `src/components/` - Reusable UI components
- `src/pages/` - Pages for routing
- `src/redux/` - State management files
- 
Feel free to reach out with any questions or suggestions. Happy coding!

