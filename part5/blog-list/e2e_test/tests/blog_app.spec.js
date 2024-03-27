const { test, expect, describe, beforeEach } = require("@playwright/test");
const {
  login,
  createBlog,
  createSampleBlogs,
  asyncForEach,
  extractLikes,
} = require("./helpers");
const exp = require("constants");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "fea",
        username: "fea",
        password: "fea",
      },
    });

    await request.post("/api/users", {
      data: {
        name: "test",
        username: "test",
        password: "test",
      },
    });

    await page.goto("/");
  });

  test("frontpage can be opened", async ({ page }) => {
    const locator = page.getByLabel("loginHeader");
    await expect(locator).toBeVisible();
    await expect(page.getByText("Footer")).toBeVisible();
  });

  test("Login form is shown", async ({ page }) => {
    const loginForm = page.locator(".loginFormDiv");
    await expect(loginForm).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await login(page, "fea", "fea");

      await expect(page.getByText("Welcome fea!")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await login(page, "hacker", "hacker");

      const errorDiv = page.locator(".notification");
      expect(errorDiv).toHaveText("Warning: username or password is invalid");
      expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await login(page, "fea", "fea");
      await expect(page.getByText("Welcome fea!")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: /open form/i }).click();
      await expect(page.getByRole("button", { name: /close/i })).toBeVisible();

      await createBlog(page, "me", "myself", "and i .com");
      await expect(page.getByText("me - myself")).toBeVisible();
    });

    test("a blog can be edited", async ({ page, request }) => {
      await page.getByRole("button", { name: /open form/i }).click();
      await expect(page.getByRole("button", { name: /close/i })).toBeVisible();

      await createBlog(page, "me", "myself", "and i .com");

      const blogs = await request.get("/api/blogs");
      const blogsBody = await blogs.json();
      const blogId = blogsBody[0]["id"];

      const login = {
        username: "fea",
        password: "fea",
      };

      const loginResp = await request.post("/api/login", { data: login });

      const loginInfos = await loginResp.json();

      const bearer = `Bearer ${loginInfos["token"]}`;
      const userId = loginInfos[`userId`];

      const url = `/api/blogs/${blogId}`;

      const update = {
        author: "update",
        url: "update",
        title: "update",
        likes: 1,
        user: userId,
      };

      await request.put(url, {
        data: update,
        headers: { authorization: bearer },
      });

      await page.reload();

      await expect(page.getByText("update - update")).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
      await page.getByRole("button", { name: /open form/i }).click();
      await expect(page.getByRole("button", { name: /close/i })).toBeVisible();

      await createBlog(page, "me", "myself", "and i .com");

      const locator = page.getByText("me - myself");
      await locator.getByRole("button", { name: /view/i }).click();

      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: /remove/i }).click();

      await expect(page.getByText("me - myself")).not.toBeVisible();
    });

    test("only the user who created the blog can delete it", async ({
      page,
    }) => {
      await page.getByRole("button", { name: /open form/i }).click();
      await expect(page.getByRole("button", { name: /close/i })).toBeVisible();

      await createBlog(page, "me", "myself", "and i .com");

      let locator = page.getByText("me - myself");
      await locator.getByRole("button", { name: /view/i }).click();

      await expect(page.getByRole("button", { name: /remove/i })).toBeVisible();

      await page.getByRole("button", { name: /logout/i }).click();

      await login(page, "test", "test");

      await expect(page.getByText("me - myself")).toBeVisible();
      locator = page.getByText("me - myself");
      await locator.getByRole("button", { name: /view/i }).click();

      await expect(
        page.getByRole("button", { name: /remove/i })
      ).not.toBeVisible();
    });

    test("all blogs are arranged according to the likes", async ({
      page,
      request,
    }) => {
      const likesList = [];

      await createSampleBlogs(page, request);

      const blogs = await page.locator(".singleBlog").all();
      await asyncForEach(blogs, extractLikes, likesList);

      const descending = likesList.every(function (x, i) {
        return i === 0 || x <= likesList[i - 1];
      });

      expect(descending).toBeTruthy();
    });
  });
});
