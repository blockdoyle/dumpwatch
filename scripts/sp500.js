const yahooFinanceUrl =
  "https://query1.finance.yahoo.com/v8/finance/chart/SPY?interval=1h&range=1d";
const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
  yahooFinanceUrl
)}`;

fetch(proxyUrl)
  .then((response) => response.json())
  .then((data) => {
    const parsedData = JSON.parse(data.contents); // Parse the proxied response
    const chartData = parsedData.chart.result[0];
    const timestamps = chartData.timestamp.map((ts) =>
      new Date(ts * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    const prices = chartData.indicators.quote[0].close;
    const volumes = chartData.indicators.quote[0].volume;

    console.log(timestamps, prices, volumes); // Log parsed data

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
            yAxisID: "y",
          },
          {
            label: "SPY Hourly Volume",
            data: volumes,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 1,
            type: "bar",
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
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
              drawOnChartArea: false,
            },
          },
        },
      },
    });
  })
  .catch((error) => console.error("Error fetching SPY data:", error));
