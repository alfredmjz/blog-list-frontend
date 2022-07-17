describe("Blog app", function () {
	after(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		cy.user({ username: "root", name: "Superuser", password: "root" });
		cy.user({ username: "mluukkai", name: "Matti Luukkainen", password: "salainen" });
		cy.user({ username: "hellas", name: "Arto Hellas", password: "hellas" });

		cy.login({ username: "root", password: "root" });
		cy.createBlog({
			title: "Testing with Cypress",
			author: "Cypress Automation",
			url: "www.thisisatest.com",
		});

		cy.createBlog({
			title: "What is e2e testing?",
			author: "Cypress Who",
			url: "www.e2etesting.com",
		});

		cy.createBlog({
			title: "Types of automated testing",
			author: "Tester",
			url: "www.definitelyfake.com",
		});

		cy.login({ username: "mluukkai", password: "salainen" });
		cy.createBlog({
			title: "Things to do in 2018",
			author: "Famous Guy",
			url: "www.travelthisyear.com",
		});

		cy.createBlog({
			title: "Things to do in 2020",
			author: "Not so famous guy",
			url: "www.stayhomethisyear.com",
		});

		cy.createBlog({
			title: "COVID: Yay or nay?",
			author: "Mythbuster",
			url: "www.realpolls.com",
		});

		cy.login({ username: "hellas", password: "hellas" });
		cy.createBlog({
			title: "What is FullStack?",
			author: "Hackercrunch",
			url: "www.hackercrunch.com",
		});

		cy.createBlog({
			title: "How to get started in development?",
			author: "Molly Polly",
			url: "www.onlinedu.com",
		});
	});
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");

		cy.user({ username: "root", name: "Superuser", password: "root" });
		cy.user({ username: "mluukkai", name: "Matti Luukkainen", password: "salainen" });
		cy.user({ username: "hellas", name: "Arto Hellas", password: "hellas" });

		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		cy.get("button").contains("Login");
	});
	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("button").contains("Login").click();
			cy.get("#username").type("root");
			cy.get("#password").type("root");
			cy.get("#login-button").click();

			cy.contains("Superuser logged in");
		});

		it("fails with wrong credentials", function () {
			cy.get("button").contains("Login").click();
			cy.get("#username").type("root");
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
			cy.login({ username: "root", password: "root" });
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
					title: "First Test",
					author: "Tester",
					url: "www.thisisatest.com",
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

			it("Non-owner can't delete other user's blog posts", function () {
				cy.get("button").contains("Logout").click();
				cy.login({ username: "mluukkai", password: "salainen" });
				cy.contains("Second Test").parent().as("theTarget");
				cy.get("@theTarget").children(".clicked").click();
				cy.get("@theTarget").children("div").children("button").contains("Delete").click();
				cy.on("window:confirm", (str) => {
					expect(str).to.equal('Remove "Second Test" by Cypress Who');
				});
				cy.on("window:confirm", () => true);
				cy.contains("Second Test").should("exist");
			});

			it("Blog posts are sorted by number of likes", function () {
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
