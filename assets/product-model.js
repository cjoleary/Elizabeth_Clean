class ProductModel extends HTMLElement {
    constructor() {
        super();
        this.openModelModal();
        this.addEventListener('click', this.loadContent);
    }

    openModelModal() {
        const mediaID = this.getAttribute('data-media-id');
        const modal = document.getElementById('productModelModal');

        // if(!mediaID) return;

        const mobileOpenModalBtn = document.querySelector(`#productModelOpenBtn_${mediaID}_mobile`);
        const desktopOpenModalBtn = document.querySelector(`#productModelOpenBtn_${mediaID}_desktop`);

        const openModalBtns = [mobileOpenModalBtn, desktopOpenModalBtn];

        openModalBtns.forEach( btn => {
            btn.addEventListener('click', function(e) {
                e.stopImmediatePropagation();
                const button = this;
                const screenSize = button.getAttribute('data-screen-size');
                const mediaID = button.getAttribute('data-media-id');
                const modalBody = modal.querySelector('#body');
                const template = document.querySelector(`[data-model-viewer-template][data-screen-size="${screenSize}"][data-media-id="${mediaID}"]`);
                const clone = template.content.cloneNode(true);

                console.log({
                    button,
                    screenSize,
                    mediaID,
                    modalBody,
                    template,
                    clone
                });
    
                modalBody.innerHTML = '';
                modalBody.appendChild(clone);
            });
        });
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
        const modelViewer = document.querySelectorAll('model-viewer');
        console.log(modelViewer);
        this.modelViewerUI = new Shopify.ModelViewerUI(modelViewer);
    }
}

const productModal = customElements.define('product-model', ProductModel);