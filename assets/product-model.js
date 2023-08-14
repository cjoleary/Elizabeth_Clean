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
        const modelViewer = document.querySelectorAll('model-viewer');
        console.log(modelViewer);
        if(errors) return;
        this.modelViewerUI = new Shopify.ModelViewerUI(modelViewer);
    }

    openModelModal() {
        const mediaID = this.getAttribute('data-media-id');
        const screenSize = this.getAttribute('data-screen-size');
        const modal = document.getElementById('productModelModal');

        if(!mediaID) return;

        const openModalBtn = document.querySelector(`#openModalBtn_${mediaID}_${screenSize}`);

        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const button = this;
            const screenSize = button.getAttribute('data-screen-size');
            const mediaID = button.getAttribute('data-media-id');
            const modalBody = modal.querySelector('#body');
            const template = document.querySelector(`[data-model-viewer-template][data-screen-size="${screenSize}"][data-media-id="${mediaID}"]`);
            const clone = template.content.cloneNode(true);

            modalBody.innerHTML = '';
            modalBody.appendChild(clone);

            const modelViewer = document.querySelectorAll('model-viewer');
            console.log(modelViewer);
        });
    }
}

const productModal = customElements.define('product-model', ProductModel);