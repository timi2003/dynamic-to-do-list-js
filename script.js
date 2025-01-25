//Setup Event Listener for Page Load:
document.addEventListener("DOMContentLoaded", () => {
//Select DOM Elements:
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
//Create the addTask Function
    function addTask(taskText, save = true){

        if(!taskText){
         taskText = taskInput.value.trim();
        }
        if(taskText == ""){
            alert("please enter a task");

            return;
        }
       
        //Task Creation and Removal:
        
            const taskItem = document.createElement("li");
            taskItem.textContent = taskText;

            const removeButton = document.createElement("button");
            removeButton.textContent = "remove";
            removeButton.className = "remove-btn";

            removeButton.onclick = () => {
                // removeButton.addEventListener('click', () => {
                    taskList.removeChild(taskItem)
                    removeTask(taskText)
                };
                    taskItem.appendChild(removeButton)
                    taskList.appendChild(taskItem);

        if(save){
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || "[]");
            storedTasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(storedTasks));
            }
                

        taskInput.value = "";
    }

//Initialize and Load Tasks:
        function loadTasks(){
       const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.forEach(taskText => addTask(taskText, false));

        }
          //function to remove a task
    function removeTask(taskText){
        let tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
loadTasks();

    addButton.addEventListener("click", () => addTask());
    taskInput.addEventListener("keypress", (event) => {
        if(event.key == "Enter"){
            addTask();
        }
    });

});

