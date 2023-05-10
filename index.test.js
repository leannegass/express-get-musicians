// install dependencies
const {it, describe, expect} = require("@jest/globals");
const { execSync } = require('child_process');
// execSync('npm install');
// execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");

describe('GET /musicians', () => {
    // Write your tests here
    test("Testing /musicians endpoint", async () => {
        // Sends request to `./musicians` endpoint
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
    });
    test("returns an array", async () => {
        const response = await request(app).get("/musicians");
        expect(Array.isArray(response.body)).toBeTruthy;

    });
    //skipping test for now
    test.skip("Testing /musicians endpoint", async () => {
        // Sends request to `/musicians` endpoint
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        // expect(response).toBe("")
        expect(responseData).toEqual({})
    })
    test("test for response properties", async () => {
        const response = await request(app).get("/musicians/1");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("instrument");

    });
    test("test for /musicians/1 endpoint", async () => {
        const response = await request(app).get("/musicians/1");
        const firstMusician = {
            "id": 1,
            "name": "Mick Jagger",
            "instrument": "Voice",
            "createdAt": "2023-05-09T13:37:43.653Z",
            "updatedAt": "2023-05-09T13:37:43.653Z",
            "bandId": null
          }
        expect(response.body).toEqual(firstMusician);

    });

       
})

// test for post method in /musicians

describe("POST /musicians", () => {
    it("has statuscode of 200", async () => {
        const response = await request(app).post("/musicians");
        expect(response.statusCode).toBe(200);
    })

    test('Create a musician', async() => {
        const musician = {
            name: "edsheeran",
            instrument : "guitar"
        };
        const count = await Musician.count();
        await request(app).post('/musicians').send(musician)
        const newCount = await Musician.count()
        expect(newCount).toBe(count+1);   
    });
})
//  supertest to test POST method 

describe('/bands endpoint', () => {
    // Write your tests here
    test("Testing /bands endpoint", async () => {
        // Sends request to `./bands` endpoint
        const response = await request(app).get("/bands");
        expect(response.statusCode).toBe(200);
    });
    test("returns an array", async () => {
        const response = await request(app).get("/bands");
        expect(Array.isArray(response.body)).toBeTruthy;

    });
    
    test("test for response properties", async () => {
        const response = await request(app).get("/bands/1");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("genre");

    });
    test("test for /bands/2 endpoint", async () => {
        const response = await request(app).get("/bands/2");
        const secondBand = {
            "id": 2,
            "name": "Black Pink",
            "genre": "Pop",
            "createdAt": "2023-05-09T13:37:43.655Z",
            "updatedAt": "2023-05-09T13:37:43.655Z"
          }
        expect(response.body).toEqual(secondBand);

    });     
})

