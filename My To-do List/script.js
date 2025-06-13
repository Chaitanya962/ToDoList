document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const todoListUL = document.getElementById("todoList");
    const clearCompletedBtn = document.getElementById("clearCompleted");
    const themeToggle = document.getElementById("themeToggle");

    // Retrieve tasks and dark mode preference from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let darkModeEnabled = localStorage.getItem("darkMode") === "true";

    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Render the list of tasks
    function renderTasks() {
        todoListUL.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            if (task.completed) {
                li.classList.add("completed");
            }

            // Checkbox for task completion
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked;
                if (task.completed) {
                    li.classList.add("completed");
                } else {
                    li.classList.remove("completed");
                }
                saveTasks();
            });
            li.appendChild(checkbox);

            // Task text
            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskText.className = "task-text";
            li.appendChild(taskText);

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                // Animate deletion
                li.style.transform = "translateX(100%)";
                li.style.opacity = "0";
                setTimeout(() => {
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                }, 300);
            });
            li.appendChild(deleteBtn);

            todoListUL.appendChild(li);
        });
    }

    renderTasks();

    // Handler for adding a new task
    addTaskBtn.addEventListener("click", () => {
        const text = taskInput.value.trim();
        if (text !== "") {
            tasks.push({
                text,
                completed: false
            });
            saveTasks();
            renderTasks();
            taskInput.value = "";
        }
    });

    // Support "Enter" key for adding tasks
    taskInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            addTaskBtn.click();
        }
    });

    // Clear all completed tasks
    clearCompletedBtn.addEventListener("click", () => {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    });

    // Toggle Dark Mode
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        darkModeEnabled = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", darkModeEnabled);
    });
});