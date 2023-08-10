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

        if(!mediaID) return;

        const openModalBtn = document.getElementById(`productModelOpenBtn_${mediaID}`);

        openModalBtn.addEventListener('click', function(e) {
            modal.querySelector('#body').innerHTML = '';

            const template = document.querySelector(`product-modal[data-media-id="${mediaID}"] > template`);

            console.log(template)
        });
    }
}

const productModal = customElements.define('product-model', ProductModel);