const yahooFinanceUrl =
  "https://query1.finance.yahoo.com/v8/finance/chart/SPY?interval=1m&range=1d";
const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
  yahooFinanceUrl
)}`;

fetch(proxyUrl)
  .then((response) => response.json())
  .then((data) => {
    const parsedData = JSON.parse(data.contents); // Parse the proxied response
    const chartData = parsedData.chart.result[0];

    const timestamps = [];
    const aggregatedPrices = [];
    const aggregatedVolumes = [];

    for (let i = 0; i < chartData.timestamp.length; i += 30) {
      const halfHourTimestamps = chartData.timestamp.slice(i, i + 30);
      const halfHourPrices = chartData.indicators.quote[0].close.slice(
        i,
        i + 30
      );
      const halfHourVolumes = chartData.indicators.quote[0].volume.slice(
        i,
        i + 30
      );

      // Use the first timestamp in the interval
      timestamps.push(
        new Date(halfHourTimestamps[0] * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      // Calculate the average price and total volume for the interval
      const avgPrice =
        halfHourPrices.reduce((sum, price) => sum + price, 0) /
        halfHourPrices.length;
      const totalVolume = halfHourVolumes.reduce(
        (sum, volume) => sum + volume,
        0
      );

      aggregatedPrices.push(avgPrice);
      aggregatedVolumes.push(totalVolume);
    }

    console.log(timestamps, aggregatedPrices, aggregatedVolumes); // Log parsed data

    // Create the chart
    const ctx = document.getElementById("spyChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: timestamps,
        datasets: [
          {
            label: "SPY Half-Hourly Closing Price",
            data: aggregatedPrices,
            borderColor: "rgb(0, 140, 255)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
            yAxisID: "y",
          },
          {
            label: "SPY Half-Hourly Volume",
            data: aggregatedVolumes,
            borderColor: "rgb(255, 0, 55)",
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
              text: "Price in thousands (USD)",
            },
            ticks: {
              callback: function (value) {
                return `$${value.toFixed(1)}k`; // Format y-axis labels to thousands
              },
            },
          },
          y1: {
            type: "linear",
            position: "right",
            title: {
              display: true,
              text: "Volume",
            },
            ticks: {
              callback: function (value) {
                return `${(value / 100000).toFixed(1)}00k`; // Format y-axis labels to hundreds of thousands}`
              },
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
