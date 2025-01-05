# Image-Migration-AWS-S3
 Transferring Local Image files to AWS S3 Migration.
 Database collection :
 Products fetched from database: [
  {
    _id: new ObjectId('677a254a5a5609d1e6a3232c'),
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    price: 99.99,
    images: [ 'image1.png' ]
  },
  {
    _id: new ObjectId('677a254a5a5609d1e6a3232d'),
    name: 'Smartphone Stand',
    description: 'Adjustable smartphone stand, perfect for video calls and watching videos.',
    price: 15.99,
    images: [ 'image2.png', 'image3.png' ]
  },
  {
    _id: new ObjectId('677a254a5a5609d1e6a3232e'),
    name: 'Gaming Laptop',
    description: 'High-performance gaming laptop with an Intel Core i7 processor and NVIDIA graphics.',
    price: 1299.99,
    images: [ 'image4.png', 'image5.png', 'image6.png' ]
  }
]
 sample migration New AWS link :
https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232c/image1.png
https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232d/image2.png
https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232d/image3.png
https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232e/image4.png
https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232e/image5.png
https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232e/image6.png

# NEW UPDATED DATABASE COLLECTION:
[
    {
        "_id": "677a254a5a5609d1e6a3232c",
        "name": "Wireless Headphones",
        "description": "High-quality wireless headphones with noise cancellation and long battery life.",
        "price": 99.99,
        "images": [
            "https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232c/image1.png"
        ]
    },
    {
        "_id": "677a254a5a5609d1e6a3232d",
        "name": "Smartphone Stand",
        "description": "Adjustable smartphone stand, perfect for video calls and watching videos.",
        "price": 15.99,
        "images": [
            "https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232d/image2.png",
            "https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232d/image3.png"
        ]
    },
    {
        "_id": "677a254a5a5609d1e6a3232e",
        "name": "Gaming Laptop",
        "description": "High-performance gaming laptop with an Intel Core i7 processor and NVIDIA graphics.",
        "price": 1299.99,
        "images": [
            "https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232e/image4.png",
            "https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232e/image5.png",
            "https://tuttumon.s3.ap-south-1.amazonaws.com/products/677a254a5a5609d1e6a3232e/image6.png"
        ]
    }
]


Here’s a polished and detailed **README** file template tailored for your project:  

---

# **Image Migration to AWS S3**  

A Node.js application for migrating product images from local storage to an AWS S3 bucket, updating MongoDB with the newly generated S3 URLs for seamless integration with the DatabaseNAME system.  

## **Features**  
- Fetches product details from MongoDB.  
- Uploads local images to AWS S3.  
- Updates product image URLs in the database with S3 links.  
- Error handling and detailed logging for every step of the migration.  

---

## **Tech Stack**  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **AWS Services**: S3 (Simple Storage Service)  
- **Others**: MIME, Body-Parser  

---

## **Setup and Installation**  

### Prerequisites  
1. **Node.js** installed (v14.x or later).  
2. **MongoDB** installed and running locally or on a remote server.  
3. An **AWS S3 bucket** set up and configured.  

---

### **Steps to Install**  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/EcomTEST-image-migration.git  
   cd EcomTEST-image-migration  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Create a `.env` file in the root directory and add the following:  
   ```env  
   MONGO_URI=mongodb://localhost:27017/{Your Database Name} or mongoDB URL
   AWS_ACCESS_KEY_ID=your-access-key-id  
   AWS_SECRET_ACCESS_KEY=your-secret-access-key  
   AWS_REGION=your-aws-region 
   S3_BUCKET_NAME=your-s3-bucket-name  
   ```  

4. Update the `LOCAL_IMAGE_PATH` in `migration.js` if your image folder path differs:  
   ```javascript  
   const LOCAL_IMAGE_PATH = path.join(__dirname, 'assets/images');
   ```  

5. Start the server:  
   ```bash  
   node app.js  
   ```  

---

## **Endpoints**  
## **USE POSTMAN APPLICATION FOR TESTING.**
### **1. Migrate Images**  
**POST** `/api/products/migrate-images`  
- Description: Triggers the image migration process.  
- Response:  
  - **200 OK**: Migration completed successfully.  
  - **500 Internal Server Error**: Migration failed with error details.  

---

## **Usage**  
1. Ensure all product details are in the MongoDB database under the `testimages` collection.  
2. Ensure images are located in the `assets/images` folder with filenames matching the `images` field in your MongoDB documents.  
3. Use a tool like Postman to call the `/api/products/migrate-images` endpoint to start the migration process.  

---

## **Folder Structure**  
```  
EcomTEST-image-migration/  
├── app.js          # Entry point for the server  
├── controller.js   # Handles migration requests  
├── migration.js    # Contains the logic for S3 migration  
├── model.js        # MongoDB schema for products  
├── routes.js       # API routes for products  
├── service.js      # Business logic for database operations  
├── assets/  
│   └── images/     # Folder containing local images for migration  
```  

---

## **Contributing**  
1. Fork the repository.  
2. Create your feature branch: `git checkout -b feature/my-feature`.  
3. Commit your changes: `git commit -m 'Add some feature'`.  
4. Push to the branch: `git push origin feature/my-feature`.  
5. Open a pull request.  

---

## **License**  
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  

---

Feel free to customize this further! Let me know if you need help with any other section. 😊


