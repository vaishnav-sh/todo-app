// SETTING THE DATE
const myDate = document.getElementById("date");
const myDay = document.getElementById("day");

var dNames = new Array(
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
);
var mNames = new Array(
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
);
var d = new Date();
var currDate = d.getDate();
var currMonth = d.getMonth();
var currDay = d.getDay();
var sup = "";
if (currDate === 1 || currDate === 21 || currDate === 31) {
  sup = "st";
} else if (currDate === 2 || currDate === 22) {
  sup = "nd";
} else if (currDate === 3 || currDate === 23) {
  sup = "rd";
} else {
  sup = "th";
}

myDate.innerHTML =
  currDate + "<sup>" + sup + "</sup>" + " " + mNames[currMonth];
myDay.innerHTML = dNames[currDay];

// ADDING ITEMS TO DO

const item = document.getElementById("enter-task");
const todoList = document.getElementById("todo-list");
const addBtn = document.getElementById("add-btn");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
addBtn.addEventListener("click", addItem);
todoList.addEventListener("click", deleteCheck);

function addItem(e) {
  e.preventDefault();

  // take input text
  var newItem = document.getElementById("enter-task").value;

  // create task item div
  var todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create task item name
  var newTodo = document.createElement("li");
  newTodo.innerText = newItem;

  //Adding data to local storage
  saveLocalTodos(newItem);

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // button container
  var btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  todoDiv.appendChild(btnContainer);

  // check and delete
  const checkBtn = document.createElement("Button");
  checkBtn.innerHTML =
    '<img src="./icons/check.svg" alt="check icon" class="done">';
  checkBtn.classList.add("check");
  btnContainer.appendChild(checkBtn);

  const deleteBtn = document.createElement("Button");
  deleteBtn.innerHTML =
    '<img src="./icons/delete.svg" alt="delete icon" class="trash">';
  deleteBtn.classList.add("delete");
  btnContainer.appendChild(deleteBtn);

  // append todo item to list
  todoList.appendChild(todoDiv);

  // clear the textfield
  item.value = "";
}

// CHECK AND REMOVE ITEM
function deleteCheck(e) {
  const item = e.target;
  removeLocalTodos(document.querySelector(".todo"));
  if (item.classList[0] === "done") {
    document.querySelector(".todo").remove();
  } else if (item.classList[0] === "trash") {
    document.querySelector(".todo").remove();
  }
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // create task item div
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create task item name
    var newTodo = document.createElement("li");
    newTodo.innerText = todo;

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // button container
    var btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    todoDiv.appendChild(btnContainer);

    // check and delete
    const checkBtn = document.createElement("Button");
    checkBtn.innerHTML =
      '<img src="./icons/check.svg" alt="check icon" class="done">';
    checkBtn.classList.add("check");
    btnContainer.appendChild(checkBtn);

    const deleteBtn = document.createElement("Button");
    deleteBtn.innerHTML =
      '<img src="./icons/delete.svg" alt="delete icon" class="trash">';
    deleteBtn.classList.add("delete");
    btnContainer.appendChild(deleteBtn);

    // append todo item to list
    todoList.appendChild(todoDiv);

    // clear the textfield
    item.value = "";
  });
}
