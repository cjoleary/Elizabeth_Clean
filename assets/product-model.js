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
<<<<<<< HEAD

            modalBody.innerHTML = '';
            modalBody.appendChild(clone);
            modalBody.querySelector('model-viewer').setAttribute('reveal', 'auto');
=======
            const modelViewer = modalBody.querySelector('model-viewer');
            console.log(modelViewer);

            modalBody.innerHTML = '';
            modalBody.appendChild(clone).then(() => {
                modelViewer.setAttribute('reveal', 'auto');
            });
>>>>>>> 45c88eb58599c83fc51f5c1783c12ea1dbc54319
        });
    }
}

const productModal = customElements.define('product-model', ProductModel);