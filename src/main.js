document.getElementById('addTaskForm').addEventListener('submit', saveTask);

function saveTask(e) {
    let taskTitle = document.getElementById('taskTitle').value;
    let taskText  = document.getElementById('taskText').value;
    const task = {
        id: 0,
        title: taskTitle,
        text: taskText
    }

    if(localStorage.getItem('taskList') === null ){
        let taskList = [];
        taskList.push(task);
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }
    else {
        let taskList = JSON.parse(localStorage.getItem('taskList'));
        if(taskList.length != 0) task.id = taskList[taskList.length-1].id + 1;
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
    let result = 
    `<div class="col-6">
        <div class="card">
            <div class="card-body">
                <div class="bg-warning w-100 h-100">
                    <p class="text-center">${taskList[i].title}</p>
                </div>
                <div>
                    <p>- ${taskList[i].text} </p>
                </div>
                <div class="options row">
                    <button class="btn btn-danger" onClick="deleteTask(${i})">Delete</button>
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

printTasks();