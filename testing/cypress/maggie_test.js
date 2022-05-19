describe("Open Page", () => {
	it("Opens index.html", () => {
		cy.visit("./source/index.html");
	});
});

describe("Find Elements by id", { includeShadowDom: true }, () => {
	it("Finds daily log container", () => {
		cy.get("#daily-log");
	});
	it("Finds main text container", () => {
		cy.get("#main-text-container");
	});
});

describe("Find Elements by class", { includeShadowDom: true }, () => {
	it("Finds elements with flexgrow class", () => {
		cy.get(".flexgrow");
	});
});
