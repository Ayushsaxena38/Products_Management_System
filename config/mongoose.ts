import mongoose,{ConnectOptions} from 'mongoose';
// const url:string ='mongodb://127.0.0.1:27017/pms_api_db'

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pms_api_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // poolSize: parseInt(process.env.POOL_SIZE!),
} as ConnectOptions)
.then((res) => {
  console.log(
    'Connected to Distribution API Database - Initial Connection'
  );
})
.catch((err) => {
  console.log(
    `Initial Distribution API Database connection error occured -`,
    err
  );
});

// Acquire the connection to check if it is successful.
const db = mongoose.connection;

// If an error occurs, this db.on() will notify by showing this message.
db.on('error', console.error.bind(console, 'Error connecting to the database'));

// When the connection is successfully established, the db.once() will notify by showing this message.
db.once('open', function () {
  console.log('Successfully connected to the database');
});

export default db;
