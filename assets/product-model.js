class ProductModel extends HTMLElement {
    constructor() {
        super();
        this.openModelModal();
    }

    getMediaID() {
        
    }

    getModal() {

    }

    openModelModal() {
        const mediaID = this.getMediaID();
        const modal = this.getModal();
    }
}

const productModal = customElements.define('product-model', ProductModel);