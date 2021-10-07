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





// ADDING ITEMS TO DO
const todoInput = document.querySelector('.enter-task');
const todoList = document.querySelector('.todo-list');
const addBtn = document.querySelector('.add-btn');




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


// CREATE TODO ITEM
const createToDoItem = (todo => {
var todoDiv = document.createElement('div');
todoDiv.classList.add('todo'); 
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
return todoDiv;
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



function addItem(event) {
    event.preventDefault();


	updateLocalStorage(todos)

}

// ADD TODO TO TODOS ARRAY AND LOCAL STORAGE 
function addItem(e){
	e.preventDefault();



function addItem(e) {
    e.preventDefault();




	// take input text
	var newItem = document.getElementById('enter-task').value;

	// return if input value is empty or contains only spaces
	if(!newItem.trim()) return;

	// create todo model
	const todo = {
		id: Math.random(),
		text: newItem,
		isCompleted: false
	}


	todos.push(todo)

	updateLocalStorage(todos)

	renderItem(todo)
}

// DISPLAY TODO ITEM
function renderItem(todo) {
    // create task item div
    var todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');   


    var newTodo = document.createElement('li');
    newTodo.innerText =  todoInput.value;

    newTodo.classList.add('todo-item');
    
   
    // creating input by govind
    var input = document.createElement("INPUT");
      input.setAttribute("type", "text");
      input.classList.add('inputItem');
      newTodo.appendChild(input);
      input.setAttribute("value",todo.text)
    
    
    
    todoDiv.appendChild(newTodo);





    // button container
    var btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    todoDiv.appendChild(btnContainer)

    


   

    // check and delete
    const checkBtn = document.createElement('Button');
    checkBtn.innerHTML =  '<i class="fas fa-check"></i>';
    checkBtn.classList.add('check1');
    todoDiv.appendChild(checkBtn);

    const deleteBtn = document.createElement('Button');
    deleteBtn.innerHTML =  '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete');
    todoDiv.appendChild(deleteBtn);

    // append todo item to list
		if(todo.isCompleted){
			completedList.appendChild(createToDoItem(todo))
		} else {
			todoList.appendChild(createToDoItem(todo))
		}

    // clear the textfield
    todoInput.value = "";
}


// CHECK AND REMOVE 
function deleteCheck(event) {
    const item = event.target;
    if(item.classList[0] === 'check1') {
      const todo=item.parentElement;
           todo.classList.toggle('completed');
        
    } 
    if (item.classList[0] === 'delete'){
        
       document.querySelector('.todo').remove();
      
    }}






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

// ON PAGE LOAD
getLocalTodos()