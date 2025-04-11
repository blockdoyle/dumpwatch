const uwRssUrl = "https://rss.app/feeds/yCp8M3Af9Jhk797S.xml";

fetch(uwRssUrl)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    const items = xml.querySelectorAll("item");
    const newsContainer = document.getElementById("unusual-whales-posts");

    items.forEach((item) => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;

      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
      newsContainer.appendChild(listItem);
    });
  })
  .catch((error) => console.error("Error fetching Unusual_Whales posts:", error));
