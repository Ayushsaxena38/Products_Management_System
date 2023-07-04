import express, { Request, Response } from 'express';
import productsRouter from './routes/products';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb+srv://ayushsaxena38:Ayush%4012345@cluster0.dwrztdb.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to the database'));
db.once('open', function () {
  console.log('Successfully connected to the database');
});

app.use('/', productsRouter);

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
