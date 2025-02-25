document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const clearTasksButton = document.getElementById('clearTasksButton');
    const taskList = document.getElementById('taskList');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeTask(task);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            addTaskToDOM(task);
            taskInput.value = '';
        }
    }

    function removeTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTaskList();
    }

    function clearTasks() {
        localStorage.removeItem('tasks');
        taskList.innerHTML = '';
    }

    function loadTaskList() {
        taskList.innerHTML = '';
        loadTasks();
    }

    addTaskButton.addEventListener('click', addTask);
    clearTasksButton.addEventListener('click', clearTasks);

    loadTasks(); // Load tasks when the page loads
});
