/// <reference types="cypress" />

describe('product page', () => {
  let productTitle;
  let productQuantity;
  let productPrice;

  beforeEach(() => {
    cy.visit('/');
    cy.get('#password').type('Coleworld2324!');
    cy.get('button[type="submit"').click();
    cy.visit('/products/an-amazing-watch');
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

  it('loads the product page', () => {
    cy.visit('/products/an-amazing-watch');
    cy.url().should('include', '/products/');

    // check if ATC btn exists
    cy.get('[data-cy="add-to-cart"]').should(($addToCart) => {
        expect($addToCart).to.have.length(1);
    });
  });

  it('adds a product to the cart', function() {
    // check if ATC btn adds product to cart
    cy.get('[data-cy="add-to-cart"]').click();
    cy.visit('/cart'); // remove when testing slide cart

    cy.get('[data-cy="cart-item"]').should(($cartItem) => {
        expect($cartItem).to.have.length(1);
    });
  });

  it('adds a product to the cart w/ correct name, quantity, price, subtotal', function() {
    // check if ATC btn adds product to cart
    cy.get('[data-cy="add-to-cart"]').click();
    cy.visit('/cart'); // remove when testing slide cart

    cy.get('[data-cy="cart-product-title"]').should(($cartProductTitle) => {
      expect($cartProductTitle.text()).to.eq(productTitle);
    });

    cy.get('[data-cy="cart-product-quantity"]').should(($cartProductQuantity) => {
      expect($cartProductQuantity.val()).to.eq(productQuantity);
    });

    cy.get('[data-cy="cart-product-price"]').should(($cartProductPrice) => {
      expect($cartProductPrice.text().trim()).to.eq(productPrice);
    });

    cy.get('[data-cy="cart-subtotal"]').should(($cartSubtotal) => {
      console.log($cartSubtotal);
      let productPriceNum = Number(productPrice.replace(/[^0-9.-]+/g,""));
      let cartSubtotalNum = Number($cartSubtotal.text().replace(/[^0-9.-]+/g,""));
      expect(cartSubtotalNum).to.eq(productQuantity * productPriceNum);
    });
  });

  it('adds multiple products to the cart w/ correct name, quantity, price, subtotal', function() {
    // change quantity before adding to cart
    cy.get('[data-cy="product-quantity"]').click().type('{backspace}2').then(($productQuantity) => {
      productQuantity = $productQuantity.val();
    });

    // check if ATC btn adds product to cart
    cy.get('[data-cy="add-to-cart"]').click();

    cy.visit('/cart'); // remove when testing slide cart

    cy.get('[data-cy="cart-product-title"]').should(($cartProductTitle) => {
      expect($cartProductTitle.text()).to.eq(productTitle);
    });

    cy.get('[data-cy="cart-product-quantity"]').should(($cartProductQuantity) => {
      expect($cartProductQuantity.val()).to.eq(productQuantity);
    });

    cy.get('[data-cy="cart-product-price"]').should(($cartProductPrice) => {
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
})