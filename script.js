let task = [];
let taskcount = 0;
let completedcount = 0;

// DOM elements - FIXED to match your HTML IDs exactly
const taskinput = document.getElementById("taskInput");  // Your HTML has "taskInput"
const addbtn = document.getElementById("addBtn");        // Your HTML has "addBtn" 
const tasklist = document.getElementById("taskList");    // Your HTML has "taskList"
const clearbtn = document.getElementById("clearAllBtn"); // Your HTML has "clearAllBtn"

// Functions
function addtask() {
    const taskname = taskinput.value.trim();
    
    // Check if input is empty
    if (taskname === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create task object
    const newtask = {
        id: ++taskcount,
        text: taskname,
        completed: false
    };
    
    // Add task to array
    task.push(newtask);
    
    // Clear input field
    taskinput.value = '';
    
    // Update the display
    rendertasks();
}

function rendertasks() {
    // Clear existing tasks from display
    tasklist.innerHTML = '';
    
    // Check if no tasks exist
    if (task.length === 0) {
        tasklist.innerHTML = '<li class="empty-message">No tasks yet. Add one above!</li>';
        return;
    }
    
    // Loop through each task and create HTML
    task.forEach(taskitem => {
        // Create list item element
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Create the HTML content for each task
        li.innerHTML = `
            <span class="task-text ${taskitem.completed ? 'completed' : ''}">${taskitem.text}</span>
            <div class="task-buttons">
                <button onclick="togglecomplete(${taskitem.id})" class="complete-btn">
                    ${taskitem.completed ? 'Undo' : 'Complete'}
                </button>
                <button onclick="deletetask(${taskitem.id})" class="delete-btn">Delete</button>
            </div>
        `;
        
        // Add the list item to the task list
        tasklist.appendChild(li);
    });
    
    // Update completed count
    updatecounts();
}

function togglecomplete(taskid) {
    // Find the task with matching ID
    const tasktochange = task.find(t => t.id === taskid);
    
    if (tasktochange) {
        // Toggle completed status
        tasktochange.completed = !tasktochange.completed;
        
        // Update completed count
        if (tasktochange.completed) {
            completedcount++;
        } else {
            completedcount--;
        }
        
        // Re-render tasks
        rendertasks();
    }
}

function deletetask(taskid) {
    // Find task and check if it was completed
    const tasktoremove = task.find(t => t.id === taskid);
    if (tasktoremove && tasktoremove.completed) {
        completedcount--; // Decrease completed count if deleting completed task
    }
    
    // Remove task from array
    task = task.filter(t => t.id !== taskid);
    
    // Re-render tasks
    rendertasks();
}

function clearalltasks() {
    // Check if there are tasks to clear
    if (task.length === 0) {
        alert('No tasks to clear!');
        return;
    }
    
    // Confirm before clearing
    if (confirm('Are you sure you want to clear all tasks?')) {
        task = [];              // Empty the task array
        completedcount = 0;     // Reset completed count
        rendertasks();          // Update display
    }
}

function updatecounts() {
    // Recalculate completed count (in case of inconsistencies)
    completedcount = task.filter(t => t.completed).length;
    
    // You can display counts somewhere in your HTML if needed
    console.log(`Total tasks: ${task.length}, Completed: ${completedcount}`);
}

// Event Listeners - Wait for DOM to load first
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    addbtn.addEventListener('click', addtask);
    clearbtn.addEventListener('click', clearalltasks);

    // Add task when Enter key is pressed
    taskinput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addtask();
        }
    });

    // Initial render (in case there are pre-existing tasks)
    rendertasks();
});