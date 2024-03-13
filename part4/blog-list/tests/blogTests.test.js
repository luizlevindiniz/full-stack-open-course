const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const apiHelper = require("../utils/api_test_helper");
const { app } = require("../app");
const supertest = require("supertest");
const { Blog } = require("../models/blog");
const mongoose = require("mongoose");

const api = supertest(app);

let token;
describe("api tests", () => {
  describe("tests that require a db filled w/ blogs", () => {
    beforeEach(async () => {
      await Blog.deleteMany({});

      const blogsToCreate = apiHelper.blogs.map((b) => new Blog(b));
      const blogsAsPromises = blogsToCreate.map((b) => b.save());

      await Promise.all(blogsAsPromises);

      const login = {
        username: "root",
        password: "password",
      };
      const resp = await api
        .post("/api/login")
        .send(login)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      token = resp.body.token;
    });

    test("fetch all blogs and check", async () => {
      const blogsFromGet = await api
        .get("/api/blogs/")
        .set("authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(blogsFromGet.body.length, apiHelper.blogs.length);
    });

    test("check that id exists and is unique for every blog", async () => {
      const blogsInMongo = await apiHelper.getAllBlogsAsJSON();
      const apiResponse = await api
        .get("/api/blogs")
        .set("authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogsFromGet = apiResponse.body.map((b) => b.id);
      const ids = blogsInMongo.map((b) => b.id);

      assert.deepEqual(blogsFromGet, ids);
    });

    test("cant create a blog w/o title or url", async () => {
      const forbiddenBlog1 = {
        title: "",
        author: "Meeee",
        url: "localhost",
        likes: 10,
      };
      const forbiddenBlog2 = {
        title: "New Post",
        author: "Meeee",
        url: "",
        likes: 10,
      };

      await api
        .post("/api/blogs")
        .set("authorization", `Bearer ${token}`)
        .send(forbiddenBlog1)
        .expect(400);

      await api
        .post("/api/blogs")
        .set("authorization", `Bearer ${token}`)
        .send(forbiddenBlog2)
        .expect(400);

      const blogsAtEnd = await apiHelper.getAllBlogsAsJSON();

      assert.strictEqual(blogsAtEnd.length, apiHelper.blogs.length);
    });

    test("create and delete a blog post", async () => {
      const newBlog = {
        title: "New Post",
        author: "Meeee",
        url: "localhost",
        likes: 10,
      };

      const created = await api
        .post("/api/blogs")
        .set("authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      let blogsInMongo = await apiHelper.getAllBlogsAsJSON();
      assert.strictEqual(blogsInMongo.length, apiHelper.blogs.length + 1);

      await api
        .delete(`/api/blogs/${created.body.id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(204);

      blogsInMongo = await apiHelper.getAllBlogsAsJSON();
      assert.strictEqual(blogsInMongo.length, apiHelper.blogs.length);
    });
  });

  describe("tests that dont require a db filled w/ blogs", () => {
    test("create a blog post and check if it was saved", async () => {
      const newBlog = {
        title: "New Post",
        author: "Meeee",
        url: "localhost",
        likes: 10,
      };

      await api
        .post("/api/blogs")
        .set("authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsInMongo = await apiHelper.getAllBlogsAsJSON();

      const get = await api
        .get("/api/blogs")
        .set("authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(get.body.length, apiHelper.blogs.length + 1);
      assert.strictEqual(blogsInMongo.length, apiHelper.blogs.length + 1);
    });

    test("check if default likes value is 0", async () => {
      const blogWithoutLikes = {
        title: "New Post",
        author: "Meeee",
        url: "localhost",
      };

      const created = await api
        .post("/api/blogs")
        .set("authorization", `Bearer ${token}`)
        .send(blogWithoutLikes)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api
        .get(`/api/blogs/${created.body.id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(created.body.id, response.body.id);
      assert.strictEqual(response.body.likes, 0);
    });

    test("check if it is possible to update a blog post", async () => {
      const newBlog = {
        title: "New Post",
        author: "Meeee",
        url: "localhost",
        likes: 10,
      };

      const created = await api
        .post("/api/blogs")
        .set("authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const updatedBlog = {
        ...newBlog,
        likes: 20,
      };

      const update = await api
        .put(`/api/blogs/${created.body.id}`)
        .set("authorization", `Bearer ${token}`)
        .send(updatedBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(update.body.likes, 20);
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
