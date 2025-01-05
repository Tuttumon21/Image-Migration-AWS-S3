const { migrateImages } = require('./migration');
const productService = require('./service')

async function handleMigration(req, res) {
    try {
        await migrateImages();
        res.status(200).send('Migration completed successfully!');
    } catch (error) {
        res.status(500).send({ error: 'Migration failed', details: error.message });
    }
}

// Fetch and log all products for debugging
// async function fetchAndLogAllProducts() {
//     try {
//         const products = await productService.getAllProducts();
//         if (!products || products.length === 0) {
//             console.log('No products found in the database.');
//         } else {
//             console.log('Products found:', products);
//         }
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     }
// }

const fetchAndLogAllProducts = async(req,res)=>{
    try {
        const products = await productService.getAllProducts();
        if (!products || products.length === 0) {
            console.log('No products found in the database.');
        } else {
            console.log('Products found:', products);
        }
        res.status(200).send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send({ error: 'Error fetching products', details: error.message });
    }
}


module.exports = { handleMigration,fetchAndLogAllProducts };
