document.getElementById('addTaskForm').addEventListener('submit', saveTask);

function saveTask(e) {
    let taskTitle = document.getElementById('taskTitle').value;
    let taskText  = document.getElementById('taskText').value;
    const task = {
        title: taskTitle,
        text: taskText
    }

    if(localStorage.getItem('taskList') === null) {
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
        console.log(taskList.length);
        const task = taskList[i];
        let title = task.title;
        let desc = task.text;
        divContent = "";
        j = i + 1;

        if(j < taskList.length) {
            divContent += 
            `<div class="row pb-3">
                <div class="col-6">
                    <div class="card">
                        <div class="card-body">
                        <div class="bg-warning w-100 h-100"><p class="text-center">${title}</p></div>
                            <p>- ${desc} </p>
                        </div>
                    </div>
                </div>`
            title = taskList[j].title;
            desc = taskList[j].text;
            divContent += 
                `<div class="col-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="bg-warning w-100 h-100"><p class="text-center">${title}</p></div>
                            <p>- ${desc} </p>
                        </div>
                    </div>
                </div>`;
        }
        else {
            divContent +=`<div class="col-6">
            <div class="card">
                <div class="card-body">
                <div class="bg-warning w-100 h-100"><p class="text-center">${title}</p></div>
                    <p>- ${desc} </p>
                </div>
            </div>
        </div>`
        }
        taskDiv.innerHTML += divContent;   
    }
}
printTasks();