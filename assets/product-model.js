class ProductModel extends HTMLElement {
    constructor() {
        super();
        this.openModelModal();
        this.addEventListener('click', this.loadContent);
    }

    loadContent() {
        Shopify.loadFeatures(
            [
                {
                    name: 'model-viewer-ui',
                    version: '1.0',
                    onLoad: this.setupModelViewerUI.bind(this)
                }
            ]
        );
    }

    setupModelViewerUI(errors) {
        if(errors) return;
        this.modelViewerUI = new Shopify.ModelViewerUI(document.querySelector('model-viewer'));
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
            modalBody.querySelector("#body > model-viewer").setAttribute("reveal", "auto");
        });
    }
}

const productModal = customElements.define('product-model', ProductModel);