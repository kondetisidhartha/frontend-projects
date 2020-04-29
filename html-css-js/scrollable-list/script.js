const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const top10Movies = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "The Godfather: Part II",
  "Pulp Fiction",
  "Schindler's List",
  "The Lord of the Rings: The Return of the King",
  "12 Angry Men",
  "The Good, the Bad and the Ugly",
  "Forrest Gump"
]

// Store List Items
const listItems = [];

// call and create list to show on DOM
createList();
function createList() {
  [...top10Movies]
    .map(item => ({ value: item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .forEach((movie, index) => {

      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index)

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="movie-name">${movie.value}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

      listItems.push(listItem)
      draggableList.appendChild(listItem)
    })
}