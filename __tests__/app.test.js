const request = require("supertest");
const { app } = require("../app");
const db = require("../db/connection");

const seed = require("../db/seeds/seed");

const testData = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("Dummy test", () => {
  test("Dummy test", () => {
    expect("XX").toEqual("XX");
  });
});

const testTopics = [
  {
    description: "The man, the Mitch, the legend",
    slug: "mitch",
  },
  {
    description: "Not dogs",
    slug: "cats",
  },
  {
    description: "what books are made of",
    slug: "paper",
  },
];

describe("GET: /api/topics", () => {
  test("200: Responds with an object", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((results) => {
        expect(typeof results).toBe("object");
      });
  });
  test("200: Responds with correct data", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((results) => {
        console.log("model results");
        console.table(results.body);
        expect(results.body).toEqual(testTopics);
      });
  });
  test("404: Returns 404 when invalid request", () => {
    return request(app)
      .get("/api/topicsINVALID")
      .expect(404)
      .then((results)=>{
          console.log("HERE",results.status);
      });
  });

});
