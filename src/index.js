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


// ADDING ITEMS TO DO
const todoInput = document.querySelector('.enter-task');
const todoList = document.querySelector('.todo-list');
const addBtn = document.querySelector('.add-btn');

//event listeners
addBtn.addEventListener('click', addItem);
todoList.addEventListener('click', deleteCheck);

function addItem(event) {
    event.preventDefault();

    

    // create task item div
    var todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');   

    // create task item name    
    var newTodo = document.createElement('li');
    newTodo.innerText =  todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);



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
    todoList.appendChild(todoDiv);

    // clear the textfield
    todoInput.value = "";
}

// CHECK AND REMOVE ITEM
function deleteCheck(event) {
    const item = event.target;
    if(item.classList[0] === 'check1') {
      const todo=item.parentElement;
           todo.classList.toggle('completed');
        
    } 
    if (item.classList[0] === 'delete'){
        
       document.querySelector('.todo').remove();
      
    }
}





 
