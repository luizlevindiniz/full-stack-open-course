import { render, screen } from "@testing-library/react";
import { test, expect, vi, describe, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

import Togglable from "../../components/Togglable";

describe("<Togglable/>", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" data-testid="testDiv">
          togglableContent
        </div>
      </Togglable>
    ).container;
  });

  test("renders togglable children", async () => {
    screen.queryByTestId("testDiv");
  });

  test("at start, the children are not displayed", () => {
    const div = container.querySelector(".togglableContent").children[1];
    expect(div).toHaveStyle("display:none");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent").children[1];
    expect(div).not.toHaveStyle("display:none");
  });

  test("toggled content can be closed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent").children[1];
    expect(div).not.toHaveStyle("display:none");

    const cancelButton = screen.getByText("cancel");
    await user.click(cancelButton);

    expect(div).toHaveStyle("display:none");
  });
});
