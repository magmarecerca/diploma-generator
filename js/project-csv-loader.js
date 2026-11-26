document.addEventListener("DOMContentLoaded", () => {
    const loadButton = document.getElementById('projects');
    const standList = document.getElementById('project-stand');

    let projects;

    loadButton.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true, complete: function (results) {
                    projects = results.data;
                    refreshStandList();
                }, error: function (error) {
                    console.error('Error parsing CSV:', error);
                }
            });
        }
    }

    function containsOption(option) {
        for (let i = 0; i < standList.options.length; i++) {
            if (standList.options[i].value === option) {
                return true;
            }
        }

        return false;
    }

    function refreshStandList() {
        const options = [...new Set(projects
            .map(project => project.Stand)
            .filter(value => value != null && value.trim() !== ""))];

        standList.innerHTML = `
            <option value="" disabled selected>Select an option</option>
            ${options.map(value => `<option value="${value}">${value}</option>`).join("")}
        `;
    }
});