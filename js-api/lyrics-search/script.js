const apiURL = "https://api.lyrics.ovh";

const form = document.getElementById("form");
const inputSearch = document.getElementById("search");
const resultDiv = document.getElementById("result");
const prevNext = document.getElementById("prevNext");

// Event Listeners
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTerm = inputSearch.value.trim();
  // console.log(searchTerm);
  if (!searchTerm) {
    resultDiv.innerHTML = "<h3>Please search using artist or song term.</h3>";
  } else {
    searchSongs(searchTerm);
  }
});

// Functions

// const searchSongs = (searchTerm) => {
//   fetch(`${apiURL}/suggest/${searchTerm}`)
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// };

async function searchSongs(searchTerm) {
  const response = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await response.json();
  showSongs(data);
}

async function getMoreSongs(url) {
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = [...new Set(await response.json())];
    showSongs(data);
  } catch (err) {
    console.log(err);
  }
}

async function getLyrics(artist, title) {
  try {
    const response = await fetch(`${apiURL}/v1/${artist}/${title}`);
    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<h4>No Lyrics for this track in this website.<br> Check again later.</h4>`;
      prevNext.innerHTML = "";
    }

    resultDiv.innerHTML = `
      <h2><strong>${artist} - ${title}</strong></h2>
      <p>${data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>")}</p>`;
    prevNext.innerHTML = "";
  } catch (err) {
    console.log(err);
  }
}

const showSongs = (data) => {
  // 1st method
  // let output = "";
  // data.data.forEach((song) => {
  //   output += `
  //     <li>${song.artist.name} - ${song.title}
  //       <button class='btn' data-artist="${song.artist.name}" data-song="${song.title}">Get Lyrics</button>
  //     </li>
  //   `;
  // });
  // resultDiv.innerHTML = `<ul class="songs">${output}</ul>`;

  //2nd Method

  resultDiv.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) =>
            `<li>${song.artist.name} - ${song.title}
          <button class='btn' data-artist="${song.artist.name}" data-song="${song.title}">Get Lyrics</button>
        </li>`
        )
        .join("")}
    </ul>`;

  if (data.prev || data.next) {
    prevNext.innerHTML = `
        ${
          data.prev
            ? `<button class='btn' onClick="getMoreSongs('${data.prev}')">Prev</button>`
            : ""
        }
        ${
          data.next
            ? `<button class='btn' onClick="getMoreSongs('${data.next}')">Next</button>`
            : ""
        }
      `;
  }
};

// Get Lyrics
resultDiv.addEventListener("click", (event) => {
  // console.log(event.target.tagName);
  if (event.target.tagName === "BUTTON") {
    const artist = event.target.getAttribute("data-artist").trim();
    const title = event.target.getAttribute("data-song").trim();

    getLyrics(artist, title);
  }
});
