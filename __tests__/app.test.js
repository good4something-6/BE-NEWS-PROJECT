const request = require("supertest");
const { app } = require("../app");
const db = require("../db/connection");
const { convertTimestampToDate } = require("../db/helpers/utils");

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
        expect(results.body).toEqual(testTopics);
      });
  });
  test("404: Returns 404 when invalid request", () => {
    return request(app)
      .get("/api/topicsINVALID")
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe("404 - path not found");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test.skip("400 article_id provided is not in database", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe("400 - Invalid Item");
      });
  });
  test.skip("200 valid article_id request returns correct data", () => {
    let expected = convertTimestampToDate({
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: 1594329060000,
      votes: 100,
      article_id: 1,
    });
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((result) => {
        console.log("TEST is instance of DATE", expected.created_at instanceof Date, expected.created_at);
        console.log("TEST2 typeof is String  ", typeof result.body.created_at, result.body.created_at);
        expect(result.body).toEqual(expected);
      });
  });
});
