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

    }

    openModelModal() {
        const mediaID = this.getMediaID();
        const modal = this.getModal();

        console.log(mediaID)
    }
}

const productModal = customElements.define('product-model', ProductModel);