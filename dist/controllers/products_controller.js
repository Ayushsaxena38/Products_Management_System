"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.deleteProduct = exports.create = exports.getProducts = void 0;
const sequence_1 = __importDefault(require("../models/sequence"));
const products_1 = __importDefault(require("../models/products"));
// Controller action for getting all products list/entry
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_1.default.find({}).select(['-_id', 'id', 'productName', 'stockQuantity']);
        if (products.length === 0) {
            return res.status(200).json({
                message: "Zero Products"
            });
        }
        else {
            return res.status(200).json({
                data: {
                    products
                }
            });
        }
    }
    catch (error) {
        console.log('Error in finding the products list:', error);
        return res.status(500).json({
            message: 'Server error'
        });
    }
});
exports.getProducts = getProducts;
// Controller action for creating a new product entry in the inventory/products list
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seq = yield sequence_1.default.find({});
        if (seq.length === 0) {
            try {
                const newSeq = yield sequence_1.default.create({
                    name: 'sequence',
                    seq: 1
                });
                console.log('First Sequence is created successfully');
                console.log(newSeq);
                try {
                    const product = yield products_1.default.create({
                        productName: req.body.productName,
                        productDescription: req.body.productDescription,
                        price: req.body.price,
                        category: req.body.category,
                        stockQuantity: req.body.stockQuantity,
                        id: newSeq.seq
                    });
                    console.log('Product is created successfully:', product);
                    return res.status(200).json({
                        data: {
                            Product: {
                                productName: product.productName,
                                productDescription: product.productDescription,
                                price: product.price,
                                category: product.category,
                                stockQuantity: product.stockQuantity,
                            }
                        }
                    });
                }
                catch (err) {
                    console.log('Error in creating the Product:', err);
                }
            }
            catch (err) {
                console.log('Error in creating the first Sequence:', err);
            }
        }
        else {
            let c = seq[0].seq;
            c++;
            sequence_1.default.findOneAndUpdate(seq, { $inc: { seq: 1 } })
                .then((result) => {
                console.log(result);
            });
            products_1.default.create({
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                price: req.body.price,
                category: req.body.category,
                stockQuantity: req.body.stockQuantity,
                id: c
            })
                .then((prdt) => {
                return res.status(200).json({
                    data: {
                        Product: {
                            productName: prdt.productName,
                            productDescription: prdt.productDescription,
                            price: prdt.price,
                            category: prdt.category,
                            stockQuantity: prdt.stockQuantity,
                        }
                    }
                });
            });
        }
    }
    catch (err) {
        console.log('Error in finding the Sequence:', err);
    }
});
exports.create = create;
// Controller action for deleting a particular product by id
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteResult = yield products_1.default.findOneAndDelete({ 'id': req.params.id });
        if (deleteResult) {
            console.log('Exists:', deleteResult);
            return res.status(200).json({
                message: 'Product deleted!'
            });
        }
        else {
            console.log('Not Exists:', deleteResult);
            return res.status(200).json({
                message: 'Product does not exist'
            });
        }
    }
    catch (error) {
        console.log('Error in deleting the product:', error);
        return res.status(500).json({
            message: "Error in deleting the product"
        });
    }
});
exports.deleteProduct = deleteProduct;
// Controller action for updating a predefined product's quantity based on the given number (positive for increment and negative for decrement)
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield products_1.default.findOne({ 'id': req.params.id });
        console.log(product);
        if (product === null) {
            return res.status(200).json({
                message: "Product does not exist/wrong product id"
            });
        }
        else {
            try {
                const quantityChange = Number(req.query.number); // Convert query number to a number
                if (isNaN(quantityChange)) {
                    throw new Error('Invalid quantity change');
                }
                const newQuantity = product.stockQuantity + quantityChange;
                console.log(newQuantity);
                const result = yield products_1.default.findOneAndUpdate({ 'id': req.params.id }, { stockQuantity: newQuantity });
                console.log(result);
                return res.status(200).json({
                    data: {
                        product: {
                            id: product.id,
                            productName: product.productName,
                            productDescription: product.productDescription,
                            price: product.price,
                            category: product.category,
                            stockQuantity: newQuantity
                        },
                        message: 'Updated successfully!'
                    }
                });
            }
            catch (error) {
                console.log('Error in updating the product:', error);
                return res.status(500).json({
                    message: 'Error in updating the product'
                });
            }
        }
    }
    catch (error) {
        console.log('Error in finding the product:', error);
        return res.status(500).json({
            message: 'Server error'
        });
    }
});
exports.update = update;
