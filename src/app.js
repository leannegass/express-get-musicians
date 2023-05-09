const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.set("json spaces", 2);

app.get("/musicians", async (request, response, next) => {
    const musicians = await Musician.findAll();
    response.json(musicians);
})
//Create a GET /musicians/id route to return musician at particular id or number
//passing in /:id as an endpoint 
app.get("/musicians/:id", async (request, response, next) => {
    // getting the number passed from the request example: musicians/1 will set id as 1 ..
    const index = request.params.id // assign the id value passed at the endpoint to the index variable
    const musicianAtIndex = await Musician.findByPk(index);
    response.json(musicianAtIndex);
    
})

// GET band route 
app.get("/bands", async (request, response, next) => {
    const bands = await Band.findAll();
    response.json(bands);
})

app.get("/bands/:id", async (request, response, next) => {
    // getting the number passed from the request example: bands/1 will set id as 1 ..
    const index = request.params.id // assign the id value passed at the endpoint to the index variable
    const bandAtIndex = await Band.findByPk(index);
    response.json(bandAtIndex);
    
})


module.exports = app;