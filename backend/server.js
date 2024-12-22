const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

query = `
{
  user(login: "|username|") {
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

app.get("/", async (req, res) => {
  console.log("Server is running");
});

app.get("/github/:username", async (req, res) => {
  try {
    query = query.replace(
      "|username|",
      encodeURIComponent(req.params.username)
    );
    // Fetch pinned repositories using the GitHub GraphQL API
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
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
    res.json(pinnedRepos);
  } catch (error) {
    throw new Error("Failed to fetch pinned repositories");
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
