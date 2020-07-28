const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const registerRoute = require('./route/user');
const productRoute = require('./route/product');
const loginRoute = require('./route/auth');
const cartRoute = require('./route/cart');
const orderRoute = require('./route/order');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const db = config.get('mongoConnect');

const PORT = process.env.PORT || 5000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Local Online',
      description: "Online Farmer's Market",
      contact: {
        name: 'Ashim Ghimire',
      },
      servers: ['http://localhost:5000'],
    },
  },

  apis: ['./route/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json({ extended: false }));

app.use(registerRoute);
app.use(loginRoute);
app.use(productRoute);
app.use(cartRoute);
app.use(orderRoute);

app.get('/', (req, res) => {
  res.send('API is up and running');
});

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
