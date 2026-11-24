document.addEventListener('DOMContentLoaded', () => {
    const localStorageNamespace = 'org.magmarecerca.dev/diploma_generator';

    const title = document.getElementById('project-title');
    const participant = document.getElementById('project-participant');
    const image = document.getElementById('preview-image');

    function subscribeToInputEvent(id, func, item) {
        document.getElementById(id).addEventListener('input', (evt) => {
            storeItem(id, evt.target.value);
            return func(evt.target.value, item);
        });
    }

    function subscribeToCheckboxEvent(id, func, item) {
        document.getElementById(id).addEventListener('change', (evt) => {
            storeCheckbox(id, evt.target.checked);
            return func(evt.target.checked, item);
        });
    }

    function storeItem(id, value) {

    }

    function storeCheckbox(id, checked) {

    }

    function restoreItem(id, func, item) {
        const element = document.getElementById(id);
        func(element.value, item);
    }

    function restoreCheckbox(id, func, item) {
        const element = document.getElementById(id);
        func(element.checked, item);
    }

    function changeText(newText, item) {
        item.innerHTML = newText;
    }
    subscribeToInputEvent('title', changeText, title);
    subscribeToInputEvent('participant', changeText, participant);

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
                break;
            case 'center':
                item.style.transform = 'translateX(-50%)';
                break;
            case 'right':
                item.style.transform = 'translateX(-100%)';
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

    function printImage(visible, item) {
        if (visible)
            item.style.setProperty('visibility', 'visible', 'important');
        else
            item.style.visibility = null;
    }
    subscribeToCheckboxEvent('print-image', printImage, image);

    restoreItem('title', changeText, title);
    restoreItem('participant', changeText, participant);
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
    restoreCheckbox('print-image', printImage, image);
});