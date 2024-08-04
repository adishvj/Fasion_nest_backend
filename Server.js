const express = require("express") //pakage importing
const app = express()//the functionality call to the variable app
const mongoose = require("mongoose");
const productsRoutes = require("./Routes/product_routes");
const StaffRoutes = require("./Routes/staffRouts");
const authRouter = require("./Routes/auth_router");
const cartRouter = require("./Routes/cart_routes"); // Import cart routes
require('dotenv').config();//for working .env
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("database connected")
})
    .catch((error) => {
        console.log(error)

    })
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use("/api/product", productsRoutes)
app.use("/api/staff", StaffRoutes)
app.use("/api/auth/",authRouter)
app.use("/api/cart", cartRouter); // Use cart routes




app.get("/", (req, res) => {//its a route   req,res are parameter
    res.send('hellooo')
})


app.get("/add", (req, res) => {//its a route   req,res are parameter
    res.send('hello world')
})


app.get("/addzz", (req, res) => {//its a route   req,res are parameter
    res.send('hello world!!')
})

app.get("/addhello", (req, res) => {//its a route   req,res are parameter
    res.send('hello !!...........')
})


app.listen(process.env.port, () => {
    console.log('server started');
})

