import express from 'express';
import { Router } from 'express';
import { getProducts, create, deleteProduct, update } from '../controllers/products_controller';

const router = Router();

// Route for creating a new product entry in the inventory/products list
router.post('/products/create', create);

// Route for getting all products list/entry
router.get('/products', getProducts);

// Route for deleting a particular product by id
router.delete('/products/:id', deleteProduct);

// Route for updating a predefined product's quantity based on the given number (positive for increment and negative for decrement)
router.post('/products/:id/update_quantity', update);

export default router;
