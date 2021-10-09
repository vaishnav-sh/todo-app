// DEPENDENCIES
let todos = []

// SETTING THE DATE
const myDate = document.getElementById('date')
const myDay = document.getElementById('day');

var dNames = new Array("sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"); 
var mNames = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
var d = new Date();
var currDate = d.getDate();
var currMonth = d.getMonth();
var currDay = d.getDay();
var sup = "";
if(currDate === 1 || currDate === 21 || currDate === 31) {
    sup = "st";
} else if(currDate === 2 || currDate === 22) {
    sup = "nd";
} else if(currDate === 3 || currDate === 23) {
    sup = "rd";
} else {
    sup = "th";
}

myDate.innerHTML = currDate + "<sup>" + sup + "</sup>" + " " + mNames[currMonth];
myDay.innerHTML = dNames[currDay];
var completedTasks = document.getElementById('completed-todo-list-title');

// click on completed section
$('.completed_title').click(function(event) {
    $('#completed_arrow').toggleClass('active');
    $('#completed-todo-list-items').slideToggle(300);
});

// CACHED ELEMENTS
const item = document.getElementById('enter-task');
const todoList = document.getElementById('todo-list'); //ul
const addBtn = document.getElementById('add-btn');
const completedList = document.getElementById('completed-todo-list-items');


// EVENT LISTENERS
addBtn.addEventListener('click', addItem);
todoList.addEventListener('click', deleteCheck);
completedList.addEventListener('click', deleteCheck);

// CREATE TODO ITEM
const createToDoItem = (todo => {
// contain todoDiv and deadlineDiv
var divContainer = document.createElement("div");
divContainer.classList.add("todo-dsp");

var todoDiv = document.createElement('div');
todoDiv.classList.add('todo');
divContainer.appendChild(todoDiv); 
todoDiv.id = `todo-${todo.id}`;  

// create task item name    
var newTodo = document.createElement("li");
newTodo.innerText =  todo.text;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);

// button container
var btnContainer = document.createElement('div');
btnContainer.classList.add('btn-container');
todoDiv.appendChild(btnContainer);

 // if user provides a deadline date
if (todo.date) {
	// create deadline container
    var deadlineDiv = document.createElement("div");
    deadlineDiv.classList.add("deadline-container");

	// create span showing due date
    var dateSpan = document.createElement("span");
    var text = parseInt(todo.time.substring(0, 2)) < 12
        ? document.createTextNode(`Due date is on ${todo.date} at ${todo.time} a.m`)
        : document.createTextNode(`Due date is on ${todo.date} at ${todo.time} p.m`);
    dateSpan.appendChild(text);
    dateSpan.classList.add("date-dsp");

	// create span showing countdown timer
    var countTimerSpan = document.createElement("span");
    deadlineDiv.appendChild(dateSpan);
    deadlineDiv.appendChild(countTimerSpan);
    countDownTimer(todo, countTimerSpan);
    divContainer.appendChild(deadlineDiv);
  }

// if the todo has not been completed, add check button
if(!todo.isCompleted){
	const checkBtn = document.createElement('Button');
	checkBtn.innerHTML = `<img id='done-${todo.id}' src="./icons/check.svg" alt="check icon" class="done">`;
	checkBtn.classList.add('check');
	checkBtn.id = `check-${todo.id}`;
	btnContainer.appendChild(checkBtn);
}

const deleteBtn = document.createElement('Button');
deleteBtn.innerHTML = `<img id='trash-${todo.id}' src="./icons/delete.svg" alt="delete icon" class="trash">`;
deleteBtn.classList.add('delete');
deleteBtn.id = `delete-${todo.id}`;
btnContainer.appendChild(deleteBtn);
return divContainer;
})

// MOVE TODO TO COMPLETED LIST
const moveToDone = (targetTodo) => {
	// update completed value of todo
	todos.forEach(todo => {
		if(todo.id === targetTodo.id){
			todo.isCompleted = true
		}
	})

	// append todo item to completed list
	completedList.appendChild(createToDoItem(targetTodo));

	updateLocalStorage(todos)
}

// ADD TODO TO TODOS ARRAY AND LOCAL STORAGE 
function addItem(e){
	e.preventDefault();

	// take input text
	var newItem = document.getElementById('enter-task').value;

	// take date and time
  	var dueDate = document.getElementById("enter-due-date").value || "1999-01-01";
  	var time = document.getElementById("enter-time").value || "23:59";

	// refresh input fields
  	document.getElementById("enter-due-date").value = "";
  	document.getElementById("enter-time").value = "";

	// return if input value is empty or contains only spaces
	if(!newItem.trim()) return;

	// create todo model
	const todo = dueDate === "1999-01-01"
      ? {
          id: Math.random(),
          text: newItem,
          isCompleted: false,
        }
      : {
          id: Math.random(),
          text: newItem,
          isCompleted: false,
          date: dueDate,
          time: time,
        };

	todos.push(todo)

	updateLocalStorage(todos)

	renderItem(todo)
}

