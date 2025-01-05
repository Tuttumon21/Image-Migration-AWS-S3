const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime'); // Install with `npm install mime`
const productService = require('./service'); // Assuming service.js handles product logic
const logger = console; // Replace with a logging library like Winston if preferred

// AWS Configuration
AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
}); // e.g., 'us-east-1'
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME;

// Define the local storage path
const LOCAL_IMAGE_PATH = path.join(__dirname, 'assets/images');
logger.info(`Local image path: ${LOCAL_IMAGE_PATH}`);

async function migrateImages() {
    try {
 
        logger.info('Migration started');

        // Step 1: Fetch all products with image filenames
        const products = await productService.getAllProducts();
        console.log('Products fetched from database:', products);

        if (!products || products.length === 0) {
            logger.warn('No products found for migration.');
            return;
        }
        logger.info(`Fetched ${products.length} products`);

        for (const product of products) {
            const updatedImages = [];
            logger.info(`Processing product ${product._id} with images: ${product.images.join(', ')}`);

            for (const filename of product.images) {
                const localPath = path.join(LOCAL_IMAGE_PATH, filename);

                // Check if the file exists locally
                if (!fs.existsSync(localPath)) {
                    logger.warn(`File not found: ${localPath}`);
                    continue;
                }

                // Step 2: Upload image to S3
                const fileContent = fs.readFileSync(localPath);
                // const mimeType = mime.getType(localPath) || 'application/octet-stream'; // Default if unknown
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: `products/${product._id}/${filename}`, // Organized in a folder by product ID
                    Body: fileContent,
                    ContentType: 'image/png',
                };

                try {
                    logger.info(`Uploading image ${filename} to S3`);
                    const uploadResult = await s3.upload(params).promise();
                    logger.info(`Image uploaded successfully: ${uploadResult.Location}`);
                    updatedImages.push(uploadResult.Location);
                } catch (uploadError) {
                    logger.error(`Failed to upload image ${filename} to S3:`, uploadError);
                }
            }

            // Step 3: Update the product's image URLs in the database
            if (updatedImages.length > 0) {
                try {
                    logger.info(`Updating product ${product._id} with new image URLs`);
                    await productService.updateProductImages(product._id, updatedImages);
                    logger.info(`Product ${product._id} updated successfully`);
                } catch (updateError) {
                    logger.error(`Failed to update product ${product._id} in database:`, updateError);
                }
            }
        }

        logger.info('Migration completed successfully!');
    } catch (error) {
        logger.error('Unexpected error during migration:', error);
    }
}

module.exports = { migrateImages };
