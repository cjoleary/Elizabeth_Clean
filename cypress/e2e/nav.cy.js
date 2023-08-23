/// <reference types="cypress" />

describe('main site navigation', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('#password').type('Coleworld2324!');
      cy.get('button[type="submit"').click({force: true});
      cy.visit('/');
    });
    
    it('checks nav responsiveness', () => {
        // mobile
        cy.viewport('iphone-xr');
        cy.get('[data-cy="desktop-nav"]').should('not.be.visible');
        cy.get('[data-cy="open-mobile-nav"]').should('be.visible');

        // desktop
        cy.viewport('macbook-15');
        cy.get('[data-cy="desktop-nav"]').should('be.visible');
        cy.get('[data-cy="open-mobile-nav"]').should('not.be.visible');
    });

    it('opens and closes the mobile nav', () => {
        cy.viewport('iphone-xr');
        // open
        cy.get('[data-cy="open-mobile-nav"]').click();
        cy.get('[data-cy="mobile-nav"]').should('be.visible');

        // close
        cy.get('[data-cy="close-mobile-nav"]').click();
        cy.get('[data-cy="mobile-nav"]').should('not.be.visible');
    });
  });