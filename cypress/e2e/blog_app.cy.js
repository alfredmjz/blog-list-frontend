describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user = {
			name: "Matti Luukkainen",
			username: "mluukkai",
			password: "salainen",
		};

		cy.request("POST", "http://localhost:3003/api/users/", user);
		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		cy.get("button").contains("Login");
	});
	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("button").contains("Login").click();
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("salainen");
			cy.get("#login-button").click();

			cy.contains("Matti Luukkainen logged in");
		});

		it("fails with wrong credentials", function () {
			cy.get("button").contains("Login").click();
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("wrong");
			cy.get("#login-button").click();

			cy.get("#red")
				.should("contain", "Username/Password is wrong")
				.and("have.css", "color", "rgb(196, 79, 79)")
				.and("have.css", "border-style", "solid");
		});
	});

	describe("When logged in", function () {
		beforeEach(function () {
			cy.login({ username: "mluukkai", password: "salainen" });
		});

		it("A blog can be created", function () {
			cy.get("button").contains("Add new blog").click();
			cy.get("#title").type("Cypress Testing");
			cy.get("#author").type("Cypress Automation");
			cy.get("#url").type("www.somereallink.com");
			cy.get("#submit-blog").click();

			cy.get("#list-of-blogs").contains("Cypress Testing");
		});

		describe("Blogs exist", function () {
			beforeEach(function () {
				cy.createBlog({
					title: "Cypress Testing",
					author: "Cypress Automation",
					url: "www.somereallink.com",
				});

				cy.createBlog({
					title: "Second Test",
					author: "Cypress Who",
					url: "www.fakelink.com",
				});

				cy.createBlog({
					title: "Third Test",
					author: "Cypress Inc",
					url: "www.definitelyfake.com",
				});
				cy.visit("http://localhost:3000");
			});

			it("User can like a blog", function () {
				cy.contains("Second Test").parent().as("theTarget");
				cy.get("@theTarget").children(".clicked").click();
				cy.get("@theTarget").children("div").children("#likes").as("likeDOM");
				cy.get("@likeDOM").find("button").click();
				cy.get("@likeDOM").contains(1);
			});

			it("Same user can delete his own blog posts", function () {
				cy.contains("Second Test").parent().as("theTarget");
				cy.get("@theTarget").children(".clicked").click();
				cy.get("@theTarget").children("div").children("button").contains("Delete").click().should("not.exist");
			});

			it.only("Blog posts are sorted by number of likes", function () {
				cy.contains("Second Test").parent().as("mostLikes");
				cy.get("@mostLikes").children(".clicked").click();
				cy.get("@mostLikes").children("div").children("#likes").as("likeDOM");
				for (let n = 0; n < 5; n++) {
					cy.get("@likeDOM").find("button").click();
					cy.wait(500);
				}

				cy.contains("Third Test").parent().as("secondMostLikes");
				cy.get("@secondMostLikes").children(".clicked").click();
				cy.get("@secondMostLikes").children("div").children("#likes").as("secondLikeDOM");
				cy.get("@secondLikeDOM").find("button").click();
				cy.wait(500);

				cy.get("#list-of-blogs>div").eq(0).should("contain", "Second Test");
				cy.get("#list-of-blogs>div").eq(1).should("contain", "Third Test");
			});
		});
	});
});
