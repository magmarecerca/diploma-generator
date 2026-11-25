document.addEventListener("DOMContentLoaded", () => {
    const loadButton = document.getElementById('load-button');

    let loadImage = () => {
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    document.querySelectorAll('.preview-image').forEach(el => {
                        el.src = reader.result;
                    });

                    const template = document.getElementById('diploma-template');
                    template.content.querySelectorAll('.preview-image').forEach(el => {
                        el.src = reader.result;
                    });

                    self.currentFileName = file.name; // Update filename
                };
                reader.readAsDataURL(file);
            }

            document.body.removeChild(input); // Remove the input element after usage
        };
        input.oncancel = () => {
            document.body.removeChild(input); // Remove the input element after cancel
        }

        input.click(); // Trigger file input click
    }

    loadButton.addEventListener('click', (event) => {
        event.preventDefault();
        loadImage();
    });
});