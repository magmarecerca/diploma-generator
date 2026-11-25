document.addEventListener('DOMContentLoaded', () => {
    const localStorageNamespace = 'org.magmarecerca.dev/diploma_generator';

    const title = document.querySelectorAll('.text.project-title');
    const participant = document.querySelectorAll('.text.project-participant');
    const image = document.querySelectorAll('.preview-image');

    function subscribeToInputEvent(id, func, item) {
        document.getElementById(id).addEventListener('input', (evt) => {
            storeItem(id, evt.target.value);
            item.forEach(i => func(evt.target.value, i));
        });
    }
    function subscribeToMultiInputEvent(selector, func, item) {
        // document.getElementById(id).addEventListener('input', (evt) => {
        //     storeItem(id, evt.target.value);
        //     item.forEach(i => func(evt.target.value, i));
        // });
    }

    function subscribeToCheckboxEvent(id, func, item) {
        document.getElementById(id).addEventListener('change', (evt) => {
            storeItem(id, evt.target.checked);
            item.forEach(i => func(evt.target.checked, i));
        });
    }

    function storeItem(id, value) {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, id, value, expiredAt);
    }

    function restoreItem(id, func, item) {
        if (Storehouse.getItem(localStorageNamespace, id) === undefined) {
            const value = document.getElementById(id).value;
            item.forEach(i => func(value, i));
            return;
        }
        const value = Storehouse.getItem(localStorageNamespace, id);
        document.getElementById(id).value = value;
        item.forEach(i => func(value, i));
    }

    function restoreMultiItem(query, func, item) {
        // if (Storehouse.getItem(localStorageNamespace, id) === undefined) {
        //     const value = document.getElementById(id).value;
        //     item.forEach(i => func(value, i));
        //     return;
        // }
        // const value = Storehouse.getItem(localStorageNamespace, id);
        // document.getElementById(id).value = value;
        // item.forEach(i => func(value, i));
    }

    function restoreCheckbox(id, func, item) {
        if (Storehouse.getItem(localStorageNamespace, id) === undefined) {
            const checked = document.getElementById(id).checked;
            item.forEach(i => func(checked, i));
            return;
        }
        const checked = Storehouse.getItem(localStorageNamespace, id);
        document.getElementById(id).checked = checked;
        item.forEach(i => func(checked, i));
    }

    function changeText(newText, item) {
        item.innerHTML = newText;
    }

    subscribeToInputEvent('title', changeText, title);
    subscribeToMultiInputEvent('.participant-entry .text', changeText, participant);

    function changeXPosition(newXPosition, item) {
        item.style.left = `${newXPosition}%`;
    }

    subscribeToInputEvent('title-x', changeXPosition, title);
    subscribeToInputEvent('participant-x', changeXPosition, participant);

    function changeYPosition(newYPosition, item) {
        item.style.top = `${newYPosition}%`;
    }

    subscribeToInputEvent('title-y', changeYPosition, title);
    subscribeToInputEvent('participant-y', changeYPosition, participant);

    function changeFontWeight(newWeight, item) {
        item.style.fontWeight = newWeight;
    }

    subscribeToInputEvent('title-weight', changeFontWeight, title);
    subscribeToInputEvent('participant-weight', changeFontWeight, participant);

    function changeFontSize(fontSize, item) {
        item.style.fontSize = `${fontSize / 7}cqw`;
    }

    subscribeToInputEvent('title-size', changeFontSize, title);
    subscribeToInputEvent('participant-size', changeFontSize, participant);

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

    subscribeToInputEvent('title-alignment', changeTextAlignment, title);
    subscribeToInputEvent('participant-alignment', changeTextAlignment, participant);

    function changeTextColor(color, item) {
        item.style.color = color;
    }

    subscribeToInputEvent('title-color', changeTextColor, title);
    subscribeToInputEvent('participant-color', changeTextColor, participant);

    function changeTextWidth(width, item) {
        item.style.width = `${width}%`;
    }

    subscribeToInputEvent('title-width', changeTextWidth, title);
    subscribeToInputEvent('participant-width', changeTextWidth, participant);

    function printImage(visible, item) {
        if (visible)
            item.style.setProperty('visibility', 'visible', 'important');
        else
            item.style.visibility = null;
    }

    subscribeToCheckboxEvent('print-image', printImage, image);

    restoreItem('title', changeText, title);
    restoreMultiItem('.participant-entry .text', changeText, participant);
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
});