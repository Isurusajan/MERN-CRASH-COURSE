import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js'; // Import the connectDB function
import product from './models/product.model.js'; // Import product data
// Connect to MongoDB

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/api/products",async (req, res) => {
const product=req.body;//user will send this data in the request body

if(!product.name || !product.price || !product.image){
    return res.status(400).json({ success:false,message: "Please fill all the fields"});
  }

  const newProduct = new product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });  
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }

});


app.listen(5000, () => {
  connectDB();
  console.log('Server started at http://localhost:5000 ');
});
