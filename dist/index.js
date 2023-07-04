"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./routes/products"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default
    .connect('mongodb+srv://ayushsaxena38:Ayush%4012345@cluster0.dwrztdb.mongodb.net/')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'Error connecting to the database'));
db.once('open', function () {
    console.log('Successfully connected to the database');
});
app.use('/', products_1.default);
app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});
