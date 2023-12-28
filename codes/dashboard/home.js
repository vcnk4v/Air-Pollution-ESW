document.addEventListener("DOMContentLoaded", function() {
    const text = `Welcome to our Air Pollution Monitoring Dashboard, your go-to resource for real-time and historical data on air quality in your area.
  Our mission is to empower you with the knowledge you need to make informed decisions about your daily activities, health, and well-being.
  Air quality affects us all, and our interactive dashboard provides up-to-the-minute Air Quality Index (AQI) readings, pollutant concentrations, and visualizations that help you understand the state of the air in your region.
  Whether you're concerned about outdoor exercise, planning a commute, or simply curious about the air you breathe, our user-friendly platform delivers the information you need.
  Explore our maps, charts, and resources, and stay connected to the latest updates and alerts.
  We're dedicated to fostering a cleaner and healthier environment, one informed choice at a time.`;
    
    const typingText = document.getElementById("typing-text");
    const lines = text.split('\n');
    let lineIndex = 0;
    let charIndex = 0;
  
    function typeLine() {
      if (lineIndex < lines.length) {
        if (charIndex < lines[lineIndex].length) {
          typingText.innerHTML += lines[lineIndex].charAt(charIndex);
          charIndex++;
          setTimeout(typeLine, 15); // Adjust the typing speed here (smaller value for faster typing)
        } else {
          typingText.innerHTML += '<br>'; // Move to the next line
          charIndex = 0;
          lineIndex++;
          setTimeout(typeLine, 500); // Delay after completing a line
        }
      }
    }
  
    typeLine();
  });

  const scrollButton = document.getElementById('scrollButton');

  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  });

  // JavaScript for displaying date and time
function updateDateTime() {
  const dateTimeElements = document.querySelectorAll('.currentDateTime');
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const dateTimeString = now.toLocaleDateString('en-US', options);

  dateTimeElements.forEach(element => {
    element.textContent = dateTimeString;
  });
}

// Update time every second (optional)
setInterval(updateDateTime, 1000);

// Initial call to display date and time
updateDateTime();

// Function to update image and value based on air quality
function updateAirQuality(quality) {
  const airQualityImage = document.getElementById('airQualityImage');
  const airQualityValue = document.getElementById('airQualityValue');

  airQualityValue.textContent = quality;

  // Change the image source based on the air quality value
  if (quality === 'Good') {
    airQualityImage.src = 'green.png';
  } else if (quality === 'Moderate') {
    airQualityImage.src = 'yellow.png';
  } else if (quality === 'Poor') {
    airQualityImage.src = 'red.png';
  } else {
    airQualityImage.src = 'default.png'; // Default image if value is not recognized
  }
}

function updateAirQuality1(quality) {
  const airQualityImage1 = document.getElementById('airQualityImage1');
  const airQualityValue1 = document.getElementById('airQualityValue1');

  airQualityValue1.textContent = quality;

  if (quality === 'Good') {
    airQualityImage1.src = 'green.png';
  } else if (quality === 'Moderate') {
    airQualityImage1.src = 'yellow.png';
  } else if (quality === 'Poor') {
    airQualityImage1.src = 'red.png';
  } else {
    airQualityImage1.src = 'default.png'; // Default image if value is not recognized
  }
}

// Example usage:
// Call this function with the value you want to display
// updateAirQuality('Good','Poor'); // Change 'Good' to any value you want to display

let latestValue10;
let latestValue25;
let latestValue10out;
let latestValue25out;

const channelID = "2261084"; 
const apiKey = "IWI6WSPHJ6GZ72NP";

function calculateAQIout(latestValue25, latestValue10) {
  const AQI25_high = 300;
  const AQI25_low = 20;
  const PM25_high = 120;
  const PM25_low = 15;

  const PM10_high = 350;
  const PM10_low = 30;
      
  const aqi25 = (((AQI25_high - AQI25_low) / (PM25_high - PM25_low)) * (latestValue25 - PM25_low) + AQI25_low);
  const aqi10 = (((AQI25_high - AQI25_low) / (PM10_high - PM10_low)) * (latestValue10 - PM10_low) + AQI25_low);

  aqi =  Math.max(aqi25, aqi10).toFixed(2);

  document.getElementById("aqioutdoor").textContent = `Air Quality Index Value (AQI): ${aqi}`;

  if (aqi >= 0 && aqi <= 100) {
    updateAirQuality1("Good");
  } else if (aqi > 100 && aqi <= 200) {
    updateAirQuality1("Moderate");
  } else {
    // Handle other AQI ranges accordingly
    updateAirQuality1("Poor");
  }
}

