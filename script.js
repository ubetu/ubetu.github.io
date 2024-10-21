document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const projectId = this.dataset.project;
            const modal = this.querySelector('.modal');
            const readmeElement = document.getElementById(`${projectId}-readme`);

            // Fetch the README.md file for the project
            fetch(`https://raw.githubusercontent.com/ubetu/${projectId}/main/README.md`)
                .then(response => {
                    if (!response.ok) throw new Error("Failed to load README.md");
                    return response.text();
                })
                .then(data => {
                    readmeElement.innerHTML = data.replace(/(?:\r\n|\r|\n)/g, '<br>'); // Insert README content with line breaks
                    modal.style.display = 'block'; // Show modal
                })
                .catch(error => {
                    readmeElement.innerHTML = "Error loading README.md"; // Error handling
                    modal.style.display = 'block'; // Show modal even on error
                });
        });

        card.addEventListener('mouseleave', function () {
            const modal = this.querySelector('.modal');
            modal.style.display = 'none'; // Hide modal when mouse leaves
        });
    });
});
