document.addEventListener("DOMContentLoaded", () => {
    const loadButton = document.getElementById('projects');
    const standList = document.getElementById('project-stand');

    const title = document.getElementById('title');

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

    function refreshStandList() {
        const options = [...new Set(projects
            .map(project => project.Stand)
            .filter(value => value != null && value.trim() !== ""))];

        standList.innerHTML = `
            <option value="" disabled selected>Select an option</option>
            ${options.map(value => `<option value="${value}">${value}</option>`).join("")}
        `;
    }

    standList.addEventListener("change", (e) => {
        const selectedValue = e.target.value;

        const matchingTuples = projects.filter(
            tuple => tuple.Stand === selectedValue
        );

        title.value = matchingTuples[0].Title;
        title.dispatchEvent(new Event('input', {
            bubbles: true
        }));
        Authors.setAuthors(matchingTuples.map(tuple => tuple.Participant));
    });
});