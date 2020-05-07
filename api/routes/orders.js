const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');
const OrdersController  = require('../controllers/order');



router.get('/',checkAuth,OrdersController.orders_get_all);


router.post('/',checkAuth,OrdersController.create_order);

router.get('/:orderId',checkAuth,OrdersController.get_orderByid);

router.delete('/:orderId',checkAuth,OrdersController.delete_order);

module.exports = router;