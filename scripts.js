
var currentSlide = 1;

// Function to hide all slides
function hideAllSlides() {
  for (var i = 1; i <= 4; i++) {
    var slide = document.getElementById("slide" + i);
    slide.style.display = "none";
  }
}

// Function to show the current slide
function showCurrentSlide() {
  var slide = document.getElementById("slide" + currentSlide);
  slide.style.display = "block";
}

// Function to cycle through slides
function cycleSlides() {
  hideAllSlides();

  // Move to the next slide (1 -> 2 -> 3 -> 1)
  currentSlide = (currentSlide % 4) + 1;

  showCurrentSlide();
}

// Call the cycleSlides function every 5 seconds
setInterval(cycleSlides, 5000);

// Initially show the first slide
showCurrentSlide();

// async function fetchNSDisruptions(lat, lng) {
//   const disruptionsList = document.getElementById('disruptions-list');

//   try {
//     await fetchNearestStations(lat, lng);

//     const response = await fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/disruptions?isActive=true', {
//       method: 'GET',
//       headers: {
//         'Accept-language': 'default',
//         'Cache-Control': 'no-cache',
//         'Ocp-Apim-Subscription-Key': 'b5e309223ff14a31aa1d18321812af71',
//         'type': 'true',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.status}`);
//     }

//     const data = await response.json();

//     const disruptionsWithin25Km = data.filter(disruption => {
//       const disruptionCoords = {
//         lat: disruption.location ? disruption.location.latitude : null,
//         lng: disruption.location ? disruption.location.longitude : null
//       };

//       if (disruptionCoords.lat && disruptionCoords.lng) {
//         const distance = calculateDistance(lat, lng, disruptionCoords.lat, disruptionCoords.lng);
//         return distance <= 25;
//       } else {
//         return false;
//       }
//     });

//     const testError = {
//       title: 'Test Error',
//       timespans: [{ start: '2023-01-01T00:00:00Z', end: '2023-01-01T12:00:00Z' }],
//       location: { latitude: lat + 0.01, longitude: lng + 0.01 }
//     };

//     disruptionsWithin25Km.push(testError);

//     displayDisruptions(disruptionsWithin25Km);
//   } catch (error) {
//     console.error('Error fetching disruptions:', error);
//   }
// }

// async function fetchNearestStations(lat, lng) {
//   const nearestStationsForm = document.getElementById('nearest-stations-form');

//   try {
//     const response = await fetch(`http://localhost:3000/nearest-stations/${lat}/${lng}?limit=5`);
//     const data = await response.json();

//     nearestStationsForm.innerHTML = '<h2>Nearest Stations</h2>';

//     if (data && data.payload && data.payload.length > 0) {
//       const ul = document.createElement('ul');
//       data.payload.forEach(station => {
//         const li = document.createElement('li');
//         li.textContent = `Stationsnaam: ${station.namen.lang}`; //Code: ${station.code}, Type: ${station.stationType}
//         ul.appendChild(li);
//       });
//       nearestStationsForm.appendChild(ul);
//     } else {
//       nearestStationsForm.innerHTML += '<p>No stations found nearby.</p>';
//     }
//   } catch (error) {
//     console.error('Error fetching nearest stations:', error.message);
//     nearestStationsForm.innerHTML = '<p>Error fetching nearest stations. Please try again later.</p>';
//   }
// }

// function calculateDistance(lat1, lng1, lat2, lng2) {
//   const R = 6371;
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLng = (lng2 - lng1) * Math.PI / 180;
//   const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//     Math.sin(dLng / 2) * Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c;
//   return distance;
// }

// function displayDisruptions(disruptions) {
//   const disruptionsList = document.getElementById('disruptions-list');
//   disruptionsList.innerHTML = '';

//   disruptions.forEach(disruption => {
//     const listItem = document.createElement('li');

//     if (disruption.title && disruption.timespans && disruption.timespans.length > 0) {
//       const startTime = disruption.timespans[0].start;
//       const endTime = disruption.timespans[0].end;
//       listItem.innerHTML = `<strong>${disruption.title}</strong><br>Start: ${startTime}, End: ${endTime}`;
//     } else {
//       listItem.textContent = 'Unknown disruption';
//     }

