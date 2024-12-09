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

const yearsSince2018 = new Date().getFullYear() - 2018;

// Insert the calculated value into the text
document.getElementById("years").textContent = yearsSince2018;
