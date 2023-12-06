function removeLastRow() {
    fetch('http://localhost:3000/removeLastRow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle success or update the displayed data
      getAllData();
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors
    });
  }
  