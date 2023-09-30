const express = require('express');
const mongoose = require('mongoose');  //importing ODM(Object document mapper) name Mongoose for MongoDb database

require('dotenv').config();  //importing dotenv package in node.js

const Todo = require("./models/TodoSchema");

const app = express();

app.use(express.json()) //adding middleware to convert data from API to json format.

const PORT = process.env.PORT;

app.post("/todo",async (req,res)=>{
    const {text,isCompleted} = req.body; //destructuring the data receiving from the Frontend Api call

    console.log("api called todo")
    if(text.length === 0 || isCompleted ===null)
    {
      return res.status(400).send({
        status : 400,
        message :"Please enter the data in valid format!"
      })
    }

    try {
      
         const todoObj = new Todo({   //Creating an object by adding the data received from the Frontend API call
            text:text,
            isCompleted : isCompleted,
         })

         await todoObj.save();  //Saving the above object to the database document
          
         res.status(201).send({
            status : 201,
            message : "Todo added successfully to the database",
         })
    }
    catch(error) {
         res.status(400).send({
           status :400,
           message : "Todo creation failed please try again" 
         })
    }
})

mongoose.connect(process.env.MONGODB_URI)           //Using ODM(object document mapper) to simplify the syntax of connecting to MongoDB database
.then(()=>{console.log("MongoDB is connected")})  //It will retur promise so then and catch is being used
.catch((error)=>{console.log(error)});

app.listen(PORT,()=>{
    console.log("Server is running in port",PORT);
})
