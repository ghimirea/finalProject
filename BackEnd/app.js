const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const registerRoute = require('./route/user');
const productRoute = require('./route/product');
const loginRoute = require('./route/auth');
const orderRoute = require('./route/order');

const db = config.get('mongoConnect');
const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

app.use(registerRoute);
app.use(loginRoute);
app.use(productRoute);
app.use(orderRoute);

app.get('/', (req, res) => {
  res.send('API is up and running');
});

const PORT = process.env.PORT || 5000;

const dbConnection = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connection to MongoDB is successfull');
  } catch (error) {
    console.error(err.message);
  }
};

dbConnection();
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
