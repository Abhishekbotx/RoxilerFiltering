const  Product = require("../models/Product");

class ProductServices {
    async transactionPerMonth(data) {
        try {
            const { page = 1, perPage = 5, search = '', month } = data;
            const monthNumber = month ? new Date(`2024-${month}-01`).getMonth() + 1 : null;

            const regex = new RegExp(search, 'i');
            console.log('regex:', regex);



            const monthFilter = monthNumber
                ? {
                    $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
                }
                : {};

            console.log('month:', monthFilter);



            const transactions = await Product.aggregate([
                {
                    $match: {
                        ...monthFilter,
                        $or: [
                            { title: regex },
                            { description: regex },
                            { category: regex },
                        ],
                    },
                },
                {
                    $skip: (page - 1) * perPage,
                },
                {
                    $limit: parseInt(perPage),
                },
            ]);


            console.log('transactions:',transactions);
            const totalCount = await Product.countDocuments({
                ...monthFilter,
                $or: [
                    { title: regex },
                    { description: regex },
                    { category: regex },
                ],
            });
            
            

            return {transactions,totalCount}
        } catch(error) {
            throw error
        }
    }
    async statisticsPerMonth(month) {
        try {
            const monthNumber = new Date(`2024-${month}-01`).getMonth() + 1;
            const statistics = await Product.aggregate([
              {
                $match: {
                  $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
                },
              },
              {
                $group: {
                  _id: null,
                  totalSaleAmount: {
                    $sum: {
                      $cond: [{ $eq: ['$sold', true] }, '$price', 0],
                    },
                  },
                  totalSoldItems: {
                    $sum: {
                      $cond: [{ $eq: ['$sold', true] }, 1, 0],
                    },
                  },
                  totalNotSoldItems: {
                    $sum: {
                      $cond: [{ $eq: ['$sold', false] }, 1, 0],
                    },
                  },
                }
              },
              {
                $project: {
                  _id: 0,
                  totalSaleAmount: 1,
                  totalSoldItems: 1,
                  totalNotSoldItems: 1,
                },
              },
            ]);
        
            const response = statistics[0] || {
              totalSaleAmount: 0,
              totalSoldItems: 0,
              totalNotSoldItems: 0,
            };

            return response
        } catch(error) {
            throw error
        }
    }

    async barDataPerMonth(month) {
        try {
            const monthNumber = new Date(`2024-${month}-01`).getMonth() + 1;
            const priceRanges = await Product.aggregate([
                {
                  $match: {
                    $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
                  },
                },
                {
                  $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
                    default: "901 and above",
                    output: {
                      count: { $sum: 1 },
                    },
                  },
                },
              ]);

              return priceRanges
        } catch(error) {
            throw error
        }
    }

    async pieDataPerMonth(month) {
        try {
            const monthNumber = new Date(`2024-${month}-01`).getMonth() + 1;
            const Ranges = await Product.aggregate([
                {
                  $match: {
                    $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
                  },
                },
                {
                  $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                  }
                },
              ]);
          

              return Ranges
        } catch(error) {
            throw error
        }
    }
}

module.exports=ProductServices