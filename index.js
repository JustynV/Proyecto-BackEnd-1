const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser")
const uri = process.env.DB_URI
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req,res) => {
    res.status(200).json({});
})

const rutasProducto = require("./book/book.route.js")
app.use('/book', rutasProducto);

const rutasUser = require("./user/user.route.js")
app.use('/user', rutasUser);

const rutasOrder= require("./order/order.route.js")
app.use('/order', rutasOrder);


// aqui va la connection string VVVVV
mongoose.connect(uri).then(() => {
    console.log("CONNECTED")
    app.listen(8080);
}).catch((err) =>{
    console.log("ERROR")
    console.log(err)
})



