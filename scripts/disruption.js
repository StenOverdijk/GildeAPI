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
  
  async function fetchNSDisruptions() {
    const disruptionsList = document.getElementById('disruptions-list');
  
    try {
      const response = await fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/disruptions?isActive=true', {
        method: 'GET',
        headers: {
          'Accept-language': 'default',
          'Cache-Control': 'no-cache',
          'Ocp-Apim-Subscription-Key': 'b5e309223ff14a31aa1d18321812af71',
          'type': 'true',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const data = await response.json();
      displayDisruptions(data);
    } catch (error) {
      console.error('Error fetching disruptions:', error);
    }
  }
  
  
  
  function displayDisruptions(disruptions) {
    const disruptionsList = document.getElementById('disruptions-list');
    disruptionsList.innerHTML = '';
  
    disruptions.forEach(disruption => {
      const listItem = document.createElement('li');
  
      if (disruption.title && disruption.timespans && disruption.timespans.length > 0) {
        const startTime = disruption.timespans[0].start;
        const endTime = disruption.timespans[0].end;
        listItem.innerHTML = `<strong>${disruption.title}</strong><br>Start: ${startTime}, End: ${endTime}`;
      } else {
        listItem.textContent = 'Unknown disruption';
      }
  
      disruptionsList.appendChild(listItem);
    });
  }