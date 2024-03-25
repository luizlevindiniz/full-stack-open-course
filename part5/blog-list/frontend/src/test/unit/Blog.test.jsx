import { render, screen } from "@testing-library/react";
import { test, expect, vi, describe, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

import Blog from "../../components/Blog";

describe("blogs test", async () => {
  let container;
  let setBlogWasDeleted;

  beforeEach(() => {
    let blog = {
      user: "1234",
      likes: 10,
      url: "www.com",
      author: "luiz",
      title: "my blog",
    };

    setBlogWasDeleted = vi.fn();

    container = render(
      <Blog blog={blog} setBlogWasDeleted={setBlogWasDeleted}></Blog>
    ).container;
  });

  test("blog is rendered", () => {
    const div = container.querySelector(".singleBlog");
    expect(div).toBeDefined();
  });

  test("blog is rendered", () => {
    const div = container.querySelector(".singleBlog");
    expect(div.textContent).toContain("my blog - luiz");
    expect(div.textContent).not.toContain("www.com");
    expect(div.textContent).not.toContain("10");
  });

  test("details are shown", async () => {
    const button = container.querySelector(".showDetails");
    const user = userEvent.setup();

    await user.click(button);

    const div = container.querySelector(".details");
    expect(div.textContent).toContain("www.com");
    expect(div.textContent).toContain("10");
  });

  test("like is working", async () => {
    const button = container.querySelector(".showDetails");
    const user = userEvent.setup();

    await user.click(button);

    const likes = container.querySelector(".likeButton");

    await user.click(likes);
    await user.click(likes);

    const div = container.querySelector(".details");
    expect(div.textContent).toContain("www.com");
    expect(div.textContent).toContain("12");
  });
});
