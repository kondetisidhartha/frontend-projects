document.querySelector('.get-jokes').addEventListener('click', loadJokes);

function loadJokes(e) {
  const numberOfJokes = document.getElementById('number').value;
  // console.log(numberOfJokes)

  // CREATE xhr object
  const xhr = new XMLHttpRequest();

  // OPEN - establish server connection
  xhr.open('GET', `http://api.icndb.com/jokes/random/${numberOfJokes}`, true);

  // SEND request
  xhr.send();

  // on receiveing response
  xhr.onload = function () {
    const response = JSON.parse(this.responseText);
    // console.log(response)
    let output = '';
    if (response.type === "success") {
      response.value.forEach(function (joke) {
        output += `<li>${joke.joke}</li>`;
      })
    } else {
      output = '<li>Something went wrong...</li>'
    }

    document.querySelector('.jokes').innerHTML = output;
  }

  e.preventDefault();
}