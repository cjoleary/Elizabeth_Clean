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

        const openModalBtns = [
            document.querySelectorAll(`productModelOpenBtn_${mediaID}_mobile`),
            document.querySelectorAll(`productModelOpenBtn_${mediaID}_desktop`)
        ];

        openModalBtns.forEach( btn => {
            btn.addEventListener('click', function(e) {
                const modalBody = modal.querySelector('#body');
                const template = document.querySelector(`product-model[data-media-id="${mediaID}"] > template`);
                const clone = template.content.cloneNode(true);
    
                modalBody.innerHTML = '';
                modalBody.appendChild(clone);
            });
        });
    }
}

const productModal = customElements.define('product-model', ProductModel);