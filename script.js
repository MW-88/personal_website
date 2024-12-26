document.addEventListener("DOMContentLoaded", async () => {
  const username = "MW-88"; // Replace with your GitHub username
  const token = "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"; // Replace with your GitHub token
  const projectsContainer = document.getElementById("pinned-projects");

  const query = `
        {
          user(login: "${username}") {
            pinnedItems(first: 6, types: [REPOSITORY]) {
              edges {
                node {
                  ... on Repository {
                    name
                    description
                    url
                  }
                }
              }
            }
          }
        }
      `;

  try {
    // Fetch pinned repositories using the GitHub GraphQL API
    const response = await fetch(
      "https://mw-website-backend-cwhvcnhbf3gcfbdk.northeurope-01.azurewebsites.net/github/MW-88"
    );

    const pinnedRepos = await response.json();

    // Display pinned repositories
    pinnedRepos.forEach((repo) => {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project");

      projectDiv.innerHTML = `
            <h2>${repo.name}</h2>
            <p>${repo.description || "No description provided."}</p>
            <a href="${repo.url}" target="_blank">View on GitHub</a>
          `;

      projectsContainer.appendChild(projectDiv);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    projectsContainer.innerHTML = `<p>Unable to load projects. Please try again later.</p>`;
  }
});

const yearsSince2018 = new Date().getFullYear() - 2017;

// Insert the calculated value into the text
document.getElementById("years").textContent = yearsSince2018;

function openImage(src, event) {
  const enlargedImage = document.getElementById("enlargedImage");
  const enlargedImg = document.getElementById("enlargedImg");

  // Get the bounding rectangle of the clicked image relative to the viewport
  const rect = event.target.getBoundingClientRect();

  // The current vertical scrolling offset
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;

  // Calculate the element's position relative to the entire document
  const totalTop = scrollTop + rect.top - 2100;

  // Set the source of the enlarged image
  enlargedImg.src = src;

  // Position the overlay at the same vertical offset as the clicked image,
  // taking into account the scroll
  enlargedImage.style.top = `${totalTop}px`;
  enlargedImage.style.display = "flex";

  const projects = document.getElementById("projects");
  projects.style.display = "none";
}

// Close the enlarged image when clicking outside the image
document
  .getElementById("enlargedImage")
  .addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
      closeImage();
    }
  });
function closeImage() {
  const enlargedImage = document.getElementById("enlargedImage");
  enlargedImage.style.display = "none";

  const projects = document.getElementById("projects");
  projects.style.display = "block";
}

// Close the enlarged image when clicking outside the image
document
  .getElementById("enlargedImage")
  .addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
      closeImage();
    }
  });
