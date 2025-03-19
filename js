class Task {
constructor(taskName, dueDate, priority) { this.taskName = taskName; this.dueDate = dueDate;
this.priority = priority; this.completed = false;
}
getTaskDetail() {
return `${this.taskName} - Due: ${this.dueDate}, Priority: ${this.priority}, Completed:
${this.completed}`;
}

toggleCompletion() {
this.completed = !this.completed;
}
}
let taskList = []; function addTaskUI() {
const taskName = document.getElementById('taskName').value.trim(); const dueDate = document.getElementById('dueDate').value;
const priority = document.getElementById('priority').value;
if (!taskName || !dueDate) {
alert('Please fill out all fields before adding a task.'); return;
}
const task = new Task(taskName, dueDate, priority); taskList.push(task);
renderTasks(); saveTasks(); clearInputs();
}
function renderTasks(filter = 'all') {
const tasksContainer = document.getElementById('tasks'); tasksContainer.innerHTML = ''; // Clear existing tasks
const filteredTasks = taskList.filter((task) => {
if (filter === 'completed') return task.completed;
if (filter === 'notCompleted') return !task.completed; return true;
});
 
filteredTasks.forEach((task, index) => {
const taskDiv = document.createElement('div'); taskDiv.className = `task ${task.completed ? 'completed' : ''}`; taskDiv.innerHTML = `
<span>${task.getTaskDetail()}</span>
<div>
<button onclick="toggleTaskCompletion(${index})">Toggle</button>
<button onclick="deleteTask(${index})">Delete</button>
</div>
 

});
}
 
`;
tasksContainer.appendChild(taskDiv);
 
function toggleTaskCompletion(index) { taskList[index].toggleCompletion(); renderTasks();
saveTasks();
}
function deleteTask(index) { taskList.splice(index, 1); renderTasks(); saveTasks();
}
function filterTasks() {
const filterCriteria = document.getElementById('filterCriteria').value; renderTasks(filterCriteria);
}
function clearInputs() {
document.getElementById('taskName').value = ''; document.getElementById('dueDate').value = ''; document.getElementById('priority').value = 'High';
}
async function saveTasks() {
const taskJSON = JSON.stringify(taskList); localStorage.setItem('tasks', taskJSON);
}
async function loadTasks() {
const savedTasks = localStorage.getItem('tasks'); if (savedTasks) {
taskList = JSON.parse(savedTasks).map((task) => {
const { taskName, dueDate, priority, completed } = task; const newTask = new Task(taskName, dueDate, priority); newTask.completed = completed;
return newTask;
});
renderTasks();
 
}
}
window.onload = loadTasks; 
