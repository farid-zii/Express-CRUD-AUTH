import express from 'express';
import {
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    saveProduct
} from '../controllers/ProductController.js'

const router = express.Router();

router.get('/products',getProduct);
router.get('/products/:id', getProductById);
router.post('/products', saveProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;