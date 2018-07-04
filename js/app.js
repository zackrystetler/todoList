//declaring data type for data storage, if localStorage exists, use that, else, datatype is empty
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):
    {
        todo: [],
        done: []
    };

//svg creation
var removeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> <g> <g> <path class="trash" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3 c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9 C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7 c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2 c0.6,0,1.1,0.5,1.1,1.1V7z"/> </g> <g> <g> <path class="trash" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/> </g> <g> <path class="trash" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z" /> </g> <g> <path class="trash" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8 C14.6,17.7,14.3,18,14,18z"/> </g> </g> </g> </svg>'
var completeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><path class="check" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>'

renderTodoList();

//function for updating local storage, run with each action
function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

//function for renderring todo list from data upon intialize (using localStorage)
function renderTodoList () {
    if (!data.todo.length && !data.done.length) return;
    for (var i=0;i<data.todo.length;i++){
        addItemList(data.todo[i], 'todo');
    }
    for (var j=0;j<data.done.length;j++){
        addItemList(data.done[j], 'done');
    }

}

//user clicks add button
//if there is any text in the item field
//add that text to todo list
document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('item').value;

    if (value) {
        data.todo.push(value);
        addItemList(value, 'todo');
        document.getElementById('item').value = '';
    }
})

document.getElementById('item').addEventListener('keydown', function(e){
    if (e.code === 'Enter') {
        var value = document.getElementById('item').value;
        
        data.todo.push(value);
        addItemList(value, 'todo');
        document.getElementById('item').value = '';
    }
})

//adds item to todo list
function addItemList(text, target) {
    var list = document.getElementById(target);
    var item = document.createElement('li');

    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;
    //click event for remove button
    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;
    //click event for complete button
    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
    list.appendChild(item);

    dataObjectUpdated();
    
}

//removes a list item
function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var text = item.innerText.trim();

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(text), 1);
    } else if (id === 'done') {
        data.done.splice(data.done.indexOf(text), 1);
    }
    parent.removeChild(item);

    dataObjectUpdated();
    
}

//completes a list item
function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var text = item.innerText.trim();
    var target


    if (parent.id === 'todo') {
        data.todo.splice(data.todo.indexOf(text), 1);
        data.done.unshift(text);

        target = document.getElementById('done');
        parent.removeChild(item);
        target.insertBefore(item, target.childNodes[0]); 

        

    } else if (parent.id === 'done') {
        data.done.splice(data.done.indexOf(text), 1);
        data.todo.unshift(text);

        target = document.getElementById('todo');
        parent.removeChild(item);
        target.insertBefore(item, target.childNodes[0]);     
    }

    dataObjectUpdated();
}