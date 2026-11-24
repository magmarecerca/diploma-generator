document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('project-title');
    const participant = document.getElementById('project-participant');

    function changeText(newText, item) {
        item.innerHTML = newText;
    }
    document.getElementById('title').addEventListener('input', (evt) => changeText(evt.target.value, title));
    document.getElementById('participant').addEventListener('input', (evt) => changeText(evt.target.value, participant));

    function changeXPosition(newXPosition, item) {
        item.style.left = `${newXPosition}%`;
    }
    document.getElementById('title-x').addEventListener('input', (evt) => changeXPosition(evt.target.value, title));
    document.getElementById('participant-x').addEventListener('input', (evt) => changeXPosition(evt.target.value, participant));

    function changeYPosition(newYPosition, item) {
        item.style.top = `${newYPosition}%`;
    }
    document.getElementById('title-y').addEventListener('input', (evt) => changeYPosition(evt.target.value, title));
    document.getElementById('participant-y').addEventListener('input', (evt) => changeYPosition(evt.target.value, participant));

    function changeFontWeight(newWeight, item) {
        item.style.fontWeight = newWeight;
    }
    document.getElementById('title-weight').addEventListener('input', (evt) => changeFontWeight(evt.target.value, title));
    document.getElementById('participant-weight').addEventListener('input', (evt) => changeFontWeight(evt.target.value, participant));

    function changeFontSize(fontSize, item) {
        item.style.fontSize = `${fontSize}px`;
    }
    document.getElementById('title-size').addEventListener('input', (evt) => changeFontSize(evt.target.value, title));
    document.getElementById('participant-size').addEventListener('input', (evt) => changeFontSize(evt.target.value, participant));

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
    document.getElementById('title-alignment').addEventListener('input', (evt) => changeTextAlignment(evt.target.value, title));
    document.getElementById('participant-alignment').addEventListener('input', (evt) => changeTextAlignment(evt.target.value, participant));
});