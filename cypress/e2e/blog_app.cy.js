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
});
