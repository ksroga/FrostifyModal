class FrostModals {

    preparedSettings = [];
    lastModalId = 0;

    show()
    {
        document.body.appendChild(FrostModals.prepareModal(this.preparedSettings[this.lastModalId]));
        return this;
    }

    close(modalId = null, useCallback = true)
    {
        modalId = modalId || this.preparedSettings[this.lastModalId].id;
        let close = true,
            useCancelCallback = useCallback
                && typeof this.preparedSettings[modalId] !== 'undefined'
                && this.preparedSettings[modalId].onCancel;

        if (useCancelCallback && this.preparedSettings[modalId].onCancel() === false) {
            close = false;
        }

        if (close) {
            document.querySelector(`.fmodal-wrapper[data-id="${modalId}"]`).remove();
        }

        return this;
    }

    submit(modalId = null)
    {
        modalId = modalId || this.preparedSettings[this.lastModalId].id;
        let close = true,
            useCancelCallback = typeof this.preparedSettings[modalId] !== 'undefined'
                && this.preparedSettings[modalId].onOk;

        if (useCancelCallback && this.preparedSettings[modalId].onOk() === false) {
            close = false;
        }

        if (close) {
            document.querySelector(`.fmodal-wrapper[data-id="${modalId}"]`).remove();
        }

        return this;
    }

    set(settings)
    {
        this.lastModalId++;
        this.preparedSettings[this.lastModalId] = this.#prepareModalSettings(settings);
        return this;
    }

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
        closeButton.onclick = () => FrostModal.close(settings.id, false);
        closeButton.innerText = 'X';

        header.classList.add('fmodal-header');
        header.innerHTML = settings.title;
        header.style.background = settings.header.background || header.style.background;
        header.style.color = settings.header.color || header.style.color;
        header.ondragover = (event) => FrostModals.dragOver(event);
        if (settings.closeButton) {
            header.appendChild(closeButton);
        }

        content.classList.add('fmodal-body');
        content.innerHTML = settings.content;

        cancelButton.classList.add('fmodal-button', 'fmodal-cancel');
        cancelButton.onclick = () => FrostModal.close(settings.id);
        cancelButton.innerHTML = 'Cancel';

        submitButton.classList.add('fmodal-button', 'fmodal-accept');
        submitButton.onclick = () => FrostModal.submit(settings.id);
        submitButton.innerHTML = 'Okay';

        footer.classList.add('fmodal-footer');
        footer.appendChild(cancelButton);
        footer.appendChild(submitButton);

        container.classList.add('fmodal-container');
        container.appendChild(header);
        container.appendChild(content);
        container.appendChild(footer);

        wrapper.classList.add('fmodal-wrapper')
        wrapper.dataset.id = settings.id;
        wrapper.appendChild(container);

        return wrapper;
    }

    #prepareModalSettings(settings)
    {
        return {
            id: this.lastModalId,
            title: settings.title || '',
            content: settings.content || '',
            onOk: settings.onOk || '',
            onCancel: settings.onCancel || null,
            closeButton: settings.closeButton || true,
            header: {
                background: settings.header ? settings.header.background : null,
                color: settings.header ? settings.header.color : null,
            }
        };
    }
}

const FrostModal = new FrostModals();