document.addEventListener("DOMContentLoaded", async () => {
  const username = "MW-88"; // Replace with your GitHub username
  // Replace with your GitHub token
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
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch pinned repositories");
    }

    const result = await response.json();
    const pinnedRepos = result.data.user.pinnedItems.edges.map(
      (edge) => edge.node
    );

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

function openImage(src, event, athis) {
  const enlargedImage = document.getElementById("enlargedImage");
  const enlargedImg = document.getElementById("enlargedImg");

  // Get the clicked image's vertical position
  const imageTop = event.target.getBoundingClientRect().top + window.scrollY;
  console.log(imageTop);
  // Set the source of the enlarged image
  enlargedImg.src = src;

  console.log(src);
  console.log(athis);

  // Position the overlay at the same height as the clicked image
  enlargedImage.style.top = `${imageTop}px`;
  enlargedImage.style.display = "flex";

  var rect = event.target.getBoundingClientRect();

  // rect.top is the distance from the viewport’s top edge
  // If you want the top relative to the document (including any scrolling):
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var totalTop = rect.top + scrollTop;

  console.log("Viewport-relative top:", rect.top);
  console.log("Document-relative top:", totalTop);
}

function closeImage() {
  const enlargedImage = document.getElementById("enlargedImage");
  enlargedImage.style.display = "none";
}

// Close the enlarged image when clicking outside the image
document
  .getElementById("enlargedImage")
  .addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
      closeImage();
    }
  });
