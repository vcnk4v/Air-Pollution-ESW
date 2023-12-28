const channelID = "2298573"; // Replace with your ThingSpeak channel ID
const apiKey = "JU84CTXH51VEELMX"; // Replace with your ThingSpeak API key

let temperatureChart = null; // Initialize the chart variable
let humidityChart = null;
// let pm25chart = null;
// let pm10chart = null;
let combinedChart = null;

// Example: Update the PM gauge with a PM value (replace with actual PM data)

function fetchTemperatureDataAndDisplayChart(timesIST, temperatures) {
    const ctx = document.getElementById("temperatureChart").getContext("2d");
    if (temperatureChart === null) {
        // Create a new chart if it doesn't exist
        temperatureChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: timesIST,
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
                grid: {
                    display: false, // Hide the X-axis grid lines
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
        const filteredTemperatures = temperatures.filter(temp => temp > 15);
        
        const averageTemp = (filteredTemperatures.reduce((acc, val) => acc + val, 0) / temperatures.length).toFixed(2); 

        const temp = document.getElementById('avgtemp');
        temp.textContent = `Average value: ${averageTemp}`;

        const minTemp = Math.min(...filteredTemperatures);
        const maxTemp = Math.max(...filteredTemperatures);

        const ltemp = document.getElementById('lowtemp');
        ltemp.textContent = `Lowest value: ${minTemp}`;

        const htemp = document.getElementById('hightemp');
        htemp.textContent = `Highest value: ${maxTemp}`;
      } else {
        // If the chart already exists, update it
        temperatureChart.data.labels = timesIST;
        temperatureChart.data.datasets[0].data = temperatures;
        temperatureChart.update();

        const filteredTemperatures = temperatures.filter(temp => temp > 15);
        
        const averageTemp = (filteredTemperatures.reduce((acc, val) => acc + val, 0) / filteredTemperatures.length).toFixed(2); 

        const temp = document.getElementById('avgtemp');
        temp.textContent = `Average value: ${averageTemp}`;

        const minTemp = Math.min(...filteredTemperatures);
        const maxTemp = Math.max(...filteredTemperatures);

        const ltemp = document.getElementById('lowtemp');
        ltemp.textContent = `Lowest value: ${minTemp}`;

        const htemp = document.getElementById('hightemp');
        htemp.textContent = `Highest value: ${maxTemp}`;
      }    
  }

  function fetchHumidityDataAndDisplayChart(timesIST, humidities) {
    const ctx2 = document.getElementById("humidityChart").getContext("2d");

    if (humidityChart === null) {
        // Create a new chart if it doesn't exist
        humidityChart = new Chart(ctx2, {
          type: "line",
          data: {
            labels: timesIST,
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
                grid: {
                    display: false, // Hide the X-axis grid lines
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

        const fh = humidities.filter(temp => temp > 15);

        const averageHum = (fh.reduce((acc, val) => acc + val, 0) / fh.length).toFixed(2);

        const hum = document.getElementById('avghum');
        hum.textContent = `Average value: ${averageHum}`;

        const minHum = Math.min(...fh);
        const maxHum = Math.max(...fh);

        const lhum = document.getElementById('lowhum');
        lhum.textContent = `Lowest value: ${minHum}`;

        const hhum = document.getElementById('highhum');
        hhum.textContent = `Highest value: ${maxHum}`;
      } else {
        // If the chart already exists, update it
        humidityChart.data.labels = timesIST;
        humidityChart.data.datasets[0].data = humidities;
        humidityChart.update();

        const fh = humidities.filter(temp => temp > 15);

        const averageHum = (fh.reduce((acc, val) => acc + val, 0) / fh.length).toFixed(2);

        const hum = document.getElementById('avghum');
        hum.textContent = `Average value: ${averageHum}`;

        const minHum = Math.min(...fh);
        const maxHum = Math.max(...fh);

        const lhum = document.getElementById('lowhum');
        lhum.textContent = `Lowest value: ${minHum}`;

        const hhum = document.getElementById('highhum');
        hhum.textContent = `Highest value: ${maxHum}`;
      }
  }

  function fetchPMDataAndDisplayChart(timesIST, pm25, pm10) {
    const ctx3 = document.getElementById("combinedChart").getContext("2d");

    if (combinedChart === null) {
        // Create a new chart if it doesn't exist
        combinedChart = new Chart(ctx3, {
          type: "line",
          data: {
            labels: timesIST,
            datasets: [
                {
                    label: "PM2.5",
                    data: pm25,
                    borderColor: "rgba(192, 75, 192, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
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
                grid: {
                  display: false, // Hide the X-axis grid lines
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "PM Level",
                },
                beginAtZero: true,
              },
            },
          },
        });

        // Find min and max values for PM2.5 and PM10
        const minPM25 = Math.min(...pm25);
        const maxPM25 = Math.max(...pm25);
        const minPM10 = Math.min(...pm10);
        const maxPM10 = Math.max(...pm10);

        const b10 = document.getElementById('best10');
        b10.textContent = `Best Value: ${minPM10}`;

        const b25 = document.getElementById('best25');
        b25.textContent = `Best Value: ${minPM25}`;

        const w10 = document.getElementById('worst10');
        w10.textContent = `Worst Value: ${maxPM10}`;

        const w25 = document.getElementById('worst25');
        w25.textContent = `Worst Value: ${maxPM25}`;

        const averagePM25 = (pm25.reduce((acc, val) => acc + val, 0) / pm25.length).toFixed(2);
        const averagePM10 = (pm10.reduce((acc, val) => acc + val, 0) / pm10.length).toFixed(2);

        const a25 = document.getElementById('avg25');
        a25.textContent = `Average value of PM2.5: ${averagePM25}`;

        const a10 = document.getElementById('avg10');
        a10.textContent = `Average value of PM10: ${averagePM10}`;
      } else {
        // If the chart already exists, update it
        combinedChart.data.labels = timesIST;
        combinedChart.data.datasets[1].data = pm10;
        combinedChart.data.datasets[0].data = pm25;
        combinedChart.update();

        // Find min and max values for PM2.5 and PM10
        const minPM25 = Math.min(...pm25);
        const maxPM25 = Math.max(...pm25);
        const minPM10 = Math.min(...pm10);
        const maxPM10 = Math.max(...pm10);

        const b10 = document.getElementById('best10');
        b10.textContent = `Best Value: ${minPM10}`;

        const b25 = document.getElementById('best25');
        b25.textContent = `Best Value: ${minPM25}`;

        const w10 = document.getElementById('worst10');
        w10.textContent = `Worst Value: ${maxPM10}`;

        const w25 = document.getElementById('worst25');
        w25.textContent = `Worst Value: ${maxPM25}`;

        const averagePM25 = (pm25.reduce((acc, val) => acc + val, 0) / pm25.length).toFixed(2);
        const averagePM10 = (pm10.reduce((acc, val) => acc + val, 0) / pm10.length).toFixed(2);

        const a25 = document.getElementById('avg25');
        a25.textContent = `Average value of PM2.5: ${averagePM25}`;

        const a10 = document.getElementById('avg10');
        a10.textContent = `Average value of PM10: ${averagePM10}`;
      }
  }
  

function fetchDataAndDisplayChart(selectedRange, dataType) {
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
      const timestamps_orig = [];
      const temperatures_orig = [];
      const humidities_orig = [];
      const pm25_orig = [];
      const pm10_orig = [];
      //   console.log(entries);
      for (const entry of entries) {
        timestamps_orig.push(entry.created_at);
        temperatures_orig.push(parseFloat(entry.field4));
        humidities_orig.push(parseFloat(entry.field3));
        pm10_orig.push(parseFloat(entry.field2));
        pm25_orig.push(parseFloat(entry.field1));
      }

      const timesIST_orig = timestamps_orig.map(timestamp => {
        const date = new Date(timestamp);
        date.setTime(date.getTime() + (5.5 * 60 * 60 * 1000)); // Adding 5.5 hours for IST
        const timeString = date.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
        return timeString; // Array containing only the time part in IST
      });

    // const timesIST_orig = timestamps_orig.map(timestamp => {
    //     const date = new Date(timestamp);
    //     date.setTime(date.getTime() + (5.5 * 60 * 60 * 1000)); // Adding 5.5 hours for IST
      
    //     const options = {
    //       year: 'numeric',
    //       month: 'numeric',
    //       day: 'numeric',
    //       hour: 'numeric',
    //       minute: 'numeric',
    //       second: 'numeric',
    //       timeZone: 'Asia/Kolkata'
    //     };
      
    //     return date.toLocaleString('en-US', options); // Array containing date and time in IST
    //   });

    //   console.log(timesIST);

    const nth = 125;

    const timesIST = timesIST_orig.filter((time, index) => index % nth === 0);
    const temperatures = temperatures_orig.filter((temp, index) => index % nth === 0);
    const humidities = humidities_orig.filter((humidity, index) => index % nth === 0);
    const pm25 = pm25_orig.filter((p25, index) => index % nth === 0);
    const pm10 = pm10_orig.filter((p10, index) => index % nth === 0);

    if(dataType === 'temperature')
    {
        fetchTemperatureDataAndDisplayChart(timesIST, temperatures);
    }
    if(dataType === 'humidity')
    {
        fetchHumidityDataAndDisplayChart(timesIST, humidities);
    }
    if(dataType === 'pm')
    {
        fetchPMDataAndDisplayChart(timesIST, pm25, pm10);
    }
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Fetch and display data initially
// Fetch data for the past day when the page loads (default)
fetchDataAndDisplayChart("day","temperature");
fetchDataAndDisplayChart("day","humidity");
fetchDataAndDisplayChart("day","pm");

document.querySelector("#lastDayButtonPM").addEventListener("click", () => {
    fetchDataAndDisplayChart("day","pm");
  });

// Example: Fetch data for the past week when the user selects the "Last Week" button
document.querySelector("#lastWeekButtonPM").addEventListener("click", () => {
  fetchDataAndDisplayChart("week","pm");
});

// Example: Fetch data for the past month when the user selects the "Last Month" button
document.querySelector("#lastMonthButtonPM").addEventListener("click", () => {
  fetchDataAndDisplayChart("month","pm");
});

document.querySelector("#lastDayButtonH").addEventListener("click", () => {
    fetchDataAndDisplayChart("day","humidity");
  });

// Example: Fetch data for the past week when the user selects the "Last Week" button
document.querySelector("#lastWeekButtonH").addEventListener("click", () => {
  fetchDataAndDisplayChart("week","humidity");
});

// Example: Fetch data for the past month when the user selects the "Last Month" button
document.querySelector("#lastMonthButtonH").addEventListener("click", () => {
  fetchDataAndDisplayChart("month","humidity");
});

document.querySelector("#lastDayButtonT").addEventListener("click", () => {
    fetchDataAndDisplayChart("day","temperature");
  });

// Example: Fetch data for the past week when the user selects the "Last Week" button
document.querySelector("#lastWeekButtonT").addEventListener("click", () => {
  fetchDataAndDisplayChart("week","temperature");
});

// Example: Fetch data for the past month when the user selects the "Last Month" button
document.querySelector("#lastMonthButtonT").addEventListener("click", () => {
  fetchDataAndDisplayChart("month","temperature");
});


// Fetch and display data every 5 seconds (adjust the interval as needed)
// setInterval(fetchDataAndDisplayChart, 5000); // 5000 milliseconds = 5 seconds

function fetchLatestData1() {

  function fetchDataForField1(elementId, fieldName) {
      const apiUrl = `https://api.thingspeak.com/channels/${channelID}/fields/1/last.json?api_key=${apiKey}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const latestValue = data.field1;
          latestValue25 = (1.0256618336813879* latestValue + 11.048211689089669).toFixed(2);
          document.getElementById(elementId).textContent = `PM2.5 Reading: ${latestValue25}`;
        })
        .catch((error) => {
          console.error(`Error fetching ${fieldName} data:`, error);
          document.getElementById(elementId).textContent = `Failed to fetch ${fieldName} data`;
        });
    }

    function fetchDataForField2(elementId, fieldName) {
      const apiUrl = `https://api.thingspeak.com/channels/${channelID}/fields/2/last.json?api_key=${apiKey}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const latestValue = data.field2;
          latestValue10 = (1.9935275505072367*latestValue + 13.568800635884315).toFixed(2);
          document.getElementById(elementId).textContent = `PM10 Reading: ${latestValue10}`;
        })
        .catch((error) => {
          console.error(`Error fetching ${fieldName} data:`, error);
          document.getElementById(elementId).textContent = `Failed to fetch ${fieldName} data`;
        });
    }

    function fetchDataForField3(elementId, fieldName) {
      const apiUrl = `https://api.thingspeak.com/channels/${channelID}/fields/3/last.json?api_key=${apiKey}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const latestValue = data.field3;
          document.getElementById(elementId).textContent = `Humidity Reading: ${latestValue}`;
        })
        .catch((error) => {
          console.error(`Error fetching ${fieldName} data:`, error);
          document.getElementById(elementId).textContent = `Failed to fetch ${fieldName} data`;
        });
    }

    function fetchDataForField4(elementId, fieldName) {
      const apiUrl = `https://api.thingspeak.com/channels/${channelID}/fields/4/last.json?api_key=${apiKey}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const latestValue = data.field4;
          document.getElementById(elementId).textContent = `Temperature Reading: ${latestValue}`;
        })
        .catch((error) => {
          console.error(`Error fetching ${fieldName} data:`, error);
          document.getElementById(elementId).textContent = `Failed to fetch ${fieldName} data`;
        });
    }
  fetchDataForField1('latest25', 'PM 2.5');
  fetchDataForField2('latest10', 'PM 10');
  fetchDataForField3('latesthum', 'Humidity');
  fetchDataForField4('latesttemp', 'Temperature');
}

setInterval(fetchLatestData1, 5000);
