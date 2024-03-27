const { test, expect, describe, beforeEach } = require("@playwright/test");
const { login, createNote } = require("./helpers");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "fea",
        username: "fea",
        password: "fea",
      },
    });

    await page.goto("/");
  });

  test("frontpage can be opened", async ({ page }) => {
    const locator = page.getByLabel("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2024"
      )
    ).toBeVisible();
  });

  test("login form can be opened", async ({ page }) => {
    await login(page, "fea", "fea");
    await expect(page.getByText("Welcome fea")).toBeVisible();
  });

  test("login fails with wrong credentials", async ({ page }) => {
    await page.getByRole("button", { name: /log in/i }).click();
    await page.getByTestId("username").fill("hacker");
    await page.getByTestId("password").fill("hacker");

    await page.getByRole("button", { name: /login/i }).click();

    const errorDiv = page.locator(".error");
    expect(errorDiv).toHaveText("invalid username or password");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(page.getByText("Welcome hacker")).not.toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.goto("/");
      await login(page, "fea", "fea");
      await expect(page.getByText("Welcome fea")).toBeVisible();
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "New Note Created Via Test");
      await expect(page.getByText("New Note Created Via Test")).toBeVisible();
    });

    describe("and a note does exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "a existing note");
      });

      test("importance can be changed", async ({ page }) => {
        await expect(page.getByText("a existing note")).toBeVisible();
        await page.getByRole("button", { name: /make not important/i }).click();
        await expect(page.getByText("make important")).toBeVisible();
      });
    });

    describe("and several notes exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note");
        await createNote(page, "second note");
        await createNote(page, "third note");
      });

      test("one of those can be made nonimportant", async ({ page }) => {
        await page.pause();
        const otherNote = page.getByText("second note");
        const parentElement = otherNote.locator("..");
        parentElement
          .getByRole("button", { name: "make not important" })
          .click();
        await expect(parentElement.getByText("make important")).toBeVisible();
      });
    });
  });
});
