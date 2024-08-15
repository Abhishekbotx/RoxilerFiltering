const express = require('express')
const { PORT } = require('./src/config/dotenvConfig')
const cookieParser = require("cookie-parser");
const {connect} = require('./src/config/dbConfig')
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

const apiRoutes = require('./src/routes/index');
const { default: axios } = require('axios');
const Product = require('./src/models/Product');



app.get("/", (req, res) => {
    res.send(`<h1> This is HOMEPAGE </h1>`);
});

app.get("/getdata", async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
        const data = await Product.insertMany(response.data)
        console.log('data:', response.data);
        res.json({
            success: true,
            data: data
        })
    } catch (error) {
        res.json({
            success: false,
            err: error.name,
            message:error.message
        })
    }

});
const prepareAndStartServer = () => {
    app.use('/api', apiRoutes);

    connect() 
    app.listen(PORT, () => {
        console.log(`server running on port:${PORT}`)
    })


}

prepareAndStartServer()