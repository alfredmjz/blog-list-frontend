describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		cy.contains("Login");
	});

	// it("login form can be opened", function () {
	// 	cy.contains("Login").click();
	// });

	// it("user can login", function () {
	// 	cy.contains("login").click();
	// 	cy.get("input:first").type("mluukkai");
	// 	cy.get("input:last").type("salainen");
	// });
});
