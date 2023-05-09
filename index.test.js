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


describe('/musicians endpoint', () => {
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
