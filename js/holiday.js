document.addEventListener('DOMContentLoaded', function () {
    fetchNearestStations(51.19417, 5.9875);
    fetchNSDisruptions();
    fetchPublicHolidays(countryCode, year); 
  
    const countryCode = '+31'; 
    const year = 2024;
    const refreshInterval = 5 * 60 * 1000;
  
    setInterval(function () {
      fetchNearestStations(51.19417, 5.9875);
      fetchNSDisruptions();
      fetchPublicHolidays(countryCode, year); 
    }, refreshInterval);
  });

  
function getPublicHolidays() {
  const country_code = encodeURIComponent("+31");
  const year = 2024;


  const apiUrl = `https://date.nager.at/api/v3/NextPublicHolidays/%2B31`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => displayHolidays(data))
      .catch(error => console.error('Error fetching data:', error));
}

function displayHolidays(holidays) {
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
getPublicHolidays();