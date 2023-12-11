document.addEventListener('DOMContentLoaded', function() {
    // Call the function to get departures
    getDepartures();
});

function getDepartures() {
    const station = 'Rm'; // Roermond
    const maxJourneys = 10;

    const apiKey = 'e65d65e7a82b4f2c9c2b5ec34deac34c';
    const apiUrl = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?lang=en&station=${station}&maxJourneys=${maxJourneys}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the data here
        console.log(data);
        displayDepartures(data);
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
    });
}

// ns.js

function displayDepartures(data) {
    const departuresTableBody = document.getElementById('departuresTableBody');
    departuresTableBody.innerHTML = ''; // Clear previous content

    const payload = data && data.payload;

    if (payload && payload.departures && payload.departures.length > 0) {
        // Create and append rows for each departure
        payload.departures.forEach(departure => { // Show only 5 departures
            const plannedDepartureTime = new Date(departure.plannedDateTime);
            const actualDepartureTime = departure.actualDateTime ? new Date(departure.actualDateTime) : null;

            // Format the time in Netherlands timezone with 24-hour clock and shorter format (HH:mm)
            const formattedPlannedDepartureTime = plannedDepartureTime.toLocaleTimeString(undefined, {
                timeZone: 'Europe/Amsterdam',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });

            let delayInfo = '';
            if (actualDepartureTime) {
                const delayMinutes = Math.round((actualDepartureTime - plannedDepartureTime) / (1000 * 60));
                if (delayMinutes > 0) {
                    // Create a red box for the delay information
                    delayInfo = `<span class="bg-danger text-white p-1 rounded">+${delayMinutes} min</span>`;
                }
            }

            // Create a table row for each departure
            const departureRow = document.createElement('tr');

            // Create and append cells for each departure detail
            const timeCell = document.createElement('td');
            timeCell.innerHTML = `<div class="departure-time">${formattedPlannedDepartureTime} ${delayInfo}</div>`;

            const destinationCell = document.createElement('td');
            destinationCell.innerHTML = `<div class="destination">${departure.direction}</div><div class="via">${getViaStationsText(departure.routeStations)}</div>`;

            const platformCell = document.createElement('td');
            platformCell.innerHTML = `<div class="platform">${departure.plannedTrack}</div><div class="train-type">${getTrainTypeText(departure.product)}</div>`;

            // Append cells to the row
            departureRow.appendChild(timeCell);
            departureRow.appendChild(destinationCell);
            departureRow.appendChild(platformCell);

            // Append the row to the departures table body
            departuresTableBody.appendChild(departureRow);
        });
    } else {
        // If no departures are available, display a message
        const noDeparturesRow = document.createElement('tr');
        const noDeparturesCell = document.createElement('td');
        noDeparturesCell.colSpan = 3; // Span 3 columns
        noDeparturesCell.className = 'text-center';
        noDeparturesCell.textContent = 'Geen vertrekken beschikbaar.';
        noDeparturesRow.appendChild(noDeparturesCell);
        departuresTableBody.appendChild(noDeparturesRow);
    }
}

// Helper function to get the via stations text
function getViaStationsText(routeStations) {
    if (routeStations && routeStations.length > 0) {
        return `Via ${routeStations.map(stop => stop.mediumName).join(', ')}`;
    }
    return '';
}


// Helper function to get the train type text
function getTrainTypeText(product) {
    return product ? `${product.shortCategoryName} ${product.number}` : '';
}