function calculateAQI(latestValue25, latestValue10) {
  const AQI25_high = 300;
  const AQI25_low = 20;
  const PM25_high = 120;
  const PM25_low = 15;

  const PM10_high = 350;
  const PM10_low = 30;
      
  const aqi25 = ((AQI25_high - AQI25_low) / (PM25_high - PM25_low)) * (latestValue25 - PM25_low) + AQI25_low;
  const aqi10 = ((AQI25_high - AQI25_low) / (PM10_high - PM10_low)) * (latestValue10 - PM10_low) + AQI25_low;

  aqi =  Math.max(aqi25, aqi10).toFixed(2);

  document.getElementById("aqiindoor").textContent = `Air Quality Index Value (AQI): ${aqi}`;

  if (aqi >= 0 && aqi <= 100) {
    updateAirQuality("Good");
  } else if (aqi > 100 && aqi <= 200) {
    updateAirQuality("Moderate");
  } else {
    // Handle other AQI ranges accordingly
    updateAirQuality("Poor");
  }
}

function fetchLatestData() {

  function fetchDataForField1(elementId, fieldName) {
      const apiUrl = `https://api.thingspeak.com/channels/${channelID}/fields/1/last.json?api_key=${apiKey}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const latestValue = data.field1;
          latestValue25 = (1.0256618336813879* latestValue + 11.048211689089669).toFixed(2);
          document.getElementById(elementId).textContent = `Current PM2.5 Reading: ${latestValue25}`;
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
          document.getElementById(elementId).textContent = `Current PM10 Reading: ${latestValue10}`;
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
          document.getElementById(elementId).textContent = `Current Humidity Reading: ${latestValue}`;
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
          document.getElementById(elementId).textContent = `Current Temperature Reading: ${latestValue}`;
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
  calculateAQI(latestValue25,latestValue10);
}

setInterval(fetchLatestData, 5000);

const channelID1 = "2298573"; 
const apiKey1 = "JU84CTXH51VEELMX";

function fetchLatestData1() {

  function fetchDataForField1(elementId, fieldName) {
      const apiUrl = `https://api.thingspeak.com/channels/${channelID1}/fields/1/last.json?api_key=${apiKey1}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const latestValue = data.field1;
          latestValue25out = (1.0256618336813879* latestValue + 11.048211689089669).toFixed(2);
          document.getElementById(elementId).textContent = `Current PM2.5 Reading: ${latestValue25out}`;
        })
        .catch((error) => {
          console.error(`Error fetching ${fieldName} data:`, error);
          document.getElementById(elementId).textContent = `Failed to fetch ${fieldName} data`;
        });
    }

    function fetchDataForField2(elementId, fieldName) {
      const apiUrl = `https://api.thingspeak.com/channels/${channelID1}/fields/2/last.json?api_key=${apiKey1}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const latestValue = data.field2;
          latestValue10out = (1.9935275505072367*latestValue + 13.568800635884315).toFixed(2);
          document.getElementById(elementId).textContent = `Current PM10 Reading: ${latestValue10out}`;
        })
        .catch((error) => {
          console.error(`Error fetching ${fieldName} data:`, error);
          document.getElementById(elementId).textContent = `Failed to fetch ${fieldName} data`;
        });
    }

    function fetchDataForField3(elementId, fieldName) {
      const apiUrl = `https://api.thingspeak.com/channels/${channelID1}/fields/3/last.json?api_key=${apiKey1}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const latestValue = data.field3;
          document.getElementById(elementId).textContent = `Current Humidity Reading: ${latestValue}`;
        })
        .catch((error) => {
          console.error(`Error fetching ${fieldName} data:`, error);
          document.getElementById(elementId).textContent = `Failed to fetch ${fieldName} data`;
        });
    }

    function fetchDataForField4(elementId, fieldName) {
      const apiUrl = `https://api.thingspeak.com/channels/${channelID1}/fields/4/last.json?api_key=${apiKey1}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const latestValue = data.field4;
          document.getElementById(elementId).textContent = `Current Temperature Reading: ${latestValue}`;
        })
        .catch((error) => {
          console.error(`Error fetching ${fieldName} data:`, error);
          document.getElementById(elementId).textContent = `Failed to fetch ${fieldName} data`;
        });
    }
  fetchDataForField1('latest251', 'PM 2.5');
  fetchDataForField2('latest101', 'PM 10');
  fetchDataForField3('latesthum1', 'Humidity');
  fetchDataForField4('latesttemp1', 'Temperature');
  calculateAQIout(latestValue25out,latestValue10out);
}

setInterval(fetchLatestData1, 5000);

let aqiChart = null;
let aqiChartout = null;

function calculateAQIArrays(pm25Array, pm10Array) {
  const AQI25_high = 300;
  const AQI25_low = 20;
  const PM25_high = 120;
  const PM25_low = 15;

  const AQI10_high = 300;
  const AQI10_low = 20;
  const PM10_high = 150;
  const PM10_low = 50;

  const aqiValues = [];

  for (let i = 0; i < pm25Array.length && i < pm10Array.length; i++) {
    const aqi25 = ((AQI25_high - AQI25_low) / (PM25_high - PM25_low)) * (pm25Array[i] - PM25_low) + AQI25_low;
    const aqi10 = ((AQI10_high - AQI10_low) / (PM10_high - PM10_low)) * (pm10Array[i] - PM10_low) + AQI10_low;

    const aqi = Math.max(aqi25, aqi10);
    aqiValues.push(aqi);
  }

  return aqiValues;
}

function plotAQIGraphin(timesIST, aqiValues) {
  // Assuming you have a canvas element with id "aqiChart" for plotting
const ctx1 = document.getElementById("aqiChartindoor").getContext("2d");

if(aqiChart === null)
{
  aqiChart = new Chart(ctx1, {
    type: "line",
    data: {
      labels: timesIST, // Generating labels 1, 2, 3, ...
      datasets: [
        {
          label: "AQI",
          data: aqiValues,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          pointBackgroundColor: aqiValues.map(value => value > 300 ? 'red' : 'rgba(75, 192, 192, 1)'),
          fill: 'start',
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Index",
          },
          grid: {
            display: false,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "AQI",
          },
          beginAtZero: true,
        },
      },
    },
  });
}
else
{
  aqiChart.data.labels = timesIST;
  aqiChart.data.datasets[0].data = aqiValues;
  aqiChart.data.datasets[0].pointBackgroundColor = aqiValues.map(value => value > 300 ? 'red' : 'rgba(75, 192, 192, 1)');
  aqiChart.update();
}
}

function plotAQIGraphout(timesIST, aqiValues) {
  // Assuming you have a canvas element with id "aqiChart" for plotting
  const ctx2 = document.getElementById("aqiChartoutdoor").getContext("2d");

if(aqiChartout === null)
{
    aqiChartout = new Chart(ctx2, {
    type: "line",
    data: {
      labels: timesIST, // Generating labels 1, 2, 3, ...
      datasets: [
        {
          label: "AQI",
          data: aqiValues,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          pointBackgroundColor: aqiValues.map(value => value > 300 ? 'red' : 'rgba(75, 192, 192, 1)'),
          borderWidth: 2,
          fill: 'start',
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Index",
          },
          grid: {
            display: false,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "AQI",
          },
          beginAtZero: true,
        },
      },
    },
  });
}
else
{
  aqiChartout.data.labels = timesIST;
  aqiChartout.data.datasets[0].data = aqiValues;
  aqiChartout.data.datasets[0].pointBackgroundColor = aqiValues.map(value => value > 300 ? 'red' : 'rgba(75, 192, 192, 1)');
  aqiChartout.update();
}
}


function fetchDataAndDisplayChart(selectedRange, location) {
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

  let url;

  if(location === 'in')
  {
    url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&start=${formattedStartDate}`;
  }
  else if(location === 'out')
  {
    url = `https://api.thingspeak.com/channels/${channelID1}/feeds.json?api_key=${apiKey1}&start=${formattedStartDate}`
  }

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
      const pm25_orig = [];
      const pm10_orig = [];
      //   console.log(entries);
      for (const entry of entries) {
        timestamps_orig.push(entry.created_at);
        pm10_orig.push(parseFloat(entry.field2));
        pm25_orig.push(parseFloat(entry.field1));
      }

      const timesIST_orig = timestamps_orig.map(timestamp => {
        const date = new Date(timestamp);
        date.setTime(date.getTime() + (5.5 * 60 * 60 * 1000)); // Adding 5.5 hours for IST
        const timeString = date.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
        return timeString; // Array containing only the time part in IST
      });
    const nth = 125;

    const timesIST = timesIST_orig.filter((time, index) => index % nth === 0);
    const pm25 = pm25_orig.filter((p25, index) => index % nth === 0);
    const pm10 = pm10_orig.filter((p10, index) => index % nth === 0);

    const aqivalues = calculateAQIArrays(pm25,pm10);
    if (location === 'in')
    {
      plotAQIGraphin(timesIST,aqivalues);
    }
    else if (location === 'out')
    {
      plotAQIGraphout(timesIST,aqivalues);
    }    
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
fetchDataAndDisplayChart("day","in");
fetchDataAndDisplayChart("day","out");

document.querySelector("#dateRangeDropdownPM").addEventListener("change", (event) => {
  const selectedRange = event.target.value;
  fetchDataAndDisplayChart(selectedRange, "in");
});

document.querySelector("#dateRangeDropdownPMOut").addEventListener("change", (event) => {
  const selectedRange = event.target.value; 
  fetchDataAndDisplayChart(selectedRange, "out");
});