// DISPLAY TODO ITEM
function renderItem(todo) {
	// contain todoDiv and deadlineDiv
  	var divContainer = document.createElement("div");
  	divContainer.classList.add("todo-dsp");

    // create task item div
    var todoDiv = document.createElement('div');
    todoDiv.classList.add('todo'); 
	divContainer.appendChild(todoDiv);

    // create task item name    
    var newTodo = document.createElement("li");
    newTodo.classList.add('todo-item');
    
   
    // creating input by govind
    var input = document.createElement("INPUT");
      input.setAttribute("type", "text");
      input.classList.add('inputItem');
      newTodo.appendChild(input);
      input.setAttribute("value",todo.text)
    
    
    
    todoDiv.appendChild(newTodo);

	// if user provides a due date
  	if (todo.date) {
		// deadline container
		var deadlineDiv = document.createElement("div");
		deadlineDiv.classList.add("deadline-container");

		// create span showing due date
		var dateSpan = document.createElement("span");
    	var text = parseInt(todo.time.substring(0, 2)) < 12
        	? document.createTextNode(`Due date is on ${todo.date} at ${todo.time} a.m`)
        	: document.createTextNode(`Due date is on ${todo.date} at ${todo.time} p.m`);
    	dateSpan.appendChild(text);
    	dateSpan.classList.add("date-dsp");

		// create span showing countdown timer
		var countTimerSpan = document.createElement("span");
		deadlineDiv.appendChild(dateSpan);
		deadlineDiv.appendChild(countTimerSpan);
		countDownTimer(todo, countTimerSpan);
		divContainer.appendChild(deadlineDiv);
  }

    // button container
    var btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    todoDiv.appendChild(btnContainer)
    
    // edit button by govind
    const editBtn = document.createElement('Button');
    editBtn.innerHTML = '<img src="./icons/edit.svg" alt="edit icon" class="edit">';
    editBtn.classList.add('edit');
    btnContainer.appendChild(editBtn);

    editBtn.addEventListener('click',function() {
        input.focus();
    })

    // check and delete
    const checkBtn = document.createElement('Button');
    checkBtn.innerHTML = '<img src="./icons/check.svg" alt="check icon" class="done">';
    checkBtn.classList.add('check');
    btnContainer.appendChild(checkBtn);

    const deleteBtn = document.createElement('Button');
    deleteBtn.innerHTML = '<img src="./icons/delete.svg" alt="delete icon" class="trash">';
    deleteBtn.classList.add('delete');
    btnContainer.appendChild(deleteBtn);

    // append todo item to list
		if(todo.isCompleted){
			completedList.appendChild(createToDoItem(todo))
		} else {
			todoList.appendChild(createToDoItem(todo))
		}

    // clear the textfield
    item.value = "";
}

// CHECK AND REMOVE ITEM
function deleteCheck(e) {
	const item = e.target;
	const targetId = e.target.id.replace('done-', '').replace('trash-', '')

	// find todo in the todos array
	todos.forEach(todo => {
		if(todo.id == targetId){
			// if being completed, move to completed list
			if(item.classList[0] === 'done') {
					popToDoItem(item)
					moveToDone(todo)
			
			// if being deleted, delete
			} else if (item.classList[0] === 'trash'){
					popToDoItem(item)
					deleteTodo(todo)
			}
		}
	})
}

// REMOVE TODO FROM CURRENT LIST
function popToDoItem(item){
    const id =  item.id.substring(item.id.length, item.id.lastIndexOf("-")+1);
    const todo = document.getElementById(`todo-${id}`);
    const divContainer = todo.parentNode;
  	todo.remove();
  	divContainer.remove();
    return todo;
}

// DELETE TODO FROM LIST AND LOCALSTORAGE
function deleteTodo(targetTodo){
	todos = todos.filter(todo => todo.id != targetTodo.id)
	updateLocalStorage(todos)
}

// UPDATE LOCALSTORAGE WITH CURRENT TODO ARRAY
function updateLocalStorage(todos){
	localStorage.setItem('todos', JSON.stringify(todos))
}

// GET TODOS SAVED IN LOCALSTORAGE
function getLocalTodos(){
	if(localStorage.getItem('todos')){
		todos = JSON.parse(localStorage.getItem('todos'))
	}

	todos.forEach(todo => {
		renderItem(todo)
	})
}

function countDownTimer(todo, counter) {
  var dueDate = new Date(`${todo.date} ${todo.time}`).getTime();

  var countDown = setInterval(() => {
    var currDate = new Date().getTime();
    var difference = dueDate - currDate;

    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);

    counter.innerHTML = `Time left: ${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
    counter.classList.add("count-down");

    if (difference < 0) {
      clearInterval(countDown);
      counter.classList.add("time-out");
      counter.innerHTML = "*THE DEADLINE IS OUT!!!";
    }
  }, 1000);
}

// ON PAGE LOAD
getLocalTodos()