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

$('#completed-todo-list-title').click(function(event) {
    $(this).toggleClass('active').next().slideToggle(300);
});
const item = document.getElementById('enter-task');
const todoList = document.getElementById('todo-list');
const addBtn = document.getElementById('add-btn');
const completedList = document.getElementById('completed-todo-list-items');

//event listeners
addBtn.addEventListener('click', addItem);
todoList.addEventListener('click', deleteCheck);
completedList.addEventListener('click', deleteCheck);

//event listeners
addBtn.addEventListener('click', addItem);

const createToDoItem = (text,isCompleted) => {
var number = Math.random();
var todoDiv = document.createElement('div');
todoDiv.classList.add('todo'); 
todoDiv.id = `todo-${number}`;  

// create task item name    
var newTodo = document.createElement("li");
newTodo.innerText =  text;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);

// button container
var btnContainer = document.createElement('div');
btnContainer.classList.add('btn-container');
todoDiv.appendChild(btnContainer);
if(isCompleted)
{
const checkBtn = document.createElement('Button');
checkBtn.innerHTML = `<img id='done-${number}' src="./icons/check.svg" alt="check icon" class="done">`;
checkBtn.classList.add('check');
checkBtn.id = `check-${number}`;
btnContainer.appendChild(checkBtn);
}

const deleteBtn = document.createElement('Button');
deleteBtn.innerHTML = `<img id='trash-${number}' src="./icons/delete.svg" alt="delete icon" class="trash">`;
deleteBtn.classList.add('delete');
deleteBtn.id = `delete-${number}`;
btnContainer.appendChild(deleteBtn);
return todoDiv;
}
const moveToDone = (e) => {

// append todo item to completed list
completedList.appendChild(createToDoItem(e.innerText,false));

}

function addItem(e) {
    e.preventDefault();

    // take input text
    var newItem = document.getElementById('enter-task').value;

    // return if input value is empty or contains only spaces
    if(!newItem.trim()) return;

    // append todo item to list
    todoList.appendChild(createToDoItem(newItem,true));

    // clear the textfield
    item.value = "";
}

// CHECK AND REMOVE ITEM
function deleteCheck(e) {
    const item = e.target;
    if(item.classList[0] === 'done') {
        const todo = popToDoItem(item);
        moveToDone(todo);
    
    } else if (item.classList[0] === 'trash'){
        popToDoItem(item);
    }
}

function popToDoItem(item){
    const id =  item.id.substring(item.id.length, item.id.lastIndexOf("-")+1);
    const todo = document.getElementById(`todo-${id}`);
    todo.remove();
    return todo;
}
