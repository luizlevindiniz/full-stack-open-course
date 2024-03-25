import { render, screen } from "@testing-library/react";
import { test, expect, vi, describe, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

import NoteForm from "../../components/NoteForm";

describe("<NoteForm/>", () => {
  let container;
  let mockHandlerFunction;

  beforeEach(() => {
    mockHandlerFunction = vi.fn();

    container = render(<NoteForm addNote={mockHandlerFunction} />).container;
  });

  test("renders noteform", async () => {
    const div = container.querySelector(".formDiv");
    expect(div).toBeDefined();
  });

  test("<NoteForm /> updates parent state and calls onSubmit", async () => {
    const user = userEvent.setup();
    const input = container.querySelector(
      "[placeholder='write note content here']"
    );
    const button = container.querySelector(".save");

    await user.type(input, "testing a form...");
    await user.click(button);

    expect(mockHandlerFunction.mock.calls).toHaveLength(1);
    expect(mockHandlerFunction.mock.calls[0][0].content).toContain(
      "testing a form..."
    );
  });
});
