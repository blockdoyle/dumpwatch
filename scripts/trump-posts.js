// Example: Fetch and display Trump's Truth Social posts from the RSS feed
fetch(
  "https://api.allorigins.win/get?url=" +
    encodeURIComponent("https://trumpstruth.org/feed")
)
  .then((response) => response.json())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "application/xml");
    const items = xml.querySelectorAll("item");
    const truthPosts = document.getElementById("truth-posts");

    items.forEach((item) => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;

      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
      truthPosts.appendChild(listItem);
    });
  })
  .catch((error) => console.error("Error fetching RSS feed:", error));
