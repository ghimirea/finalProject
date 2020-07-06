const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const userRoute = require('./route/user');
const productRoute = require('./route/product');

const db = config.get('mongoConnect');
const app = express();
express.json();

app.use(cors());

app.use(userRoute);
app.use(productRoute);

app.get('/', (req, res) => {
  res.send('API is up and running');
});

const PORT = process.env.PORT || 5000;

const dbConnection = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
