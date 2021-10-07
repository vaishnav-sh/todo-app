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



function addItem(event) {
    event.preventDefault();



    


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
      input.setAttribute("value",newItem)
    
    
    
    todoDiv.appendChild(newTodo);




    
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
    checkBtn.innerHTML =  '<i class="fas fa-check"></i>';
    checkBtn.classList.add('check1');
    todoDiv.appendChild(checkBtn);

    const deleteBtn = document.createElement('Button');
    deleteBtn.innerHTML =  '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete');
    todoDiv.appendChild(deleteBtn);




    // append todo item to list
    todoList.appendChild(createToDoItem(newItem,true));

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









 

