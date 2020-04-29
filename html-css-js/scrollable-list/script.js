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

  addEventListeners();
}

let dragStartIndex;

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index')
}
function dragOver(event) { event.preventDefault() }
function dragEnter() { this.classList.add('over') }
function dragLeave() { this.classList.remove('over') }

function dragDrop() {
  const dragEndIndex = +this.closest('li').getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex)
  this.classList.remove('over')
}

function swapItems(fromIndex, toIndex) {
  const fromItem = listItems[fromIndex].querySelector('.draggable')
  const toItem = listItems[toIndex].querySelector('.draggable')

  listItems[fromIndex].appendChild(toItem)
  listItems[toIndex].appendChild(fromItem)
}

function checkListOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim()
    if (personName !== top10Movies[index]) {
      listItem.classList.add('wrong')
    } else {
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    }
  })
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable')
  const dragListItems = document.querySelectorAll('.draggable-list li')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart)
  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })
}

check.addEventListener('click', checkListOrder)