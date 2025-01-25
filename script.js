document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Add a task to the list
    function addTask(taskText, save = true) {
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
            removeTask(taskText);
        };

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        taskInput.value = "";
    }

    // Load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => addTask(taskText, false));
    }

    // Remove a task from Local Storage
    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initialize
    loadTasks();

    // Add event listeners
    addButton.addEventListener("click", () => addTask());
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
