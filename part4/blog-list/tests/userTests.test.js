const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const apiHelper = require("../utils/api_test_helper");
const { app } = require("../app");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const mongoose = require("mongoose");

const api = supertest(app);

describe("create first users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("password", 10);

    const rootUser = new User({
      username: "root",
      passwordHash: passwordHash,
      name: "root",
    });

    await rootUser.save();
  });

  test("create user w/ wrong password", async () => {
    const usersAtStart = await apiHelper.getAllUsersAsJSON();

    let user = {
      username: "root",
      name: "root",
    };
    await api.post("/api/users").send(user).expect(400);

    user = {
      username: "root",
      password: null,
      name: "root",
    };

    await api.post("/api/users").send(user).expect(400);

    user = {
      username: "root",
      password: "12",
      name: "root",
    };

    await api.post("/api/users").send(user).expect(400);

    const usersAtEnd = await apiHelper.getAllUsersAsJSON();
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
