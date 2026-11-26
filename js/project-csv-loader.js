document.addEventListener("DOMContentLoaded", () => {
    const loadButton = document.getElementById('projects');
    const standList = document.getElementById('project-stand');
    const title = document.getElementById('title');

    let projects = [];

    // Initialize Select2
    $('#project-stand').select2({
        placeholder: 'Select a stand',
        allowClear: false,
        width: '100%'
    });

    loadButton.addEventListener('change', (e) => {
        const file = e.target.files[0];

        if (!file) return;

        Papa.parse(file, {
            header: true,
            complete: (results) => {
                projects = results.data;
                refreshStandList();
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
            }
        });
    });

    function refreshStandList() {
        const options = [...new Set(
            projects
                .map(project => project.Stand?.trim())
                .filter(Boolean)
        )];

        // Rebuild options
        standList.replaceChildren(
            ...options.map(value => new Option(value, value))
        );

        // Reset selection
        standList.value = '';

        // Notify Select2
        $('#project-stand').val(null).trigger('change');
    }

    $('#project-stand').on('select2:select', function () {
        standList.dispatchEvent(new Event('change', {
            bubbles: true
        }));
    });

    // Listen directly to the native select
    standList.addEventListener('change', (e) => {
        const selectedValue = e.target.value;

        const matchingTuples = projects.filter(
            tuple => tuple.Stand?.trim() === selectedValue
        );

        if (!matchingTuples.length) return;

        title.value = matchingTuples[0].Title;

        title.dispatchEvent(new Event('input', {
            bubbles: true
        }));

        Authors.setAuthors(
            matchingTuples.map(tuple => tuple.Participant)
        );
    });
});