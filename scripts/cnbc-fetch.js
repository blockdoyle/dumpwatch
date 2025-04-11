const cnbcRssUrl =
  "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664";

fetch(cnbcRssUrl)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    const items = xml.querySelectorAll("item");
    const newsContainer = document.getElementById("cnbc-news");

    items.forEach((item) => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;

      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
      newsContainer.appendChild(listItem);
    });
  })
  .catch((error) => console.error("Error fetching CNBC news:", error));