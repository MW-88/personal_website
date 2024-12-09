import requests

# Replace with your personal access token
TOKEN = "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"
USERNAME = "MW-88"

query = (
    """
{
  user(login: "%s") {
    pinnedItems(first: 6, types: [REPOSITORY]) {
      edges {
        node {
          ... on Repository {
            name
            description
            url
            stargazerCount
          }
        }
      }
    }
  }
}
"""
    % USERNAME
)

headers = {"Authorization": f"Bearer {TOKEN}"}
response = requests.post(
    "https://api.github.com/graphql", json={"query": query}, headers=headers
)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(
        f"Query failed to run by returning code {response.status_code}. {response.text}"
    )
