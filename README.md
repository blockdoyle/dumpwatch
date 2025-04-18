# DumpWatch

DumpWatch is a website that tracks:
- Donald Trump's Truth Social posts
- The S&P 500 (SPY) stock data
- CNBC Financial news articles
- Unusual_Whales posts

## Features
- Fetches and displays data dynamically from various sources using RSS feeds and APIs.
- Visualizes S&P 500 stock data with a line and bar chart using Chart.js.
- Responsive design with Bootstrap for a clean and user-friendly interface.

## Technologies Used
- **HTML5**: For structuring the web page.
- **CSS (Bootstrap)**: For styling and responsive design.
- **JavaScript**: For dynamic content fetching and rendering.
- **Chart.js**: For creating interactive charts.
- **Fetch API**: For making HTTP requests to external APIs and RSS feeds.
- **AllOrigins API**: For bypassing CORS restrictions when fetching data.
- **RSS Feeds**: For retrieving data from CNBC, Unusual_Whales, and Truth Social.

## Project Structure
```
index.html
README.md
scripts/
    cnbc-fetch.js
    sp500.js
    trump-posts.js
    unusual_whales.js
```

## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/blockdoyle/dumpwatch.git
   ```
2. Open `index.html` in your browser to view the website.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Bootstrap](https://getbootstrap.com/) for the responsive design framework.
- [Chart.js](https://www.chartjs.org/) for the charting library.
- [AllOrigins](https://allorigins.win/) for the CORS proxy service.
