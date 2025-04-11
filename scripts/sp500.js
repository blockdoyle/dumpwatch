// Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
const apiKey = "JDFWFQTQKII1ECXZ";
const symbol = "SPY"; // SPY is an ETF that tracks the S&P 500 index
const interval = "60min"; // Hourly data
const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const timeSeries = data[`Time Series (${interval})`];
    const timestamps = Object.keys(timeSeries).slice(0, 24).reverse(); // Last 24 hours
    const prices = timestamps.map((timestamp) =>
      parseFloat(timeSeries[timestamp]["4. close"])
    );
    const volumes = timestamps.map((timestamp) =>
      parseInt(timeSeries[timestamp]["5. volume"])
    );

    // Create the chart
    const ctx = document.getElementById("spyChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: timestamps,
        datasets: [
          {
            label: "SPY Hourly Closing Price",
            data: prices,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
            yAxisID: "y", // Link to the first Y-axis
          },
          {
            label: "SPY Hourly Volume",
            data: volumes,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 1,
            type: "bar", // Display volume as a bar chart
            yAxisID: "y1", // Link to the second Y-axis
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
            },
            ticks: {
              maxTicksLimit: 12, // Limit the number of time labels
            },
          },
          y: {
            type: "linear",
            position: "left",
            title: {
              display: true,
              text: "Price (USD)",
            },
          },
          y1: {
            type: "linear",
            position: "right",
            title: {
              display: true,
              text: "Volume",
            },
            grid: {
              drawOnChartArea: false, // Prevent grid lines from overlapping
            },
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching SPY data:", error);
    document.getElementById("spyChart").innerHTML =
      "<p>Error loading chart data.</p>";
  });
