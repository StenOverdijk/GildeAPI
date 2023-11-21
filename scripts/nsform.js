async function fetchNearestStations(lat, lng) {
    const nearestStationsForm = document.getElementById('NSForm');
  
    try {
      const response = await fetch(`http://localhost:3000/nearest-stations/${lat}/${lng}?limit=5`);
      const data = await response.json();
  
      nearestStationsForm.innerHTML = '';
  
      if (data && data.payload && data.payload.length > 0) {
        const ul = document.createElement('ul');
        data.payload.forEach(station => {
          const li = document.createElement('li');
          li.textContent = `Name: ${station.namen.lang}, `; //Code: ${station.code}, Type: ${station.stationType}
          ul.appendChild(li);
        });
        nearestStationsForm.appendChild(ul);
      } else {
        nearestStationsForm.innerHTML += '<p>No stations found nearby.</p>';
      }
    } catch (error) {
      console.error('Error fetching nearest stations:', error.message);
      nearestStationsForm.innerHTML = '<p>Error fetching nearest stations. Please try again later.</p>';
    }
  }