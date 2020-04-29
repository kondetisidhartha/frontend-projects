// Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load All Event Listeners
loadEventListeners();

// Load All Event Listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task item
  form.addEventListener("submit", addTask);
  // Remove task item
  taskList.addEventListener("click", deleteTask);
  // Clear all tasks
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks
  filter.addEventListener("keyup", filterTasks);
}
// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // create list element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // append value in task
    li.appendChild(document.createTextNode(task));

    // delete anchor element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html(i tag)
    link.innerHTML = '<i class= "fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Enter task to add..");
  } else {
    // create list element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // append value in task
    li.appendChild(document.createTextNode(taskInput.value));

    // delete anchor element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html(i tag)
    link.innerHTML = '<i class= "fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeInLocalStorage(taskInput.value);

    taskInput.value = "";
  }

  e.preventDefault();
}

// Delete Task
function deleteTask(e) {
  if (e.target.classList.contains("fa-remove")) {
    e.target.parentElement.parentElement.remove();
    // Remove Task from Local Storage
    deleteTaskLocalStorage(e.target.parentElement.parentElement);
  }
  e.preventDefault();
}

// Remove from Local Storage
function deleteTaskLocalStorage(li) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (li.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e) {
  // 1st method
  // taskList.innerHTML = "";

  // 2nd method: Faster method
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // CLear from LS
  clearTasksLocalStorage();
}

// Clear Tasks from Local Storage
function clearTasksLocalStorage() {
  localStorage.clear("tasks");
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(li) {
    const liText = li.firstChild.textContent;
    if (liText.toLowerCase().indexOf(text) != -1) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
}

function storeInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
