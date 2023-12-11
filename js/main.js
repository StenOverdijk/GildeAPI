c1Btn = document.getElementById("c1Btn")
c2Btn = document.getElementById("c2Btn")
c3Btn = document.getElementById("c3Btn")
container1 = document.getElementById("container1")
container2 = document.getElementById("container2")
container3 = document.getElementById("container3")
tableNS = document.getElementById("tableNS")


container1.style.display = 'block'
container2.style.display = 'none'
container3.style.display = 'none'
tableNS.style.display = 'none'

c1Btn.addEventListener("click", ()=> {
    tableNS.style.display = 'block'
    container1.style.display = 'block'
    container2.style.display = 'none'
    container3.style.display = 'none'
})

c2Btn.addEventListener("click", ()=> {
    container1.style.display = 'none'
    container2.style.display = 'block'
    container3.style.display = 'none'
    tableNS.style.display = 'none'

})

c3Btn.addEventListener("click", ()=> {
    container1.style.display = 'none'
    container2.style.display = 'none'
    container3.style.display = 'block'
    tableNS.style.display = 'none'

})
