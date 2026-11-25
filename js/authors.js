document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("participants");
    const addButton = document.getElementById("add-participant");
    const inputTemplate = document.getElementById("empty-participant-template");

    const diplomaContainer = document.getElementById("preview");
    const diplomaTemplate = document.getElementById("diploma-template");

    const MIN_PARTICIPANTS = 1;

    function getEntries() {
        return Array.from(
            container.querySelectorAll(".participant-entry")
        ).filter(entry => entry.style.display !== "none");
    }

    function updateButtons() {
        const entries = getEntries();
        entries.forEach((entry) => {
            const removeButton = entry.querySelector(".remove");
            removeButton.disabled = entries.length <= MIN_PARTICIPANTS;
        });
    }

    function updateState() {
        updateButtons();
        Editor.restoreItems();
    }

    addButton.addEventListener("click", () => {
        const newEntry = inputTemplate.content.cloneNode(true);
        const newDiploma = diplomaTemplate.content.cloneNode(true);

        container.appendChild(newEntry);
        diplomaContainer.appendChild(newDiploma);

        updateState();
    });

    container.addEventListener("click", (event) => {
        const button = event.target.closest(".remove");

        if (!button)
            return;

        const entries = getEntries();

        if (entries.length <= MIN_PARTICIPANTS)
            return;

        const entry = button.closest(".participant-entry");
        entry.remove();
        const diploma = diplomaContainer.querySelector(".diploma-container");
        diploma.remove();

        updateState();
    });

    updateState();
});