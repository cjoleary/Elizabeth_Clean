/// <reference types="cypress" />

describe('checkout flow', () => {
    let productVariantID = 45514519937322;
  
    beforeEach(() => {
      cy.visit('/');
      cy.get('#password').type('Coleworld2324!');
      cy.get('button[type="submit"').click({force: true});
    });
  
    it('gets to the final step of checkout', () => {
        cy.visit(`/cart/add?id=${productVariantID}`);
        cy.get('[data-cy="checkout-btn"]').click();

        cy.get('input[autocomplete="shipping email"]')
            .click()
            .type('test@test.com');

        cy.get('input[autocomplete="shipping given-name"]')
            .first()
            .click()
            .type('Test');

        cy.get('input[autocomplete="shipping family-name"]')
            .first()
            .click()
            .type('Tester');

        cy.get('input[autocomplete="shipping address-line1"]')
            .first()
            .click()
            .type('66 South Logan Street');

        cy.get('input[autocomplete="shipping address-level2"]')
            .first()
            .click()
            .type('Denver');

        cy.get('select[autocomplete="shipping address-level1"]')
            .first()
            .select('Colorado');

        cy.get('input[autocomplete="shipping postal-code"]')
            .first()
            .click()
            .type('80209');

        cy.get('input[autocomplete="shipping tel"]')
            .first()
            .click()
            .type('2345678901');

        cy.get('button[type="submit"]') // update w/ button ID, continue to shipping
            .first()
            .click();

        cy.get('button[type="submit"]') // update w/ button ID, continue to payment
            .first()
            .click();

        cy.get('body').contains('Pay now');
    });
  });