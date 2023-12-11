document.addEventListener('DOMContentLoaded', function() {
    // Call the function to get departures
    getDepartures();
});

function getDepartures() {
    const station = 'Rm'; // Roermond
    const maxJourneys = 20;

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
        payload.departures.forEach(departure => {
            const plannedDepartureTime = new Date(departure.plannedDateTime);
            const actualDepartureTime = departure.actualDateTime ? new Date(departure.actualDateTime) : null;

            // Format the time in Netherlands timezone with 24-hour clock
            const formattedPlannedDepartureTime = plannedDepartureTime.toLocaleTimeString(undefined, {
                timeZone: 'Europe/Amsterdam',
                hour12: false
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
            timeCell.innerHTML = `${formattedPlannedDepartureTime} ${delayInfo}`;

            const directionCell = document.createElement('td');
            directionCell.textContent = departure.direction;

            // If there are in-between stops, create a cell for them
            const inBetweenStopsCell = document.createElement('td');
            let inBetweenStopsText = '';

            if (departure.routeStations && departure.routeStations.length > 0) {
                // Use routeStations if available
                inBetweenStopsText = departure.routeStations
                    .map(stop => stop.mediumName)
                    .join(', '); // Comma-separated format

                // Include the main destination (first stop) if there's only one stop
                if (departure.routeStations.length === 1) {
                    inBetweenStopsText = departure.routeStations[0].mediumName;
                }
            }

            // Set the text content to the in-between stops or an empty string
            inBetweenStopsCell.textContent = inBetweenStopsText;

            const trackCell = document.createElement('td');
            trackCell.textContent = departure.plannedTrack;

            // Append cells to the row
            departureRow.appendChild(timeCell);
            departureRow.appendChild(directionCell);

            // Append the in-between stops cell only if there are in-between stops
            if (inBetweenStopsText !== '') {
                departureRow.appendChild(inBetweenStopsCell);
            } else {
                // If no in-between stops, create an empty cell
                const emptyCell = document.createElement('td');
                departureRow.appendChild(emptyCell);
            }

            departureRow.appendChild(trackCell);

            // Append the row to the departures table body
            departuresTableBody.appendChild(departureRow);
        });
    } else {
        // If no departures are available, display a message
        const noDeparturesRow = document.createElement('tr');
        const noDeparturesCell = document.createElement('td');
        noDeparturesCell.colSpan = 4; // Span 4 columns
        noDeparturesCell.className = 'text-center';
        noDeparturesCell.textContent = 'Geen vertrekken beschikbaar.';
        noDeparturesRow.appendChild(noDeparturesCell);
        departuresTableBody.appendChild(noDeparturesRow);
    }
}


