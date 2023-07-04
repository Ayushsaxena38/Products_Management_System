import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  productName: string;
  productDescription: string;
  price: number;
  category: string;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const productsSchema: Schema = new Schema({
  id: {
    type: String,
  },
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

const Products = mongoose.model<IProduct>('Products', productsSchema);

export default Products;
