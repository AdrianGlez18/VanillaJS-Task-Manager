document.getElementById('addTaskForm').addEventListener('submit', saveTask);

function saveTask(e) {
    let taskTitle = document.getElementById('taskTitle').value;
    let taskText  = document.getElementById('taskText').value;
    const task = {
        title: taskTitle,
        text: taskText,
        completed: false
    }

    if(localStorage.getItem('taskList') === null ){
        let taskList = [];
        taskList.push(task);
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }
    else {
        let taskList = JSON.parse(localStorage.getItem('taskList'));
        taskList.push(task);
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }
    printTasks();
    e.preventDefault();
}

function printTasks() {
    let taskList = JSON.parse(localStorage.getItem('taskList'));
    let taskDiv = document.getElementById('taskList');
    taskDiv.innerHTML = '';
    let divContent = "";
    let j = 0;
    for (let i = 0; i < taskList.length; i+=2) {
        divContent = "";
        j = i + 1;
        if(j < taskList.length) {
            divContent += printFullRow(taskList, i);
        }
        else {
            divContent += printTaskCol(taskList, i);
        }
        taskDiv.innerHTML += divContent;   
    }
}

function printFullRow(taskList, i) {
    let result = `<div class="row pb-3">`;
    result += printTaskCol(taskList, i);
    result += printTaskCol(taskList, i + 1);
    result += `</div>`;
    return result;
    
}

function printTaskCol(taskList, i) {
    let colorid = `color-${i}`;
    let combtn = `combtn-${i}`;
    let colorClass = taskList[i].completed ? 'bg-success' : 'bg-warning';
    let colorBtn = taskList[i].completed ? 'btn-warning' : 'btn-success';
    let textBtn = taskList[i].completed ? 'Not Complete' : 'Complete';
    let result = 
    `<div class="col-6">
        <div class="card">
            <div class="card-body ${colorClass}" id=${colorid}>
                <div class="w-100 h-100">
                    <p class="text-center">${taskList[i].title}</p>
                </div>
                <div>
                    <p>- ${taskList[i].text} </p>
                </div>
                <div class="options text-center row">
                    <button class="btn ${colorBtn} m-3 col-4" id=${combtn} onClick="markAsComplete(${i})">${textBtn}</button>
                    <button class="btn btn-danger m-3 col-4" onClick="deleteTask(${i})">Delete</button>
                </div>
            </div>
        </div>
    </div>`;
    return result;
}

function deleteTask(taskID) {
    let taskList = JSON.parse(localStorage.getItem('taskList'));
    taskList.splice(taskID, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    printTasks();
}

function markAsComplete(i) {
    let taskList = JSON.parse(localStorage.getItem('taskList'));
    taskList[i].completed = !taskList[i].completed;
    localStorage.setItem('taskList', JSON.stringify(taskList));
    printTasks();
}

printTasks();