const express = require('express');
const { handleMigration ,fetchAndLogAllProducts} = require('./controller');

const router = express.Router();

// Migration route
router.post('/migrate-images', handleMigration);

router.get('/view-products', fetchAndLogAllProducts);

module.exports = router;
