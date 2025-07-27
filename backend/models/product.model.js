import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
}
,{
    timestamps: true,// This will add createdAt and updatedAt fields    
});

const Product=mongoose.model("Product",productSchema);
export default Product;
// This will create a collection named 'products' in the MongoDB database