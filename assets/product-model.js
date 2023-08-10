class ProductModel extends HTMLElement {
    constructor() {
        super();
        this.openModelModal();
    }

    openModelModal() {
        console.log('hello propduct model')
    }
}

const productModal = customElements.define('product-model', ProductModel);