const Product = require('./model'); // Import your product schema

// Fetch all products with their images
// async function getAllProducts() {
//     return await Product.find(); // Fetch all product documents
// }

const getAllProducts = async()=>{
    return await Product.find(); 
}

// Update the product with new image URLs
async function updateProductImages(productId, updatedImages) {
    return Product.findByIdAndUpdate(productId, { images: updatedImages }, { new: true });
}



module.exports = { getAllProducts, updateProductImages };
