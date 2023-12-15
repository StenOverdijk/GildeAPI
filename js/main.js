c1Btn = document.getElementById("c1Btn")
c2Btn = document.getElementById("c2Btn")
c3Btn = document.getElementById("c3Btn")
c4Btn = document.getElementById("c4Btn")
loginBtn = document.getElementById("loginBtn")
mainPage1 = document.getElementById("mainPage1")
mainPage2 = document.getElementById("mainPage2")
mainPage3 = document.getElementById("mainPage3")
mainPage4 = document.getElementById("mainPage4")
loginDiv = document.getElementById("loginDiv")
loggedInDiv = document.getElementById("loggedInDiv")

loginDiv.style.display = 'block'
loggedInDiv.style.display = 'none'


c1Btn.addEventListener("click", () => {
    mainPage1.style.display = 'block'
    mainPage2.style.display = 'none'
    mainPage3.style.display = 'none'
    mainPage4.style.display = 'none'
    loginDiv.style.display = 'none'
    loggedInDiv.style.display = 'none'

})

c2Btn.addEventListener("click", () => {
    mainPage1.style.display = 'none'
    mainPage2.style.display = 'block'
    mainPage3.style.display = 'none'
    mainPage4.style.display = 'none'
    loginDiv.style.display = 'none'
    loggedInDiv.style.display = 'none'

})

c3Btn.addEventListener("click", () => {
    mainPage1.style.display = 'none'
    mainPage2.style.display = 'none'
    mainPage3.style.display = 'block'
    mainPage4.style.display = 'none'
    loginDiv.style.display = 'none'
    loggedInDiv.style.display = 'none'

})

c4Btn.addEventListener("click", () => {
    mainPage1.style.display = 'none'
    mainPage2.style.display = 'none'
    mainPage3.style.display = 'none'
    mainPage4.style.display = 'block'
    loginDiv.style.display = 'none'
    loggedInDiv.style.display = 'none'

})

loginBtn.addEventListener("click", () => { 
    loginDiv.style.display = 'block'
    mainPage1.style.display = 'none'
    mainPage2.style.display = 'none'
    mainPage3.style.display = 'none'
    mainPage4.style.display = 'none'
    loggedInDiv.style.display = 'none'
})




// c1Btn = document.getElementById("c1Btn")
// c2Btn = document.getElementById("c2Btn")
// c3Btn = document.getElementById("c3Btn")
// c4Btn = document.getElementById("c4Btn")
// container1 = document.getElementById("container1")
// container2 = document.getElementById("container2")
// container3 = document.getElementById("container3")
// container4 = document.getElementById("container4")
// tableNS = document.getElementById("tableNS")


// container1.style.display = 'block'
// container2.style.display = 'none'
// container3.style.display = 'none'
// container3.style.display = 'none'
// tableNS.style.display = 'none'

// c1Btn.addEventListener("click", ()=> {
//     container1.style.display = 'block'
//     container2.style.display = 'none'
//     container3.style.display = 'none'
//     container4.style.display = 'none'
//     tableNS.style.display = 'block'
// })

// c2Btn.addEventListener("click", ()=> {
//     container1.style.display = 'none'
//     container2.style.display = 'block'
//     container3.style.display = 'none'
//     container4.style.display = 'none'
//     tableNS.style.display = 'none'
// })

// c3Btn.addEventListener("click", ()=> {
//     container1.style.display = 'none'
//     container2.style.display = 'none'
//     container3.style.display = 'block'
//     container4.style.display = 'none'
//     tableNS.style.display = 'none'
// })

// c3Btn.addEventListener("click", ()=> {
//     container1.style.display = 'none'
//     container2.style.display = 'none'
//     container3.style.display = 'none'
//     container4.style.display = 'block'
//     tableNS.style.display = 'none'
// })
