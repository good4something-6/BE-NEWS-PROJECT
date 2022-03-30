const request = require("supertest");
const { app } = require("../app");
const db = require("../db/connection");
//const { convertTimestampToDate } = require("../db/helpers/utils");

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
        expect(result.body.msg).toBe("Invalid end point");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("404 article_id provided is not in database", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe("Article Not Found");
      });
  });
  test("200 valid article_id request returns correct data", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((result) => {
        expect(result.body).toHaveProperty("title");
        expect(result.body).toHaveProperty("topic");
        expect(result.body).toHaveProperty("author");
        expect(result.body).toHaveProperty("body");
        expect(result.body).toHaveProperty("created_at");
        expect(result.body).toHaveProperty("votes");
        expect(result.body).toHaveProperty("article_id");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("404 - article id is not in database", () => {
    return request(app)
      .patch("/api/articles/99999")
      .send({ inc_votes: 1 })
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe("Article Not Found");
      });
  });
  test("400 - article id is not correct data type", () => {
    return request(app)
      .patch("/api/articles/INVALID")
      .send({ inc_votes: 1 })
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe("400 - Invalid Request");
      });
  });
  test.only("400 - request body contains values not of correct data type", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "INVALID" })
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe("400 - Invalid Request");
      });
  });
  test.only("400 - request body does not contains correct key", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ not_correct_key: 1 })
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe("400 - Invalid Request");
      });
  });
  test("200 - valid article id is provided and votes updates by 1 correctly", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1 })
      .expect(201)
      .then((result) => {
        expect(result.body.votes).toBe(101);
      });
  });
  test("200 - valid article id is provided and votes updates by 100 correctly", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 100 })
      .expect(201)
      .then((result) => {
        expect(result.body.votes).toBe(200);
      });
  });
});
