import express from 'express';

import { deleteProduct,createProduct,getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/",getProducts); 
router.post("/",createProduct);
router.put("/:id",updateProduct );
router.delete("/:id",deleteProduct); 


export default router;