document.addEventListener("DOMContentLoaded", function() {
    // Get all project cards
    const projectCards = document.querySelectorAll(".project-card");

    // Loop through each project card
    projectCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            const projectId = card.getAttribute("data-project");

            // Define the URL of the raw README.md for each project
            const readmeUrl = `https://raw.githubusercontent.com/ubetu/${projectId}/main/README.md`;

            // Fetch the README.md content
            fetch(readmeUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then(data => {
                    // Find the corresponding modal and insert the README.md content
                    const modal = document.getElementById(`${projectId}-modal`);
                    modal.querySelector("p").innerText = data;

                    // Display the modal
                    modal.style.display = "block";
                })
                .catch(error => {
                    console.error("Error fetching the README:", error);
                });
        });

        // Hide the modal when the mouse leaves the card
        card.addEventListener("mouseleave", function() {
            const projectId = card.getAttribute("data-project");
            const modal = document.getElementById(`${projectId}-modal`);
            modal.style.display = "none";
        });
    });
});
