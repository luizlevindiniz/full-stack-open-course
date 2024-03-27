const login = async (page, username, password) => {
  await page.getByRole("button", { name: /log in/i }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: /login/i }).click();
};

const createNote = async (page, content) => {
  await page.getByRole("button", { name: /new note/i }).click();
  await page.getByPlaceholder("write note content here").fill(content);
  await page.getByRole("button", { name: /save/i }).click();
  await page.getByText(content).waitFor();
};

export { login, createNote };
