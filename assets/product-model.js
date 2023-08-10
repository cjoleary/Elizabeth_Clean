class ProductModel extends HTMLElement {
    constructor() {
        super();
        this.openModelModal();
    }

    getMediaID() {
        const id = this.getAttribute('data-media-id');

        return id;
    }

    getModal() {
        const modal = document.getElementById('productModelModal');

        return modal;
    }

    openModelModal() {
        const mediaID = this.getMediaID();
        const modal = this.getModal();

        console.log(modal);
    }
}

const productModal = customElements.define('product-model', ProductModel);