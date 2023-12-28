const channelID = "2261084"; // Replace with your ThingSpeak channel ID
const apiKey = "IWI6WSPHJ6GZ72NP"; // Replace with your ThingSpeak API key

let temperatureChart = null; // Initialize the chart variable
let humidityChart = null;
let pm25chart = null;
let pm10chart = null;

// Example: Update the PM gauge with a PM value (replace with actual PM data)

function fetchDataAndDisplayChart(selectedRange) {
  const currentTime = new Date();
  let startDate;

  switch (selectedRange) {
    case "week":
      startDate = new Date(currentTime.getTime() - 7 * 24 * 60 * 60 * 1000); // One week ago
      break;
    case "month":
      startDate = new Date(currentTime.getTime() - 30 * 24 * 60 * 60 * 1000); // One month ago
      break;
    case "day":
    default:
      startDate = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); // One day ago
      break;
  }

  // Format the start date in the required ThingSpeak format (yyyy-mm-ddTHH:MM:SSZ)
  const formattedStartDate = startDate.toISOString().slice(0, 19) + "Z";

  const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&start=${formattedStartDate}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const entries = data.feeds;

      console.log(entries);
      const timestamps = [];
      const temperatures = [];
      const humidities = [];
      const pm25 = [];
      const pm10 = [];
      //   console.log(entries);
      for (const entry of entries) {
        timestamps.push(entry.created_at);
        temperatures.push(parseFloat(entry.field4));
        humidities.push(parseFloat(entry.field3));
        pm10.push(parseFloat(entry.field2));
        pm25.push(parseFloat(entry.field1));
      }

      const ctx = document.getElementById("temperatureChart").getContext("2d");
      const ctx2 = document.getElementById("humidityChart").getContext("2d");
      const ctx3 = document.getElementById("pm25chart").getContext("2d");
      const ctx4 = document.getElementById("pm10chart").getContext("2d");
      if (temperatureChart === null) {
        // Create a new chart if it doesn't exist
        temperatureChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: timestamps,
            datasets: [
              {
                label: "Temperature (°C)",
                data: temperatures,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Timestamp",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Temperature (°C)",
                },
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        // If the chart already exists, update it
        temperatureChart.data.labels = timestamps;
        temperatureChart.data.datasets[0].data = temperatures;
        temperatureChart.update();
      }

      if (humidityChart === null) {
        // Create a new chart if it doesn't exist
        humidityChart = new Chart(ctx2, {
          type: "line",
          data: {
            labels: timestamps,
            datasets: [
              {
                label: "Humidity (%)",
                data: humidities,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Timestamp",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Humidity (%)",
                },
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        // If the chart already exists, update it
        humidityChart.data.labels = timestamps;
        humidityChart.data.datasets[0].data = humidities;
        humidityChart.update();
      }

      if (pm10chart === null) {
        // Create a new chart if it doesn't exist
        pm10chart = new Chart(ctx4, {
          type: "line",
          data: {
            labels: timestamps,
            datasets: [
              {
                label: "PM10",
                data: pm10,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Timestamp",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "PM10",
                },
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        // If the chart already exists, update it
        pm10chart.data.labels = timestamps;
        pm10chart.data.datasets[0].data = pm10;
        pm10chart.update();
      }

      if (pm25chart === null) {
        // Create a new chart if it doesn't exist
        pm25chart = new Chart(ctx3, {
          type: "line",
          data: {
            labels: timestamps,
            datasets: [
              {
                label: "PM2.5",
                data: pm25,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Timestamp",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "PM2.5",
                },
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        // If the chart already exists, update it
        pm25chart.data.labels = timestamps;
        pm25chart.data.datasets[0].data = pm25;
        pm25chart.update();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Fetch and display data initially
// Fetch data for the past day when the page loads (default)
fetchDataAndDisplayChart("day");

// Example: Fetch data for the past week when the user selects the "Last Week" button
document.querySelector("#lastWeekButton").addEventListener("click", () => {
  fetchDataAndDisplayChart("week");
});

// Example: Fetch data for the past month when the user selects the "Last Month" button
document.querySelector("#lastMonthButton").addEventListener("click", () => {
  fetchDataAndDisplayChart("month");
});


// Fetch and display data every 5 seconds (adjust the interval as needed)
// setInterval(fetchDataAndDisplayChart, 5000); // 5000 milliseconds = 5 seconds
