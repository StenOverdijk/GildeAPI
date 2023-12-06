document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.form');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = document.getElementById('emailInput').value;
      const password = document.getElementById('passwordInput').value;
  
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Login successful, show the loggedinDiv
          document.getElementById('loginDiv').style.display = 'none';
          document.getElementById('loggedinDiv').style.display = 'block';
        } else {
          // Login failed, handle the error (you can display an error message)
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    });
  });
  