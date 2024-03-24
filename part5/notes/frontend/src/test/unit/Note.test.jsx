import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import Note from "../../components/Note";

test("renders content", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };
  const mockHandlerFunction = vi.fn();

  const { container } = render(
    <Note note={note} toggleImportance={mockHandlerFunction} />
  );

  const element = container.querySelector(".note");

  screen.debug(element);

  expect(element).toBeDefined();
  expect(element.textContent).toContain("Component");

  const user = userEvent.setup();
  const button = container.querySelector("button");
  await user.click(button);

  expect(mockHandlerFunction.mock.calls).toHaveLength(1);
});
