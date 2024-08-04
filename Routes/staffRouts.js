const express = require("express")
const StaffRoutes = express.Router()
StaffRoutes.get("/",(req,res)=>{//its a route   req,res are parameter//eth server.js le arikkanam
    res.send('Sindu')
    })







    

    module.exports=StaffRoutes