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

describe("Topics", () => {
  describe("GET: /api/topics", () => {
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
    test("200: Responds with an object", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((results) => {
          expect(typeof results.body.topics).toBe("object");
        });
    });
    test("200: Responds with correct data", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((results) => {
          expect(results.body.topics).toEqual(testTopics);
        });
    });
    test("404: Returns 404 when invalid request", () => {
      return request(app)
        .get("/api/topicsINVALID")
        .expect(404)
        .then((result) => {
          expect(result.body.msg).toBe("404 - Invalid end point");
        });
    });
  });
});

describe("Articles", () => {
  describe("GET /api/articles/:article_id", () => {
    test("404 article_id provided is not in database", () => {
      return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then((result) => {
          expect(result.body.msg).toBe("404 - Article Not Found");
        });
    });
    test("200 valid article_id request returns correct data", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((result) => {
          expect(result.body.article).toHaveProperty("title");
          expect(result.body.article).toHaveProperty("topic");
          expect(result.body.article).toHaveProperty("author");
          expect(result.body.article).toHaveProperty("body");
          expect(result.body.article).toHaveProperty("created_at");
          expect(result.body.article).toHaveProperty("votes");
          expect(result.body.article).toHaveProperty("article_id");
          expect(result.body.article).toHaveProperty("comment_count");
          expect(result.body.article.comment_count).toBe(11);
        });
    });
  });

  describe("PATCH /api/articles/:article_id", () => {
    test("200 - valid article id is provided and votes updates by 1 correctly", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(201)
        .then((result) => {
          expect(result.body.article.votes).toBe(101);
        });
    });
    test("200 - valid article id is provided and votes updates by 100 correctly", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 100 })
        .expect(201)
        .then((result) => {
          expect(result.body.article.votes).toBe(200);
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
    test("400 - request body contains values not of correct data type", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "INVALID" })
        .expect(400)
        .then((result) => {
          expect(result.body.msg).toBe("400 - Invalid Request");
        });
    });
    test("400 - request body does not contains correct key", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ not_correct_key: 1 })
        .expect(400)
        .then((result) => {
          expect(result.body.msg).toBe("400 - Invalid Request");
        });
    });
    test("404 - article id is not in database", () => {
      return request(app)
        .patch("/api/articles/99999")
        .send({ inc_votes: 1 })
        .expect(404)
        .then((result) => {
          expect(result.body.msg).toBe("404 - Article Not Found");
        });
    });
  });

  describe("GET /api/articles/:article_id/comments", () => {
    test("200 article_id is valid and comments exist", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .expect(200)
        .then((result) => {
          let { comments } = result.body;
          expect(Array.isArray(comments)).toBe(true);
          expect(comments).toHaveLength(2);
          comments.forEach((comment) => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            });
          });
        });
    });
    test("200 article_id is valid and no comments exist", () => {
      return request(app).get("/api/articles/2/comments").expect(200);
    });
  });

  describe("GET /api/articles with comment count", () => {
    test("200 - returns array of articles objects in descending date order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((result) => {
          const { articles } = result.body;
          expect(Array.isArray(articles)).toBe(true);
          expect(articles).toHaveLength(12);
          expect(articles).toBeSorted({ key: "created_at", descending: true });
          articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                count: expect.any(Number),
              })
            );
          });
        });
    });
  });

  describe("POST /api/articles/:article_id/comments", () => {
    test("200 valid article id and username, comment added", () => {
      return request(app)
        .post("/api/articles/4/comments")
        .send({
          username: "lurker",
          body: "Thats not news",
        })
        .expect(200)
        .then((result) => {
          expect(result.body.restaurant).toMatchObject({
            comment_id: 19,
            body: "Thats not news",
            article_id: 4,
            author: "lurker",
            votes: 0,
            created_at: expect.any(String),
          });
        });
    });
  });
});

describe("Users", () => {
  describe("GET /api/users", () => {
    test("200 - returns all users", async () => {
      const result = await request(app).get("/api/users").expect(200);
      const users = result.body.users;
      expect(Array.isArray(users)).toBe(true);
      expect(users).toHaveLength(4);
      users.forEach((user) => {
        expect(user).toEqual(
          expect.objectContaining({
            username: expect.any(String),
          })
        );
      });
    });
  });
});
