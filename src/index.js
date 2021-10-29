// DEPENDENCIES
let todos = []
let task_count=0
let task_completed_count=0

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
const clearAllBtn = document.getElementById('clear-all-btn');
const task_counter = document.getElementById("task_counter");
const appriciation=document.getElementById("appriciation");

// EVENT LISTENERS
addBtn.addEventListener('click', addItem);
todoList.addEventListener('click', deleteCheck);
completedList.addEventListener('click', deleteCheck);
clearAllBtn.addEventListener('click', clearAll);

function isEmptyTodoList() {
	if(JSON.parse(localStorage.getItem('todos')).length !== 0) {
		clearAllBtn.removeAttribute("disabled");
	} else {
		clearAllBtn.setAttribute("disabled", true);
	}
}

isEmptyTodoList();

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

// if the todo has not been completed, add check and star button
if(!todo.isCompleted){
	const impBtn = document.createElement('Button');
	if(todo.isImportant) {
		impBtn.innerHTML = `<img id='imp-${todo.id}' src= "./icons/star-filled.svg" alt="mark as important" class="imp">`;
	} else {
		impBtn.innerHTML = `<img id='imp-${todo.id}' src= "./icons/star-dark.svg" alt="mark as important" class="imp">`;
	}
	impBtn.classList.add('star');
	impBtn.id = `star-${todo.id}`;
	btnContainer.appendChild(impBtn);

	const checkBtn = document.createElement('Button');
	checkBtn.innerHTML = `<img id='done-${todo.id}' src="./icons/check.svg" alt="check icon" class="done">`;
	checkBtn.classList.add('check');
	checkBtn.id = `check-${todo.id}`;
	btnContainer.appendChild(checkBtn);

	impBtn.addEventListener('click', markAsImp);

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

	updateLocalStorage(todos)
}

let toggleImpBtn=false;

// MARK TODO AS IMPORTANT
const markAsImp = (e) => {
	const targetId = e.target.id.replace('imp-','');

	const todoStar = document.getElementById(`imp-${targetId}`);
	todos.forEach(todo => {
		if(todo.id == targetId) {
			todo.isImportant = !todo.isImportant;
			toggleImpBtn = todo.isImportant;
		}
	})
	todoStar.src = toggleImpBtn ? "./icons/star-filled.svg" : "./icons/star-dark.svg";
	updateLocalStorage(todos);
}

// ADD TODO TO TODOS ARRAY AND LOCAL STORAGE 
function addItem(e){
	e.preventDefault();

	// take input text
	var newItem = document.getElementById('enter-task').value;

	// return if input value is empty or contains only spaces
	if(!newItem.trim()) return;

	// create todo model
	const todo = {
		id: Math.random(),
		text: newItem,
		isCompleted: false,
		isImportant: false
	}

	todos.push(todo)
	task_count++;
	task_counter.innerHTML=`(${task_completed_count}/${task_count})`;
	console.log(task_count);
	appriciation.classList.add("hide");

	updateLocalStorage(todos)

	isEmptyTodoList()

	renderItem(todo)
}

// DISPLAY TODO ITEM
function renderItem(todo) {
    // create task item div
    var todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');   

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

	//mark important
	const impBtn = document.createElement('Button');
	impBtn.innerHTML = todo.isImportant ? '<img src="./icons/star-filled.svg" alt="mark as important" class="imp">':'<img src="./icons/star-dark.svg" alt="mark as important" class="imp">';
	impBtn.classList.add('star');
    btnContainer.appendChild(impBtn);

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
					task_completed_count++;
					task_counter.innerHTML=`(${task_completed_count}/${task_count})`;
					if(task_count==task_completed_count){
						appriciation.classList.remove("hide");
					}
			
			// if being deleted, delete
			} else if (item.classList[0] === 'trash'){
					popToDoItem(item)
					deleteTodo(todo)
					task_count--;
					if(todo.isCompleted){
						task_completed_count--;
					}
					task_counter.innerHTML=`(${task_completed_count}/${task_count})`;
					if(task_count==task_completed_count && task_count!=0){
						appriciation.classList.remove("hide");
					}
			}
		}
	})
}

// REMOVE TODO FROM CURRENT LIST
function popToDoItem(item){
    const id =  item.id.substring(item.id.length, item.id.lastIndexOf("-")+1);
    const todo = document.getElementById(`todo-${id}`);
    todo.remove();
    return todo;
}

// DELETE TODO FROM LIST AND LOCALSTORAGE
function deleteTodo(targetTodo){
	todos = todos.filter(todo => todo.id != targetTodo.id)
	updateLocalStorage(todos);
    isEmptyTodoList();
}

function clearAll() {

	todos.forEach(todo => {
		document.getElementById(`todo-${todo.id}`).remove();
	})
	
	todos = [];
	updateLocalStorage(todos);
	task_count=0;
	task_completed_count=0;
	task_counter.innerHTML=`(${task_completed_count}/${task_count})`;
	appriciation.classList.add("hide");
	clearAllBtn.setAttribute("disabled",true);
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