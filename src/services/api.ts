// Base URL for GitHub search API
const GITHUB_API_URL = "https://api.github.com/search/repositories";

export async function fetchRandomRepository(language: string) {
  // Construct the search query; if a language is specified, filter by that language
  const query = language ? `language:${language}` : "";
  const sort = "stars"; // Sort repositories by star count
  const order = "desc"; // Order results in descending order
  const perPage = 100; // Number of repositories per page
  const page = Math.floor(Math.random() * 10) + 1; // Random page number between 1 and 10

  // Construct the full API URL with query parameters
  const url = `${GITHUB_API_URL}?q=${encodeURIComponent(
    query
  )}&sort=${sort}&order=${order}&per_page=${perPage}&page=${page}`;

  // Fetch data from the GitHub API
  const response = await fetch(url);

  // Check if the response is not successful
  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  // Parse the response data as JSON
  const data = await response.json();

  // Check if no repositories are found in the response
  if (data.items.length === 0) {
    throw new Error("No repositories found for the selected criteria");
  }

  // Select a random repository from the list
  const randomIndex = Math.floor(Math.random() * data.items.length);
  return data.items[randomIndex];
}
