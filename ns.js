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

function displayDepartures(data) {
    const departuresContainer = document.getElementById('departures');
    departuresContainer.innerHTML = ''; // Clear previous content

    const payload = data && data.payload;

    if (payload && payload.departures && payload.departures.length > 0) {
        // Create and append elements for each departure
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
                    delayInfo = ` (Vertraging: ${delayMinutes} minuten)`;
                }
            }

            // Create a div for each departure
            const departureDiv = document.createElement('div');

            // Create a span for the main destination with bold and larger font
            const mainDestination = document.createElement('span');
            mainDestination.style.fontWeight = 'bold';
            mainDestination.style.fontSize = '1.2em'; // Adjust the size as needed
            mainDestination.textContent = `Trein naar ${departure.direction} om ${formattedPlannedDepartureTime}${delayInfo}`;

            // Include in-between stops in a separate paragraph
            const inBetweenStops = departure.routeStations.map(stop => stop.mediumName).join(', ');
            const inBetweenStopsInfo = document.createElement('p');
            inBetweenStopsInfo.textContent = `Tussenstops: ${inBetweenStops}`;

            // Append the elements to the departure div
            departureDiv.appendChild(mainDestination);
            departureDiv.appendChild(inBetweenStopsInfo);

            // Append the departure div to the departures container
            departuresContainer.appendChild(departureDiv);
        });
    } else {
        // If no departures are available, display a message
        const noDeparturesMessage = document.createElement('p');
        noDeparturesMessage.textContent = 'Geen vertrekken beschikbaar.';
        departuresContainer.appendChild(noDeparturesMessage);
    }
}







