class FrostifyModals {

    /**
     * FrostifyModals constructor.
     */
    constructor() {
        this.preparedSettings = [];
        this.lastModalId = 0;
        this.config = this.prepareModalSettings();
        this.bindAttributeModals();
    }

    setConfig() {

    }

    /**
     * Show modal.
     * @returns {FrostifyModals}
     */
    show()
    {
        document.body.appendChild(FrostifyModals.prepareModal(this.preparedSettings[this.lastModalId]));
        return this;
    }

    /**
     * Close modal.
     * @param modalId Modal id.
     * @param useCallback Close callback.
     * @returns {FrostifyModals}
     */
    close(modalId = null, useCallback = true)
    {
        modalId = modalId || this.preparedSettings[this.lastModalId].id;
        let close = true,
            useCancelCallback = useCallback &&
                typeof this.preparedSettings[modalId] !== 'undefined' &&
                this.preparedSettings[modalId].onCancel;

        if (useCancelCallback && this.preparedSettings[modalId].onCancel() === false) {
            close = false;
        }

        if (close) {
            FrostifyModals.closeModal(modalId);
        }

        return this;
    }

    /**
     * Submit modal.
     * @param modalId Modal id.
     * @returns {FrostifyModals}
     */
    submit(modalId = null)
    {
        modalId = modalId || this.preparedSettings[this.lastModalId].id;
        let close = true,
            useCancelCallback = typeof this.preparedSettings[modalId] !== 'undefined' &&
                this.preparedSettings[modalId].onOk;

        if (useCancelCallback && this.preparedSettings[modalId].onOk() === false) {
            close = false;
        }

        if (close) {
            FrostifyModals.closeModal(modalId);
        }

        return this;
    }

    /**
     * Set modal settings.
     * @param settings Settings object.
     * @returns {FrostifyModals}
     */
    set(settings)
    {
        this.lastModalId++;
        this.preparedSettings[this.lastModalId] = this.prepareModalSettings(settings);
        return this;
    }

    /**
     * Prepare modal object settings.
     * @param settings Settings passed in set() method.
     * @returns object Settings object with all possible keys.
     */
    prepareModalSettings(settings = {})
    {
        return {
            id: this.lastModalId,
            title: settings.title ?? '',
            content: settings.content ?? '',
            onOk: settings.onOk ?? '',
            onCancel: settings.onCancel ?? null,
            isClosable: settings.isClosable !== false,
            isDraggable: settings.isDraggable !== false,
            reverseButtons: settings.reverseButtons === true,
            labels: {
                ok: settings.labels?.ok ?? 'Okay',
                cancel: settings.labels?.cancel ?? 'Cancel',
            },
            wrapperStyles: settings.wrapperStyles ?? {},
            containerStyles: settings.containerStyles ?? {},
            headerStyles: settings.headerStyles ?? {},
            bodyStyles: settings.bodyStyles ?? {},
            footerStyles: settings.footerStyles ?? {},
            buttonsStyles: settings.buttonsStyles ?? {},
        };
    }

    /**
     * Bind elements with data-modal attribute to open specified modal.
     */
    bindAttributeModals()
    {
        document.querySelectorAll('[data-modal]').forEach(element => {
            element.onclick = () => {
                let staticDiv = document.querySelector(`#${element.dataset.modal}`),
                    modalContent = staticDiv ? staticDiv.innerHTML : element.dataset.modal;
                this.set({
                    title: element.dataset.modalTitle,
                    content: modalContent,
                }).show();
            };
        });
    }

    /**
     * Destroy modal element.
     * @param modalId Modal id.
     */
    static closeModal(modalId)
    {
        let wrapper = document.querySelector(`.fmodal-wrapper[data-id="${modalId}"]`);
        wrapper.style.animation = 'fadeOut 0.25s ease 0s 1 normal forwards';
        wrapper.style.opacity = '0';
        setTimeout(() => wrapper.remove(), 250);
    }

    /**
     * Prepare modal as HTMLDivElement.
     * @param settings Modal settings.
     * @returns {HTMLDivElement} Prepared modal element.
     */
    static prepareModal(settings)
    {
        let wrapper = document.createElement('div'),
            container = document.createElement('div'),
            header = document.createElement('div'),
            content = document.createElement('div'),
            footer = document.createElement('div'),
            closeButton = document.createElement('div'),
            cancelButton = document.createElement('button'),
            submitButton = document.createElement('button');

        closeButton.classList.add('fmodal-close');
        closeButton.onclick = () => FrostifyModal.close(settings.id, false);
        closeButton.innerText = 'X';

        header.classList.add('fmodal-header');
        header.classList.toggle('fmodal-draggable', settings.isDraggable);
        header.innerHTML = settings.title;
        header.ondragover = (event) => FrostifyModals.dragOver(event);
        if (settings.isClosable === true) {
            header.appendChild(closeButton);
        }
        for (const [key, value] of Object.entries(settings.headerStyles)) {
            header.style[key] = value;
        }

        content.classList.add('fmodal-body');
        content.innerHTML = settings.content;
        for (const [key, value] of Object.entries(settings.bodyStyles)) {
            content.style[key] = value;
        }

        cancelButton.classList.add('fmodal-button', 'fmodal-cancel');
        cancelButton.onclick = () => FrostifyModal.close(settings.id);
        cancelButton.innerHTML = settings.labels.cancel;

        submitButton.classList.add('fmodal-button', 'fmodal-accept');
        submitButton.onclick = () => FrostifyModal.submit(settings.id);
        submitButton.innerHTML = settings.labels.ok;
        for (const [key, value] of Object.entries(settings.buttonsStyles)) {
            cancelButton.style[key] = value;
            submitButton.style[key] = value;
        }
        if (settings.reverseButtons) {
            cancelButton.style.float = 'right';
            submitButton.style.float = 'none';
        }

        footer.classList.add('fmodal-footer');
        footer.appendChild(cancelButton);
        footer.appendChild(submitButton);
        for (const [key, value] of Object.entries(settings.footerStyles)) {
            footer.style[key] = value;
        }

        container.classList.add('fmodal-container');
        container.setAttribute('aria-labelledby', settings.title);
        container.setAttribute('aria-modal', 'true');
        container.appendChild(header);
        container.appendChild(content);
        container.appendChild(footer);
        for (const [key, value] of Object.entries(settings.containerStyles)) {
            footer.style[key] = value;
        }
        if (settings.isDraggable) {
            FrostifyModals.makeDraggable(container);
        }

        wrapper.classList.add('fmodal-wrapper');
        wrapper.dataset.id = settings.id;
        wrapper.appendChild(container);
        if (settings.isClosable === true) {
            wrapper.onclick = event => {
                if (event.path[0] === wrapper) {
                    FrostifyModals.closeModal(settings.id);
                }
            };
            document.onkeydown = event => {
                if (event.key === 'Escape') {
                    FrostifyModals.closeModal(settings.id);
                }
            };
        }

        return wrapper;
    }

    /**
     * Make modal draggable.
     * @param container Modal container.
     */
    static makeDraggable(container) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (container.querySelector('.fmodal-header')) {
            container.querySelector('.fmodal-header').onmousedown = dragMouseDown;
        } else {
            container.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            container.style.top = (container.offsetTop - pos2) + "px";
            container.style.left = (container.offsetLeft - pos1) + "px";
            container.style.position = 'absolute';
            container.parentElement.style.display = 'block';
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

const FrostifyModal = new FrostifyModals();