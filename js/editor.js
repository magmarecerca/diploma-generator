(function() {
    const localStorageNamespace = 'org.magmarecerca.dev/diploma_generator';

    const title = () => document.querySelectorAll('.text.project-title');
    const participant = () => document.querySelectorAll('.text.project-participant');
    const image = () => document.querySelectorAll('.preview-image');

    function subscribeToInputEvent(id, func, items) {
        document.addEventListener('input', (evt) => {
            if (evt.target.id !== id)
                return;

            storeItem(id, evt.target.value);
            items().forEach(item => func(evt.target.value, item));
        });
    }
    function subscribeToMultiInputEvent(selector, func, items) {
        document.addEventListener('input', (evt) => {
            if (!evt.target.matches(selector))
                return;

            const elements = document.querySelectorAll(selector);
            const index = Array.from(elements).indexOf(evt.target);

            if (index !== -1) {
                func(evt.target.value, items()[index]);
                storeMultiItem(selector);
            }
        });
    }

    function subscribeToCheckboxEvent(id, func, items) {
        document.addEventListener('change', (evt) => {
            if (evt.target.id !== id)
                return;

            storeItem(id, evt.target.checked);
            items().forEach(item => func(evt.target.checked, item));
        });
    }

    function storeItem(id, value) {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, id, value, expiredAt);
    }

    function restoreItem(id, func, items) {
        if (Storehouse.getItem(localStorageNamespace, id) === undefined) {
            const value = document.getElementById(id).value;
            items().forEach(i => func(value, i));
            return;
        }
        const value = Storehouse.getItem(localStorageNamespace, id);
        document.getElementById(id).value = value;
        items().forEach(i => func(value, i));
    }

    function storeMultiItem(selector) {
        const elements = document.querySelectorAll(selector);
        const expiredAt = new Date(2099, 1, 1);

        elements.forEach((element, index) => {
            Storehouse.setItem(
                localStorageNamespace,
                `${selector}_${index}`,
                element.value,
                expiredAt
            );
        });

        Storehouse.setItem(
            localStorageNamespace,
            `${selector}_size`,
            elements.length,
            expiredAt
        );
    }

    function restoreMultiItem(selector, func, items) {
        const elements = document.querySelectorAll(selector);
        const targets = items();

        elements.forEach((element, index) => {
            const id = `${selector}_${index}`;
            const storedValue = Storehouse.getItem(localStorageNamespace, id);

            if (storedValue !== undefined) {
                element.value = storedValue;
            }

            if (targets[index]) {
                func(element.value, targets[index]);
            }
        });
    }

    function restoreCheckbox(id, func, items) {
        const input = document.getElementById(id);
        const storedValue = Storehouse.getItem(localStorageNamespace, id);

        const checked = storedValue === undefined
            ? input.checked
            : storedValue;

        input.checked = checked;
        items().forEach(item => func(checked, item));
    }

    function changeText(newText, item) {
        item.innerHTML = newText;
    }

    function changeXPosition(newXPosition, item) {
        item.style.left = `${newXPosition}%`;
    }

    function changeYPosition(newYPosition, item) {
        item.style.top = `${newYPosition}%`;
    }

    function changeFontWeight(newWeight, item) {
        item.style.fontWeight = newWeight;
    }

    function changeFontSize(fontSize, item) {
        item.style.fontSize = `${fontSize / 7}cqw`;
    }

    function changeTextAlignment(alignment, item) {
        switch (alignment) {
            case 'left':
                item.style.transform = 'translateX(0)';
                item.style.textAlign = 'left';
                break;
            case 'center':
                item.style.transform = 'translateX(-50%)';
                item.style.textAlign = 'center';
                break;
            case 'right':
                item.style.transform = 'translateX(-100%)';
                item.style.textAlign = 'right';
                break;
        }
    }

    function changeTextColor(color, item) {
        item.style.color = color;
    }

    function changeTextWidth(width, item) {
        item.style.width = `${width}%`;
    }

    function printImage(visible, item) {
        if (visible)
            item.style.setProperty('visibility', 'visible', 'important');
        else
            item.style.visibility = null;
    }

    subscribeToInputEvent('title', changeText, title);
    subscribeToMultiInputEvent('.participant-entry input', changeText, participant);

    subscribeToInputEvent('title-x', changeXPosition, title);
    subscribeToInputEvent('participant-x', changeXPosition, participant);

    subscribeToInputEvent('title-y', changeYPosition, title);
    subscribeToInputEvent('participant-y', changeYPosition, participant);

    subscribeToInputEvent('title-weight', changeFontWeight, title);
    subscribeToInputEvent('participant-weight', changeFontWeight, participant);

    subscribeToInputEvent('title-size', changeFontSize, title);
    subscribeToInputEvent('participant-size', changeFontSize, participant);

    subscribeToInputEvent('title-alignment', changeTextAlignment, title);
    subscribeToInputEvent('participant-alignment', changeTextAlignment, participant);

    subscribeToInputEvent('title-color', changeTextColor, title);
    subscribeToInputEvent('participant-color', changeTextColor, participant);

    subscribeToInputEvent('title-width', changeTextWidth, title);
    subscribeToInputEvent('participant-width', changeTextWidth, participant);

    subscribeToCheckboxEvent('print-image', printImage, image);

    function restoreItems() {
        restoreItem('title', changeText, title);
        restoreMultiItem('.participant-entry input', changeText, participant);
        restoreItem('title-x', changeXPosition, title);
        restoreItem('participant-x', changeXPosition, participant);
        restoreItem('title-y', changeYPosition, title);
        restoreItem('participant-y', changeYPosition, participant);
        restoreItem('title-weight', changeFontWeight, title);
        restoreItem('participant-weight', changeFontWeight, participant);
        restoreItem('title-size', changeFontSize, title);
        restoreItem('participant-size', changeFontSize, participant);
        restoreItem('title-alignment', changeTextAlignment, title);
        restoreItem('participant-alignment', changeTextAlignment, participant);
        restoreItem('title-color', changeTextColor, title);
        restoreItem('participant-color', changeTextColor, participant);
        restoreItem('title-width', changeTextWidth, title);
        restoreItem('participant-width', changeTextWidth, participant);
        restoreCheckbox('print-image', printImage, image);
    }

    window.Editor = window.Editor || {
        restoreItems: restoreItems,
        storeMultiItem: storeMultiItem
    }

    document.addEventListener('DOMContentLoaded', restoreItems);
})();