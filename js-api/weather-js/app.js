const api = {
  key: "8b4df52616f31b3936728ecc99dec6e1",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    // console.log(searchBox.value)
  }
}

function getResults(cityName) {
  fetch(`${api.base}weather?q=${cityName}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then(responseData => displayResults(responseData))
    .catch(err => console.log('Error...'))
}

function displayResults(responseData) {
  console.log(responseData)
  const city = document.querySelector('.city');
  city.textContent = `${responseData.name}, ${responseData.sys.country}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(responseData.main.temp)}<span>°C</span>`;

  const weather = document.querySelector('.current .weather');
  weather.innerText = responseData.weather[0].main;

  const hi_low = document.querySelector('.current .hi-low');
  hi_low.innerText = `${responseData.main.temp_min}°C / ${responseData.main.temp_max}°C`;
}

function dateBuilder(now) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}