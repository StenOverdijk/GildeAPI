$(document).ready(function () {
    dayjs.locale('nl');

    var mainCity = "Roermond";
    var quickCitySelection = ["Roermond"];

    if (localStorage.getItem("city") === null) {
        mainCity = "Roermond";
    } else {
        mainCity = localStorage.getItem("city");
    }
    console.log(localStorage.city);

    renderQuickCityBtns(mainCity);

    fetchThedata(mainCity);

    function fetchThedata(city) {
        var getCurrentDayApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=aadc9fe8c2258ddedabb7ac0233418e8`;
        var getForecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=aadc9fe8c2258ddedabb7ac0233418e8`;

        fetch(getForecastApi)
            .then((response) => {
                if (response.status === 404) {
                    displayErrorToast();
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                eraseOldForecast();
                renderFiveDayForecast(data);
            });

        fetch(getCurrentDayApi)
            .then((response) => {
                if (response.status === 404) {
                    displayErrorToast();
                    return;
                } else {
                    localStorage.setItem("city", city);
                    return response.json();
                }
            })
            .then((data) => {
                renderCurrentMainCity(data);
            });
    }

    function renderQuickCityBtns(mainCity) {
        $("#citySelector").children().remove();
        quickCitySelection.unshift(mainCity);
        quickCitySelection.forEach(element => {
            var newbutton = $("<button>", { "class": "btn city" }).text(element);
            $('#citySelector').append(newbutton);
        });
    }

    function renderCurrentMainCity(data) {
        $('#mainCity').text("Roermond"); // Set the desired city name
        $('#mainTemp').text(`${(data.main.temp).toFixed()}°C`);
        $('#currentDate').text(dateWithNoTime());
        $('#currentWeather').text(`${translateWeather(data.weather[0].main)}`);
        $('mainWind').text(data.wind.speed);
        $('mainHumidity').text(data.main.humidity);
        $('#mainImage').attr("src", `../img/${data.weather[0].icon}_f.png`);
        $('#weatherIcon').attr("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    }


    function renderFiveDayForecast(data) {
        // Zoek het eerste tijdstip in de lijst dat na het huidige moment komt
        var startIndex = 0;
        while (dayjs(data.list[startIndex].dt_txt).isBefore(dayjs())) {
            startIndex++;
        }

        // Overslaan van het eerste item van de huidige dag
        while (dayjs(data.list[startIndex].dt_txt).isSame(dayjs(), 'day')) {
            startIndex++;
        }

        for (let index = startIndex; index < data.list.length; index = index + 8) {
            var singleLiEl = $("<li>");
            $("#fiveDayForecast").append(singleLiEl);

            // omzetten van YYYY MM DD hh:mm:ss naar DDD met DAYJS
            singleLiEl.append($("<h5>").text(translateDay(dateToShortDay(data.list[index].dt_txt))));

            // omzetten naar temperatuur zonder decimalen
            singleLiEl.append($("<smallTemp>").text(`${(data.list[index].main.temp).toFixed()}°C`));

            singleLiEl.append($("<div>", { "class": "smallLabels" })
                .append(
                    $("<p>").text("Weer:"),
                    $("<p>").text("Wind:"),
                    $("<p>").text("Vochtigheid:")
                ));
            singleLiEl.append($("<div>", { "class": "smallInfo" })
                .append(
                    $("<p>").text(`${translateWeather(data.list[index].weather[0].main)}`),
                    $("<p>").text(`${data.list[index].wind.speed} km/u`),
                    $("<p>").text(`${data.list[index].main.humidity} %`)
                ));
        }
    }

    function displayErrorToast() {
        $(".toast").removeClass("hide");
        var mainCity = "Roermond";
        fetchThedata(mainCity);
    }

    

    function dateToShortDay(date) {
        return dayjs(date).format('ddd');
    }

    function dateWithNoTime() {
        return dayjs().format('dddd D MMMM, YYYY');
    }

    function eraseOldForecast() {
        $("#fiveDayForecast").empty();
    }

    function lookForCity(event) {
        mainCity = $("#input-city").val();
        eraseOldForecast();
        fetchThedata(mainCity);
        renderQuickCityBtns(mainCity);
    }

    function switchCity(event) {
        mainCity = (event.target).textContent;
        eraseOldForecast();
        fetchThedata(mainCity);
    }

    function hideToast(event) {
        event.preventDefault();
        $(".toast").addClass("hide");
    }

    function translateDay(day) {
        const daysTranslations = {
            "Mon": "Ma",
            "Tue": "Di",
            "Wed": "Wo",
            "Thu": "Do",
            "Fri": "Vr",
            "Sat": "Za",
            "Sun": "Zo"
        };

        const translatedDay = daysTranslations[day] || day;
        const capitalizedDay = translatedDay.charAt(0).toUpperCase() + translatedDay.slice(1);
        return capitalizedDay.replace(/\.$/, '');
    }

    function translateWeather(weather) {
        const weatherTranslations = {
            "Clear": "Helder",
            "Clouds": "Bewolkt",
            "Rain": "Regen",
            "Drizzle": "Motregen",
            "Thunderstorm": "Onweer",
            "Snow": "Sneeuw",
            "Mist": "Mist"
        };
        return weatherTranslations[weather] || weather;
    }

    $("aside").on("click", "#search", lookForCity);
    $("aside").on("click", ".city", switchCity);

    $(".toast").on("click", ".btn-clear", hideToast);

    // Functie om automatisch de weerinformatie bij te werken
    function autoUpdateWeather() {
        console.log("Pagina wordt automatisch bijgewerkt!");
        fetchThedata(mainCity);
    }

    setInterval(autoUpdateWeather, 10 * 60 * 1000);
});
