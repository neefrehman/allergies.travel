import "./commands";

before(() => {
    cy.injectAxe();
    cy.checkA11y();
});
