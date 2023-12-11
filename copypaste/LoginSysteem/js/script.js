loggedinDiv = document.getElementById("loggedinDiv")
loginDiv = document.getElementById("loginDiv")
nieuwtjes = document.getElementById("nieuwtjes")
loginButton = document.getElementById("loginButton")
mainPage = document.getElementById("mainPage")

loggedinDiv.style.display = "none"
loginDiv.style.display = "none"
nieuwtjes.style.display = "block"

loginButton.addEventListener("click", () => {
    loginDiv.style.display = "block"
    loggedinDiv.style.display = "none"
    nieuwtjes.style.display = "none"
  });

mainPage.addEventListener("click", () =>{
    loginDiv.style.display = "none"
    loggedinDiv.style.display = "none"
    nieuwtjes.style.display = "block"
});