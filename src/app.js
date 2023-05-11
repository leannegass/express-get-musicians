const express = require("express");
const app = express();
const { Band , Musician} = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.set("json spaces", 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/musicians", async (request, response, next) => {
    try{
        const musicians = await Musician.findAll();
        response.json(musicians);
    }
    catch(e){
        next(e);
    }
    
})
//Create a GET /musicians/id route to return musician at particular id or number
//passing in /:id as an endpoint 
app.get("/musicians/:id", async (request, response, next) => {
    try{
        // getting the number passed from the request example: musicians/1 will set id as 1 ..
        const index = request.params.id // assign the id value passed at the endpoint to the index variable
        const musicianAtIndex = await Musician.findByPk(index);
        if(musicianAtIndex){
            response.json(musicianAtIndex);

        }
        else{
            response.sendStatus(404);
        }
        
        
    }
    catch(e){
        next(e);
    }
    
})
// express route to create new musician in database

app.post("/musicians", async (request, response, next) => {
    try{
        const musician = request.body;
        await Musician.create(musician);
        const musicians = await Musician.findAll();
        response.json(musicians);
    }
    catch(e){
        next(e);
    }
    
    
})

// express route to update(replace) a musician in database
app.put("/musicians/:id", async (request, response, next) => {
    try{
        const index = request.params.id 
        const newMusician = request.body;
        const musicianAtIndex = await Musician.findByPk(index);
        await musicianAtIndex.update(newMusician);
        const musicians = await Musician.findAll();
        response.json(musicians);
        

    }
    catch(e){
        next(e);
    }
    
})

// express route to delete a musician in given index in database
app.delete("/musicians/:id", async (request, response, next) => {
    try{
        const index = request.params.id 
        const musicianAtIndex = await Musician.findByPk(index);
        await musicianAtIndex.destroy();
        const musicians = await Musician.findAll();
        response.json(musicians);
        
    }
    catch(e){
        next(e);
    }
    
})

// GET band route 
app.get("/bands", async (request, response, next) => {
    try{
        const bands = await Band.findAll();
        response.json(bands);
    }
    catch(e){
        next(e);
    }
    
})

app.get("/bands/:id", async (request, response, next) => {
    try{
        // getting the number passed from the request example: bands/1 will set id as 1 ..
        const index = request.params.id // assign the id value passed at the endpoint to the index variable
        const bandAtIndex = await Band.findByPk(index);
        response.json(bandAtIndex);
        
    }
    catch(e){
        next(e);
    }   
})
app.use((e,request,response, next) => {
    response.status(500).send("Something broke!")
})


module.exports = app;