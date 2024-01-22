
function startSlider(){
    if (canStart === 'true') canStart = 'false'
    else canStart = 'true'
    console.log(canStart)
    localStorage.setItem('canSlide', canStart)
    startSlide()
}

let canStart = localStorage.getItem('canSlide')

console.log(canStart, ' 22')

if (canStart === 'true') startSlide()

function startSlide() {
    const pages = ['../../html/index.html', '../html/nsDeparture.html', '../copypaste/Weer/weer.html']
    let pagesIndex = localStorage.getItem('pagesIndex')
    setTimeout(() => {
        if (canStart !== 'true') return
        if (!pagesIndex) pagesIndex = -1
        pagesIndex++
        if (pagesIndex == pages.length) pagesIndex = 0
        localStorage.setItem('pagesIndex', pagesIndex)
        window.location.href = pages[pagesIndex]
    }, 15000);
}

