import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders title and author", () => {
	const blogs = [
		{
			title: "This is a test",
			author: "Tester",
		},
	];

	const { container } = render(<Blog blogs={blogs} />);
	const title = container.querySelector(".blog-title");
	const author = container.querySelector(".blog-author");

	expect(title).toBeDefined();
	expect(author).toBeDefined();
});

test("renders blog url and likes if 'View' button is clicked", async () => {
	const blogs = [
		{
			title: "This is a test",
			author: "Tester",
			url: "www.test.com",
			likes: 1,
		},
	];

	render(<Blog blogs={blogs} />);
	const user = userEvent.setup();
	const button = screen.getByText("View");
	await user.click(button);

	const clicked = screen.getByText("Hide");
	expect(clicked).toBeDefined();
	const url = screen.getByText("www.test.com");
	expect(url).toBeDefined();
	const likes = screen.getByText("1");
	expect(likes).toBeDefined();
});

test("like button is clicked twice", async () => {
	const blogs = [
		{
			title: "This is a test",
			author: "Tester",
			url: "www.test.com",
			likes: 1,
		},
	];

	const clickedTwice = jest.fn();
	const user = userEvent.setup();

	render(<Blog blogs={blogs} updateLikes={clickedTwice} />);
	const button = screen.getByText("Like");
	await user.click(button);
	await user.click(button);
	expect(clickedTwice.mock.calls).toHaveLength(2);
});
