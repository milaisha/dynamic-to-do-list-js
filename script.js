// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 3: Load Tasks from Local Storage when the page loads
    function loadTasks() {
        // Retrieve tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Add each task to the DOM
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // 'false' indicates not to save again to Local Storage
        });
    }

    // Step 4: Create the addTask Function
    function addTask(taskText, save = true) {
        // Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // Use classList.add to add the class

        // Add an event listener to the remove button to delete the task
        removeButton.onclick = function () {
            taskList.removeChild(li); // Remove the task from the DOM
            updateLocalStorage(); // Update Local Storage after removal
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Save the task to Local Storage if 'save' is true
        if (save) {
            updateLocalStorage();
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Step 5: Update Local Storage
    function updateLocalStorage() {
        // Get all tasks from the DOM
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.textContent.replace("Remove", "").trim()); // Remove the button text
        });

        // Save tasks to Local Storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Step 6: Attach Event Listeners
    // Add task when the "Add Task" button is clicked
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText); // Add the task and save to Local Storage
        } else {
            alert("Please enter a task!");
        }
    });

    // Add task when the "Enter" key is pressed in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText); // Add the task and save to Local Storage
            } else {
                alert("Please enter a task!");
            }
        }
    });

    // Step 7: Load tasks from Local Storage when the page loads
    loadTasks();
});
