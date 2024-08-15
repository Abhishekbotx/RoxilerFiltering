const { StatusCodes } = require('http-status-codes');
const ProductServices = require('../services/transactionServices');
const productServices = new ProductServices

const transactionPerMonth = async (req, res) => {
  try {
    const data = req.query
    if (!data.month) {
      return res.status(400).json({ error: 'Month is required' });
    }
    const response = await productServices.transactionPerMonth(data)
    const { transactions, totalCount } = response
    res.status(StatusCodes.OK).json({ transactions, totalCount });;
  } catch (error) {
    console.log('error:',error);
    
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Internal Server Error',
      success: false,
      error: error.explanation || 'Unknown error occurred',
      data: {}
    });

  }
}

const statisticsPerMonth = async (req, res) => {
  try {
    const {month} = req.query
    if (!month) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Month is required' });
    }
    const response = await productServices.statisticsPerMonth(month)
    
    res.status(StatusCodes.OK).json({ 
      response });;
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Internal Server Error',
      success: false,
      error: error.explanation || 'Unknown error occurred',
      data: {}
    });

  }
}
const barChartPerMonth = async (req, res) => {
  try {
    const {month} = req.query
    if (!month) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Month is required' });
    }
    const response = await productServices.barDataPerMonth(month)

    res.status(StatusCodes.OK).json({  response});;
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Internal Server Error',
      success: false,
      error: error.explanation || 'Unknown error occurred',
      data: {}
    });

  }
}
const pieChartPerMonth = async (req, res) => {
  try {
    const {month} = req.query
    if (!month) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Month is required' });
    }
    const response = await productServices.pieDataPerMonth(month)
    res.status(StatusCodes.OK).json({ response });;
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Internal Server Error',
      success: false,
      error: error.explanation || 'Unknown error occurred',
      data: {}
    });

  }
}


module.exports = { transactionPerMonth,statisticsPerMonth,barChartPerMonth,pieChartPerMonth }