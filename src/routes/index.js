const express = require('express');
const { transactionPerMonth, statisticsPerMonth, barChartPerMonth, pieChartPerMonth } = require('../controllers/transactionController.js');
const router = express.Router();

router.use('/transactions', transactionPerMonth);  
router.use('/statistics', statisticsPerMonth);  
router.use('/barChart', barChartPerMonth);  
router.use('/pieChart', pieChartPerMonth);  



module.exports = router;
