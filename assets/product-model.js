class ProductModel extends HTMLElement {
    constructor() {
        super();
        this.openModelModal();
    }

    openModelModal() {
        const mediaID = this.getAttribute('data-media-id');
        const modal = document.getElementById('productModelModal');

        if(!mediaID) return;

        const openModalBtn = document.getElementById(`productModelOpenBtn_${mediaID}`);

        openModalBtn.addEventListener('click', function(e) {
            const modalBody = modal.querySelector('#body');
            const template = document.querySelector(`product-model[data-media-id="${mediaID}"] > template`);
            const clone = template.content.cloneNode(true);

            modalBody.innerHTML = '';
            modalBody.appendChild(clone);
            modalBody.querySelector('model-viewer').setAttribute('reveal', 'auto');
        });
    }
}

const productModal = customElements.define('product-model', ProductModel);