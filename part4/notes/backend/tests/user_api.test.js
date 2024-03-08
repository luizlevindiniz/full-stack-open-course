const { test, describe, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const assert = require("assert");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is just root user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash("password", saltRounds);

    const rootUser = new User({
      username: "root",
      passwordHash: passwordHash,
      name: "root",
    });

    await rootUser.save();
  });

  test("create a fresh new user with api", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "me",
      password: "mysecret",
      name: "dinizla",
    };

    const created = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(usersAtEnd.length === usersAtStart.length + 1);
    assert(usersAtEnd.map((u) => u.name).includes(created.body.name));
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newRootUser = {
      username: "root",
      password: "rooooot",
      name: "hacker",
    };

    const created = await api
      .post("/api/users")
      .send(newRootUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert(usersAtEnd.length === usersAtStart.length);
    assert(!usersAtEnd.map((u) => u.name).includes(created.body.name));
  });
});

after(async () => {
  await mongoose.connection.close();
});
