class ProductModel extends HTMLElement {
    constructor() {
        super();
        this.openModelModal();
    }

    // getMediaID() {
    //     const id = this.getAttribute('data-media-id');
    //     return id;
    // }

    // getModal() {
    //     const modal = document.getElementById('productModelModal');
    //     return modal;
    // }

    openModelModal() {
        const mediaID = this.getAttribute('data-media-id');
        const modal = document.getElementById('productModelModal');

        if(!mediaID) return;

        const openModalBtn = document.getElementById(`productModelOpenBtn_${mediaID}`);

        openModalBtn.addEventListener('click', function(e) {
            const modalBody = modal.querySelector('#body');

            modalBody.innerHTML = ''

            const template = document.querySelector(`product-model[data-media-id="${mediaID}"] > template`);

            const clone = template.content.cloneNode(true);

            modalBody.appendChild(clone);
            modalBody.querySelector('model-viewer').setAttribute('reveal', 'auto');
        });
    }
}

const productModal = customElements.define('product-model', ProductModel);