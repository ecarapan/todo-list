import { getProjects, addProject, addTodoToCurrentProject, switchProject, getCurrentProject, setTodoCompleted, removeProject, removeTodoFromCurrentProject, updateTodoInCurrentProject } from './app';

let currentTodoId = null;

function selectFirstProject() {
    const projectsList = document.querySelector('.projects');
    const firstLi = projectsList.querySelector('li');
    if (firstLi) {
        firstLi.classList.add('selected-project');
        const firstProject = getProjects().find(p => p.id == firstLi.dataset.projectId);
        if (firstProject) {
            switchProject(firstProject);
            renderTodos();
        }
    }
}

function renderProjects() {
    const projectsList = document.querySelector('.projects');
    projectsList.innerHTML = '';

    getProjects().forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.title;
        li.dataset.projectId = project.id; 
        projectsList.appendChild(li);
    });
}

function renderTodos() {
    const project = getCurrentProject();
    const todosList = document.querySelector('.todos');
    todosList.innerHTML = '';

    if (!project) return;

    project.todoList.forEach(todo => {
        const li = document.createElement('li');
        li.dataset.todoId = todo.id; 

        if (todo.completed) {
            li.classList.add('checked');
        }

        li.innerHTML = `
            <div class="todo-main">
                <input type="checkbox" class="complete-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-title">Todo: ${todo.title}</span>
            </div>
            <div class="todo-details">
                <span class="todo-desc">Description: ${todo.description}</span>
                <span class="todo-priority">Priority: ${todo.priority}</span>
                <span class="todo-date">Date: ${todo.dueDate}</span>
                <button class="todo-edit-btn" title="Edit">&#x22EE;</button>
            </div>
        `;
        todosList.appendChild(li);
    });
}

function setupEventListeners() {
    // Modal elements
    const projectModalOverlay = document.getElementById('project-modal-overlay');
    const todoModalOverlay = document.getElementById('todo-modal-overlay');
    const editTodoModalOverlay = document.getElementById('edit-todo-modal-overlay');

    // Project Modal
    const addProjectBtn = document.querySelector('.add-project');
    const closeProjectModalBtn = document.getElementById('close-project-modal-btn');
    const submitProjectBtn = document.getElementById('submit-project-btn');
    const projectTitleInput = document.getElementById('project-title-input');
    const deleteProjectBtn = document.querySelector('.delete-project');

    // Todo Modal
    const addTodoBtn = document.querySelector('.add-todo');
    const closeTodoModalBtn = document.getElementById('close-todo-modal-btn');
    const submitTodoBtn = document.getElementById('submit-todo-btn');
    const todoTitleInput = document.getElementById('todo-title-input');
    const todoDescInput = document.getElementById('todo-desc-input');
    const todoDateInput = document.getElementById('todo-date-input');
    const todoPriorityInput = document.getElementById('todo-priority-input');

    // Edit Todo Modal
    const closeEditTodoModalBtn = document.getElementById('close-edit-todo-modal-btn');
    const updateTodoBtn = document.getElementById('update-todo-btn');
    const editTodoTitleInput = document.getElementById('edit-todo-title-input');
    const editTodoDescInput = document.getElementById('edit-todo-desc-input');
    const editTodoDateInput = document.getElementById('edit-todo-date-input');
    const editTodoPriorityInput = document.getElementById('edit-todo-priority-input');
    const deleteTodoBtn = document.getElementById('delete-todo-btn');

    // Lists for event delegation
    const projectsList = document.querySelector('.projects');
    const todosList = document.querySelector('.todos');

    // Events for Project List 
    projectsList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const projectId = e.target.dataset.projectId;
            const project = getProjects().find(p => p.id == projectId);
            if (project) {
                projectsList.querySelectorAll('li').forEach(item => item.classList.remove('selected-project'));
                e.target.classList.add('selected-project');
                switchProject(project);
                renderTodos();
            }
        }
    });

    // Events for Todo List 
    todosList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;
        const todoId = li.dataset.todoId;

        // Checkbox click
        if (e.target.classList.contains('complete-checkbox')) {
            setTodoCompleted(todoId, e.target.checked);
            li.classList.toggle('checked', e.target.checked);
        }

        // Edit button click
        if (e.target.classList.contains('todo-edit-btn')) {
            currentTodoId = todoId;
            const todo = getCurrentProject().todoList.find(t => t.id == todoId);
            if (todo) {
                editTodoModalOverlay.classList.remove('hidden');
                editTodoTitleInput.value = todo.title;
                editTodoDescInput.value = todo.description;
                editTodoDateInput.value = todo.dueDate;
                editTodoPriorityInput.value = todo.priority;
            }
        }
    });

    // Listeners for Edit Todo Modal 
    updateTodoBtn.addEventListener('click', () => {
        if (!currentTodoId) return;
        const updates = {
            title: editTodoTitleInput.value,
            description: editTodoDescInput.value,
            dueDate: editTodoDateInput.value,
            priority: editTodoPriorityInput.value
        };
        updateTodoInCurrentProject(currentTodoId, updates);
        editTodoModalOverlay.classList.add('hidden');
        renderTodos();
        currentTodoId = null;
    });

    deleteTodoBtn.addEventListener('click', () => {
        if (!currentTodoId) return;
        removeTodoFromCurrentProject(currentTodoId);
        editTodoModalOverlay.classList.add('hidden');
        renderTodos();
        currentTodoId = null;
    });

    closeEditTodoModalBtn.addEventListener('click', () => {
        editTodoModalOverlay.classList.add('hidden');
        currentTodoId = null;
    });

    // Other Listeners 
    addProjectBtn.addEventListener('click', () => {
        projectModalOverlay.classList.remove('hidden');
    });

    submitProjectBtn.addEventListener('click', () => {
        addProject(projectTitleInput.value);
        projectModalOverlay.classList.add('hidden');
        projectTitleInput.value = "";
        renderProjects();
        const lastLi = projectsList.querySelector('li:last-child');
        if (lastLi) {
            projectsList.querySelectorAll('li').forEach(item => item.classList.remove('selected-project'));
            lastLi.classList.add('selected-project');
        }
        renderTodos();
    });

    closeProjectModalBtn.addEventListener('click', () => {
        projectModalOverlay.classList.add('hidden');
        projectTitleInput.value = "";
    });

    addTodoBtn.addEventListener('click', () => {
        todoModalOverlay.classList.remove('hidden');
    });

    submitTodoBtn.addEventListener('click', () => {
        const todoData = {
            title: todoTitleInput.value,
            description: todoDescInput.value,
            dueDate: todoDateInput.value,
            priority: todoPriorityInput.value
        };
        addTodoToCurrentProject(todoData);
        todoModalOverlay.classList.add('hidden');
        todoTitleInput.value = "";
        todoDescInput.value = "";
        todoDateInput.value = "";
        todoPriorityInput.value = "low";
        renderTodos();
    });

    closeTodoModalBtn.addEventListener('click', () => {
        todoModalOverlay.classList.add('hidden');
        todoTitleInput.value = "";
        todoDescInput.value = "";
        todoDateInput.value = "";
        todoPriorityInput.value = "low";
    });

    deleteProjectBtn.addEventListener('click', () => {
        if (getProjects().length <= 1) return;
        removeProject();
        renderProjects();
        selectFirstProject();
    });
}

export { renderProjects, renderTodos, setupEventListeners, selectFirstProject };