const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
    console.log(err);
    console.log('UNCAUGHT EXCEPTION! Shutting down....');
    process.exit(1);
  });


const app = require('./app.js');

const DB = 'mongodb+srv://ghaith:7x5cxmkv7x5cxmkv@cluster0.xrkih.mongodb.net/videoTek?retryWrites=true&w=majority';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unHandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLER REJECTION! Shutting down....');
    server.close(() => {
      process.exit(1);
    });
  });