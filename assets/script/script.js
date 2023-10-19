
const forecast = document.getElementById("forecast");
const searchHistory = document.getElementById("search-history");

// Variables to hold API key and city details
const apiKey = "eb7ab42ea182a551efa63428e882f06d";
const apiUrl = "http://api.openweathermap.org/data/2.5/weather?&units=metric"

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// Function to fetch and display weather data
async function getWeatherData(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`); 
        var data = await response.json();

        document.querySelector("#cityName").innerHTML = data.name;
        document.querySelector("#temp").innerHTML = "Temp:"+ data.main.temp + "°C";
        document.querySelector("#humid").innerHTML = "Humidity:" + data.main.humidity + "%";
        document.querySelector("#wind").innerHTML = "Wind Speed:" + data.wind.speed + "km/h";
}

searchBtn.addEventListener("click", () => {
    getWeatherData(searchBox.value);
})



function storeSearchQuery(query) {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (searchHistory.indexOf(query) === -1) {
       searchHistory.unshift(query);
       localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
   }
   
   function retrieveSearchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    return searchHistory;
   }


function displaySearchHistory() {
    var searchHistoryContainer = document.getElementById('searchHistoryContainer');
    var searchHistory = retrieveSearchHistory();
    searchHistoryContainer.innerHTML = '';
    searchHistory.forEach(function(query) {
       var searchHistoryItem = document.createElement('div');
       searchHistoryItem.classList.add('search-history-item');
       searchHistoryItem.textContent = query;
       searchHistoryItem.addEventListener('click', function() {
         var searchInput = document.getElementById('searchInput');
         searchInput.value = query;
       });
       searchHistoryContainer.appendChild(searchHistoryItem);
    });
   }
   
   document.getElementById('searchForm').addEventListener('submit', function(event) {
        displaySearchHistory();
   })



