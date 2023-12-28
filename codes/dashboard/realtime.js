const channelID = "2261084"; // Replace with your ThingSpeak channel ID
const apiKey = "IWI6WSPHJ6GZ72NP"; // Replace with your ThingSpeak API key


function fetchLatestData() {

    function fetchDataForField1(elementId, fieldName) {
        const apiUrl = `https://api.thingspeak.com/channels/${channelID}/fields/1/last.json?api_key=${apiKey}`;
    
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const latestValue = data.field1;
            document.getElementById(elementId).textContent = `Latest ${fieldName}: ${latestValue}`;
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
            document.getElementById(elementId).textContent = `Latest ${fieldName}: ${latestValue}`;
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
            document.getElementById(elementId).textContent = `Latest ${fieldName}: ${latestValue}`;
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
            document.getElementById(elementId).textContent = `Latest ${fieldName}: ${latestValue}`;
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
  
  // window.addEventListener('load', fetchLatestData);
  setInterval(fetchLatestData, 5000);


  // Get the progress bar element
  // const progressBar = document.querySelector('[role="progressbar"]');

  // // Update the --value CSS variable with the random value
  // function updateProgressBar() {
  //   const pm25 = document.getElementById('latest25');
  //   console.log(pm25);
  //   progressBar.style.setProperty('--value', pm25);
  // }

  // // Initial update
  // updateProgressBar();


  // setInterval(updateProgressBar, 5000); 