//     disruptionsList.appendChild(listItem);
//   });
// }

// document.addEventListener('DOMContentLoaded', function () {
//   const roermondCoords = { lat: 51.19417, lng: 5.9875 };
//   fetchNSDisruptions(roermondCoords.lat, roermondCoords.lng);

//   setInterval(function () {
//     fetchNSDisruptions(roermondCoords.lat, roermondCoords.lng);
//   }, 15000);
// });

// document.addEventListener('DOMContentLoaded', function () {
//   fetchNearestStations(51.19417, 5.9875);
//   fetchNSDisruptions();
//   fetchPublicHolidays(countryCode, year); 

//   const countryCode = '+31'; 
//   const year = 2024;
//   const refreshInterval = 5 * 60 * 1000;

//   setInterval(function () {
//     fetchNearestStations(51.19417, 5.9875);
//     fetchNSDisruptions();
//     fetchPublicHolidays(countryCode, year); 
//   }, refreshInterval);
// });

// async function fetchNSDisruptions() {
//   const disruptionsList = document.getElementById('disruptions-list');

//   try {
//     const response = await fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/disruptions?isActive=true', {
//       method: 'GET',
//       headers: {
//         'Accept-language': 'default',
//         'Cache-Control': 'no-cache',
//         'Ocp-Apim-Subscription-Key': 'b5e309223ff14a31aa1d18321812af71',
//         'type': 'true',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.status}`);
//     }

//     const data = await response.json();
//     displayDisruptions(data);
//   } catch (error) {
//     console.error('Error fetching disruptions:', error);
//   }
// }



// function displayDisruptions(disruptions) {
//   const disruptionsList = document.getElementById('disruptions-list');
//   disruptionsList.innerHTML = '';

//   disruptions.forEach(disruption => {
//     const listItem = document.createElement('li');

//     if (disruption.title && disruption.timespans && disruption.timespans.length > 0) {
//       const startTime = disruption.timespans[0].start;
//       const endTime = disruption.timespans[0].end;
//       listItem.innerHTML = `<strong>${disruption.title}</strong><br>Start: ${startTime}, End: ${endTime}`;
//     } else {
//       listItem.textContent = 'Unknown disruption';
//     }

//     disruptionsList.appendChild(listItem);
//   });
// }
// function getPublicHolidays() {
//   const country_code = encodeURIComponent("+31");
//   const year = 2024;

//   const apiUrl = `https://date.nager.at/api/v3/PublicHolidays/${year}/${country_code}`;

//   fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => displayHolidays(data))
//       .catch(error => console.error('Error fetching data:', error));
// }

// function displayHolidays(holidays) {
//   const holidaysList = document.getElementById('holidaysList');

//   if (holidays && holidays.length > 0) {
//       const listItems = holidays.map(holiday => {
//           return `<li>${holiday.date} - ${holiday.name}</li>`;
//       });

//       holidaysList.innerHTML = `<ul>${listItems.join('')}</ul>`;
//   } else {
//       holidaysList.innerHTML = '<p>No holidays data available.</p>';
//   }
// }

// // Call the function to fetch and display holidays on page load
// getPublicHolidays();

// async function fetchNearestStations(lat, lng) {
//   const nearestStationsForm = document.getElementById('NSForm');

//   try {
//     const response = await fetch(`http://localhost:3000/nearest-stations/${lat}/${lng}?limit=5`);
//     const data = await response.json();

//     nearestStationsForm.innerHTML = '<h2>Nearest Stations</h2>';

//     if (data && data.payload && data.payload.length > 0) {
//       const ul = document.createElement('ul');
//       data.payload.forEach(station => {
//         const li = document.createElement('li');
//         li.textContent = `Name: ${station.namen.lang}, `; //Code: ${station.code}, Type: ${station.stationType}
//         ul.appendChild(li);
//       });
//       nearestStationsForm.appendChild(ul);
//     } else {
//       nearestStationsForm.innerHTML += '<p>No stations found nearby.</p>';
//     }
//   } catch (error) {
//     console.error('Error fetching nearest stations:', error.message);
//     nearestStationsForm.innerHTML = '<p>Error fetching nearest stations. Please try again later.</p>';
//   }
// }
// // Assuming you have three slides with IDs "slide1", "slide2", and "slide3"