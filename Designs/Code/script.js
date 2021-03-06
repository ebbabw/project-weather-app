
// The APIs

const cityToday = 'https://api.openweathermap.org/data/2.5/weather?q=New%20York&units=metric&APPID=bb2b0bb45cd18a1f48ff2ac55b77750a'
const cityForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=New%20York&units=metric&appid=bb2b0bb45cd18a1f48ff2ac55b77750a'


// My DOM selector 

const cityName = document.getElementById('city')
const iconWeather = document.getElementById('icon')
const cityTemp = document.getElementById('tempdec')
const citySunrise = document.getElementById('sunrise')
const citySunset = document.getElementById('sunset')
const weekday = ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')

const showWeather = city => {

// The JSON 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=bb2b0bb45cd18a1f48ff2ac55b77750a`)
    .then((Response) => {
        return Response.json()
    })
    .then((json) => {
        weatherCard.classList = null;
        textcold.innerHTML = null;
        textwarm.innerHTML = null;

        cityName.innerHTML = json.name 

        const icon = `https://openweathermap.org/img/w/${json.weather[0].icon}.png`;
        
        iconWeather.innerHTML = `<img src=${icon} />`;
    
    
        cityTemp.innerHTML = `<p> ${json.weather[0].description}&#x3021;${json.main.temp.toFixed(0)} &#8451;</p>`
    
        const sunriseConvert = new Date((json.sys.sunrise + json.timezone) *1000)
        const sunriseTime = sunriseConvert.toLocaleDateString([],{ hour: '2-digit', minute: '2-digit' })
    
        sunrise.innerHTML = `Sunrise: ${sunriseTime}`
    
        const sunsetConvert = new Date((json.sys.sunset + json.timezone) *1000)  
        const sunsetTime = sunsetConvert.toLocaleDateString([],{ hour: '2-digit', minute: '2-digit' })
    
        sunset.innerHTML = `Sunset: ${sunsetTime}` 

        if(json.main.temp <= 10) {
            weatherCard.classList.add("cold");
            textcold.innerHTML = `<p>Travel to ${city} and enjoy the cold breeze<br>with a warm coffee.</p>`
        } else {
            weatherCard.classList.add("warm");
            textwarm.innerHTML = `<p>Travel to ${city} and enjoy the warm breeze.</p>`
        }

    })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=bb2b0bb45cd18a1f48ff2ac55b77750a`)
    .then((Response) => {
        return Response.json()
    })
    .then((json) => {
       weekdayForecast.innerHTML = null;

       const forecastFilter = json.list.filter(item => item.dt_txt.includes('03:00'))
       forecastFilter.forEach((weekday) => {
    
        const fiveDaysForecast = new Date(weekday.dt * 1000)
        const showDay = fiveDaysForecast.toLocaleDateString('en-US', {weekday: 'long'})

        weekdayForecast.innerHTML += `<p> ${showDay}&#x3021;${Math.round(weekday.main.temp.toFixed(0))} &#8451;</p> `
    
       })
    })   
}

WeatherMenu.addEventListener("change", () => showWeather(WeatherMenu.value));

