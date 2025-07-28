import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js'; // Import the connectDB function
import productRoutes from './routes/product.route.js'; // Import product routes
dotenv.config();

const app = express();
const PORT = process.env.PORT ;

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:"+ PORT);
});
