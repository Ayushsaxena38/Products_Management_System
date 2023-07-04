"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products_controller");
const router = (0, express_1.Router)();
// Route for creating a new product entry in the inventory/products list
router.post('/products/create', products_controller_1.create);
// Route for getting all products list/entry
router.get('/products', products_controller_1.getProducts);
// Route for deleting a particular product by id
router.delete('/products/:id', products_controller_1.deleteProduct);
// Route for updating a predefined product's quantity based on the given number (positive for increment and negative for decrement)
router.post('/products/:id/update_quantity', products_controller_1.update);
exports.default = router;
