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
            const modelViewer = modalBody.querySelector('model-viewer');
            const template = document.querySelector(`product-model[data-media-id="${mediaID}"] > template`);
            const clone = template.content.cloneNode(true);

            modalBody
                .innerHTML('')
                .appendChild(clone);
            modelViewer.setAttribute('reveal', 'auto');
        });
    }
}

const productModal = customElements.define('product-model', ProductModel);