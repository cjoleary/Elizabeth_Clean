class ProductModel extends HTMLElement {
    constructor() {
        super();
        this.openModelModal();
        this.addEventListener('click', this.loadContent);
    }

    openModelModal() {
        const mediaID = this.getAttribute('data-media-id');
        const modal = document.getElementById('productModelModal');

        if(!mediaID) return;

        const mobileOpenModalBtn = document.querySelector(`#productModelOpenBtn_${mediaID}_mobile`);
        const desktopOpenModalBtn = document.querySelector(`#productModelOpenBtn_${mediaID}_desktop`);

        const openModalBtns = [mobileOpenModalBtn, desktopOpenModalBtn];

        openModalBtns.forEach( btn => {
            btn.addEventListener('click', function(e) {
                const modalBody = modal.querySelector('#body');
                const template = document.querySelectorAll(`product-model[data-media-id="${mediaID}"] > template`)[0];
                const clone = template.content.cloneNode(true);
    
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
        const modelViewer = document.querySelector('model-viewer');
        console.log(modelViewer);
        this.modelViewerUI = new Shopify.ModelViewerUI(document.querySelector('model-viewer'));
    }
}

const productModal = customElements.define('product-model', ProductModel);