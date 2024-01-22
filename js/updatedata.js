document.addEventListener('DOMContentLoaded', function() {
    getAllData();
  });
  
  function getAllData() {
    fetch('http://localhost:3000/getAllData')
      .then(response => response.json())
      .then(data => {
        const allDataContainer = document.getElementById('mainPage4');
        if (data && data.length > 0) {
          const rowsHTML = data.map(row => {
            return `
            <div class="anouncements">            
            <h1><strong>${row.datum} </strong> </h1>
            <h1><strong>${row.titel}</strong></h1>
            <h1><strong>Inhoud:</strong> ${row.inhoud}</h1>
            </div>`;
          }).join('');
  
          allDataContainer.innerHTML = `<div>${rowsHTML}</div>`;
        } else {
          allDataContainer.innerHTML = 'No data available.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  


  
  function updateData() {
    const datumData = document.getElementById('datum').value;
    const titelData = document.getElementById('titel').value;
    const inhoudData = document.getElementById('inhoud').value;

    if (!datumData || !titelData || !inhoudData) {
      console.log('All fields are required');
      return;
    }

    fetch('http://localhost:3000/updateData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        datumData,
        titelData,
        inhoudData,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      getLatestData();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
