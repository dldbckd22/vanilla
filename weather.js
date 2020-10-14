const weather =document.querySelector(".js-weather");
const COORDS = "coords";
const API_KEYS= "9c42e6dc27dfcc8a872a4cdb1b8c7649";

function getWeather(lat,lon){
    fetch(
        `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json)
        // const temp = json.main.temp;
        // const loc = json.name;
        // weather.innerText(`${temp} @ ${loc}`)
    });
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handdleGeoSucces(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handdleGeoError(){
    console.log("sadasd")
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handdleGeoSucces, handdleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords==null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }

}
function init(){
    loadCoords();
}
init();

