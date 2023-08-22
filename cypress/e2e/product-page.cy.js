/// <reference types="cypress" />

const sizes = [[390,844],[1440,900]]; // mobile, desktop

describe('product page', () => {
  let productUrl = '/products/an-amazing-watch';
  let productTitle;
  let productQuantity;
  let productPrice;

  beforeEach(() => {
    cy.visit('/');
    cy.get('#password').type('Coleworld2324!');
    cy.get('button[type="submit"').click({force: true});
    cy.visit(productUrl);
    cy.get('[data-cy="product-title"]').then(($productTitle) => {
      productTitle = $productTitle.text();
    });
    cy.get('[data-cy="product-quantity"]').then(($productQuantity) => {
      productQuantity = $productQuantity.val();
    });
    cy.get('[data-cy="product-price"]').then(($productPrice) => {
      productPrice = $productPrice.text().trim();
    });
  });

  sizes.forEach((size) => {
    it(`loads the product page w/ ATC button: ${size[0]} x ${size[1]}px screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }

      cy.viewport('iphone-xr');
      cy.screenshot(); // take screenshot of PDP mobile size
      cy.viewport('macbook-15');
      cy.screenshot(); // take screenshot of PDP desktop size
      cy.url().should('include', '/products/');
  
      // check if ATC btn exists
      cy.get('[data-cy="add-to-cart"]').should(($addToCart) => {
          expect($addToCart).to.have.length(1);
      });
    });
  
    it(`adds a product to the cart: ${size[0]} x ${size[1]}px screen`, function() {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }

      // check if ATC btn adds product to cart
      cy.get('[data-cy="add-to-cart"]').click({force: true});
      cy.visit('/cart'); // remove when testing slide cart
  
      cy.get('[data-cy="cart-item"]').should(($cartItem) => {
          expect($cartItem).to.have.length(1);
      });
    });
  
    it(`adds a product to the cart w/ correct name, quantity, price, subtotal: ${size[0]} x ${size[1]}px screen`, function() {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }

      cy.get('[data-cy="add-to-cart"]').click({force: true});
      cy.visit('/cart'); // remove when testing slide cart
  
      cy.get('[data-cy="cart-item-title"]').should(($cartProductTitle) => {
        expect($cartProductTitle.text()).to.eq(productTitle);
      });
  
      cy.get('[data-cy="cart-item-quantity"]').should(($cartProductQuantity) => {
        expect($cartProductQuantity.val()).to.eq(productQuantity);
      });
  
      cy.get('[data-cy="cart-item-price"]').should(($cartProductPrice) => {
        expect($cartProductPrice.text().trim()).to.eq(productPrice);
      });
  
      cy.get('[data-cy="cart-subtotal"]').should(($cartSubtotal) => {
        console.log($cartSubtotal);
        let productPriceNum = Number(productPrice.replace(/[^0-9.-]+/g,""));
        let cartSubtotalNum = Number($cartSubtotal.text().replace(/[^0-9.-]+/g,""));
        expect(cartSubtotalNum).to.eq(productQuantity * productPriceNum);
      });
    });
  
    it(`adds multiple products to the cart w/ correct name, quantity, price, subtotal: ${size[0]} x ${size[1]}px screen`, function() {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }

      // change quantity before adding to cart
      cy.get('[data-cy="product-quantity"]').click({force: true}).type('{backspace}5', {force: true}).then(($productQuantity) => {
        productQuantity = $productQuantity.val();
      });
  
      cy.get('[data-cy="add-to-cart"]').click({force: true});
  
      cy.visit('/cart'); // remove when testing slide cart
  
      cy.get('[data-cy="cart-item-title"]').should(($cartProductTitle) => {
        expect($cartProductTitle.text()).to.eq(productTitle);
      });
  
      cy.get('[data-cy="cart-item-quantity"]').should(($cartProductQuantity) => {
        expect($cartProductQuantity.val()).to.eq(productQuantity);
      });
  
      cy.get('[data-cy="cart-item-price"]').should(($cartProductPrice) => {
        let productPriceNum = Number(productPrice.replace(/[^0-9.-]+/g,""));
        let cartProductPricelNum = Number($cartProductPrice.text().replace(/[^0-9.-]+/g,""));
        expect(cartProductPricelNum).to.eq(productPriceNum * productQuantity);
      });
  
      cy.get('[data-cy="cart-subtotal"]').should(($cartSubtotal) => {
        let productPriceNum = Number(productPrice.replace(/[^0-9.-]+/g,""));
        let cartSubtotalNum = Number($cartSubtotal.text().replace(/[^0-9.-]+/g,""));
        expect(cartSubtotalNum).to.eq(productQuantity * productPriceNum);
      });
    });
  
    it(`removes a product to the cart: ${size[0]} x ${size[1]}px screen`, function() {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }

      cy.get('[data-cy="add-to-cart"]').click({force: true});
      cy.visit('/cart'); // remove when testing slide cart
      cy.get('[data-cy="cart-item"]').should(($cartItem) => {
          expect($cartItem).to.have.length(1);
      });
  
      cy.get('[data-cy="remove-item"]').click({force: true});
      cy.visit('/cart');
      cy.get('[data-cy="cart-item"]').should(($cartItem) => {
        expect($cartItem).to.have.length(0);
      });
      cy.get('body').contains('Your cart is empty');
    });
  });
});