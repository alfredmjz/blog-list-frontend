import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
	const createFakeBlog = jest.fn();
	const user = userEvent.setup();

	render(<BlogForm createBlog={createFakeBlog} />);

	const title = screen.getByPlaceholderText("Title");
	const author = screen.getByPlaceholderText("Author");
	const url = screen.getByPlaceholderText("URL");

	const submit = screen.getByText("Add");

	await user.type(title, "testing title...");
	await user.type(author, "testing author...");
	await user.type(url, "testing url...");

	await user.click(submit);

	expect(createFakeBlog.mock.calls[0][0].title).toBe("testing title...");

	expect(createFakeBlog.mock.calls[0][0].author).toBe("testing author...");

	expect(createFakeBlog.mock.calls[0][0].url).toBe("testing url...");

	expect(createFakeBlog.mock.calls).toHaveLength(1);
});
