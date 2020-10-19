const express = require('express');
const db = require("../data/config.js");
const server = express();

server.use(express.json());

server.get("/",(req, res, next)=>{
   res.status(200).json({welcomeMessage: "Hi Welcome to the Cars API!"})
});

server.get("/cars", async(req,res,next)=>{
    try{
        const cars = await db.select("*").from("cars");
        if (cars.length > 0){
        res.json(cars)
    } else{
        res.json({message: "There are no cars in the database currently."})
    }
    }
    catch(error){
        next(error);
    };
});

server.post("/cars", async(req, res, next)=>{
   try{
        const payload={
        VIN: req.body.VIN,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage,
        transmission: req.body.transmission,
        status: req.body.status
        };
        if(!payload.VIN || !payload.make || !payload.model || !payload.mileage){
            res.status(400).json({errMsg: "Please enter the required vehicle information!"})
        }
        const [id] = await db.insert(payload).into("cars")
        const [car] = await db.select("*").from("cars").where("ID", id)
        res.status(200).json(car) 
    } catch(error){
        next(error)
    }
})
 

module.exports = server;