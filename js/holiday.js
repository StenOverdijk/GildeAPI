document.addEventListener('DOMContentLoaded', function () {

    console.log('holiday.js - in content loaded event');

    // fetchNearestStations(51.19417, 5.9875);
    // fetchNSDisruptions();
    // fetchPublicHolidays(countryCode, year); 
  
    // const countryCode = '+31'; 
    // const year = 2024;

    const refreshInterval = 2 * 60 * 1000;
  
    getPublicHolidays();

    setInterval(function () {
      // fetchNearestStations(51.19417, 5.9875);
      // fetchNSDisruptions();
      // fetchPublicHolidays(countryCode, year);
      getPublicHolidays()
    }, refreshInterval);
  });

  
function getPublicHolidays() {

  console.log('getting public holidays...')

  const countryCode = encodeURIComponent("+31");
  const year = 2024;

  const apiUrl = `https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => displayHolidays(data))
      .catch(error => console.error('Error fetching data:', error));
}

function displayHolidays(holidays) {

  console.log('displaying public holidays...')

  // const holidaysListEl(ement)
  const holidaysList = document.getElementById('holidaysList');

  if (holidays && holidays.length > 0) {
    const listItems = holidays.map(holiday => {
      return `<p style="font-size: 14px;">${holiday.name}, <br> ${holiday.date}</p>`;
      // Adjust font-size and color values according to your preferences
    });

    holidaysList.innerHTML = `<ul>${listItems.join('')}</ul>`;
  } else {
    holidaysList.innerHTML = '<p style="font-size: 16px; color: #333;">No holidays data available.</p>';
    // Adjust font-size and color values according to your preferences
  }
}

// Call the function to fetch and display holidays on page load
// getPublicHolidays();