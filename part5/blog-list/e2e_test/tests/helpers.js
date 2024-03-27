const { expect } = require("@playwright/test");
const login = async (page, username, password) => {
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: /login/i }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByLabel("title").fill(title);
  await page.getByLabel("author").fill(author);
  await page.getByLabel("url").fill(url);
  await page.getByRole("button", { name: /create/i }).click();

  let content = `${title} - ${author}`;
  await page.getByText(content).waitFor();
};

const createSampleBlogs = async (page, request) => {
  const login = {
    username: "fea",
    password: "fea",
  };

  const loginResp = await request.post("/api/login", { data: login });

  const loginInfos = await loginResp.json();

  const bearer = `Bearer ${loginInfos["token"]}`;

  await request.post("/api/blogs", {
    data: {
      author: "myself",
      url: "m",
      title: "me",
      likes: 1,
    },
    headers: { authorization: bearer },
  });

  await request.post("/api/blogs", {
    data: {
      author: "how",
      url: "h",
      title: "hi",
      likes: 2,
    },
    headers: { authorization: bearer },
  });

  await request.post("/api/blogs", {
    data: {
      author: "vv",
      url: "v",
      title: "dd",
      likes: 3,
    },
    headers: { authorization: bearer },
  });

  await page.reload();
  await expect(page.getByText("me - myself")).toBeVisible();

  await expect(page.getByText("hi - how")).toBeVisible();

  await expect(page.getByText("dd - vv")).toBeVisible();
};

const asyncForEach = async (array, callback, list) => {
  for (let index = 0; index < array.length; index++) {
    const extraction = await callback(array[index]);
    list.push(extraction);
  }
};

const extractLikes = async (blog) => {
  await blog.getByRole("button", { name: /view/i }).click();
  let span = await blog.locator(".numberOfLikes").innerText();
  await blog.getByRole("button", { name: /hide/i }).click();
  return span;
};

export { login, createBlog, createSampleBlogs, asyncForEach, extractLikes };
