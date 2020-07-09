const router = require('express').Router();
const orderController = require('../controller/product');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

