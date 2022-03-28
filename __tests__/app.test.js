const request = require("supertest");
const { app } = require("../app");
const db = require("../db/connection");


const seed = require("../db/seeds/seed");

const testData = require('../db/data/test-data/index');

beforeEach(()=>{
    return seed(testData);
});

afterAll(()=>{
    return db.end();
});

describe("",()=>{
test("Dummy test",()=>{
    expect("XX").toEqual("XX");
});

});