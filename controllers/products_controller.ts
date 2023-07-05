import { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import db from '../config/mongoose';
import Sequence from '../models/sequence';
import Products, { IProduct } from '../models/products';

// Controller action for getting all products list/entry
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products: IProduct[] = await Products.find({}).select('-_id');
    if (products.length === 0) {
      return res.status(200).json({
        message: "Zero Products"
      });
    } else {
      return res.status(200).json({
        data: {
          products
        }
      });
    }
  } catch (error) {
    console.log('Error in finding the products list:', error);
    return res.status(500).json({
      message: 'Server error'
    });
  }
};

// Controller action for creating a new product entry in the inventory/products list
export const create = async (req: Request, res: Response) => {
  try {
    const seq = await Sequence.find({});
    if (seq.length === 0) {
      try {
        const newSeq = await Sequence.create({
          name: 'sequence',
          seq: 1
        });
        console.log('First Sequence is created successfully');
        console.log(newSeq);
        try {
          const product: IProduct = await Products.create({
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
        } catch (err) {
          console.log('Error in creating the Product:', err);
        }
      } catch (err) {
        console.log('Error in creating the first Sequence:', err);
      }
    } else {
      let c = seq[0].seq;
      c++;
      Sequence.findOneAndUpdate(seq, { $inc: { seq: 1 } })
        .then((result) => {
          console.log(result);
        });

      Products.create({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        price: req.body.price,
        category: req.body.category,
        stockQuantity: req.body.stockQuantity,
        id: c
      })
        .then((prdt: IProduct) => {
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
  } catch (err) {
    console.log('Error in finding the Sequence:', err);
  }
};

// Controller action for deleting a particular product by id
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleteResult = await Products.findOneAndDelete({ 'id': req.params.id });
    if (deleteResult) {
      console.log('Exists:', deleteResult);
      return res.status(200).json({
        message: 'Product deleted!'
      });
    } else {
      console.log('Not Exists:', deleteResult);
      return res.status(200).json({
        message: 'Product does not exist'
      });
    }
  } catch (error) {
    console.log('Error in deleting the product:', error);
    return res.status(500).json({
      message: "Error in deleting the product"
    });
  }
};

// Controller action for updating a predefined product's quantity based on the given number (positive for increment and negative for decrement)
export const update = async (req: Request, res: Response) => {
  try {
    const product: IProduct | null = await Products.findOne({ 'id': req.params.id });
    console.log(product);
    if (product === null) {
      return res.status(200).json({
        message: "Product does not exist/wrong product id"
      });
    } else {
      try {
        const quantityChange: number = Number(req.query.number); // Convert query number to a number
        if (isNaN(quantityChange)) {
          throw new Error('Invalid quantity change');
        }
        const newQuantity = product.stockQuantity + quantityChange;
        console.log(newQuantity);
        const result: IProduct | null = await Products.findOneAndUpdate({ 'id': req.params.id }, { stockQuantity: newQuantity });
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
      } catch (error) {
        console.log('Error in updating the product:', error);
        return res.status(500).json({
          message: 'Error in updating the product'
        });
      }
    }
  } catch (error) {
    console.log('Error in finding the product:', error);
    return res.status(500).json({
      message: 'Server error'
    });
  }
};
