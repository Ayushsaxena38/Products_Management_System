"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const url:string ='mongodb://127.0.0.1:27017/pms_api_db'
// Connect to MongoDB
mongoose_1.default.connect('mongodb://127.0.0.1:27017/pms_api_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // poolSize: parseInt(process.env.POOL_SIZE!),
})
    .then((res) => {
    console.log('Connected to Distribution API Database - Initial Connection');
})
    .catch((err) => {
    console.log(`Initial Distribution API Database connection error occured -`, err);
});
// Acquire the connection to check if it is successful.
const db = mongoose_1.default.connection;
// If an error occurs, this db.on() will notify by showing this message.
db.on('error', console.error.bind(console, 'Error connecting to the database'));
// When the connection is successfully established, the db.once() will notify by showing this message.
db.once('open', function () {
    console.log('Successfully connected to the database');
});
exports.default = db;
