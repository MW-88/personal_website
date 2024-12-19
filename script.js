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
    console.log(result);
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

function openImage(src, event) {
  const enlargedImage = document.getElementById("enlargedImage");
  const enlargedImg = document.getElementById("enlargedImg");

  // Get the bounding rectangle of the clicked image relative to the viewport
  const rect = event.target.getBoundingClientRect();

  // The current vertical scrolling offset
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;

  // Calculate the element's position relative to the entire document
  const totalTop = scrollTop + rect.top - 1900;

  // Set the source of the enlarged image
  enlargedImg.src = src;

  console.log("-----------");
  console.log("Viewport-relative top:", rect.top);
  console.log("Scroll Top:", scrollTop);
  console.log("Document-relative top:", totalTop);

  // Position the overlay at the same vertical offset as the clicked image,
  // taking into account the scroll
  enlargedImage.style.top = `${totalTop}px`;
  enlargedImage.style.display = "flex";
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
