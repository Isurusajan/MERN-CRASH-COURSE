import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js'; // Import the connectDB function
import productRoutes from './routes/product.route.js'; // Import product routes
dotenv.config();
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // Get the current directory name

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  app.get("*",(req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", 'index.html'));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:"+ PORT);
});