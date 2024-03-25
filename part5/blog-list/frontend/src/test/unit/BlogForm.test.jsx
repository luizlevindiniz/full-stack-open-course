import { render, screen } from "@testing-library/react";
import { test, expect, vi, describe, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

import BlogForm from "../../components/BlogForm";

describe("blogform test", async () => {
  let container;
  let handleNewBlog;

  beforeEach(() => {
    handleNewBlog = vi.fn();

    container = render(
      <BlogForm handleNewBlog={handleNewBlog}></BlogForm>
    ).container;
  });

  test("blogform is rendered", async () => {
    const div = container.querySelector(".blogForm");
    expect(div).toBeDefined();
  });

  test("new blog is created", async () => {
    const submit = container.querySelector(".submitButton");
    const user = userEvent.setup();

    const title = container.querySelector("#title");
    await user.type(title, "title");

    const author = container.querySelector("#author");
    await user.type(author, "author");

    const url = container.querySelector("#url");
    await user.type(url, "url");

    await user.click(submit);

    const calls = handleNewBlog.mock.calls[0][0];
    expect(calls).toBeTypeOf("object");
    expect(calls.title).toBe("title");
    expect(calls.author).toBe("author");
    expect(calls.url).toBe("url");
  });
});
