import { getProjects, addProject, addTodoToCurrentProject, switchProject, getCurrentProject } from './app';

function selectFirstProject() {
    const projectsList = document.querySelector('.projects');
    const firstLi = projectsList.querySelector('li');
    firstLi.classList.add('selected-project');

    const firstProject = getProjects()[0];
    switchProject(firstProject);
    renderTodos(firstProject);
}

function renderProjects() {
    const projectsList = document.querySelector('.projects');
    projectsList.innerHTML = '';

    getProjects().forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.title;
        
        li.addEventListener('click', () => {
            projectsList.querySelectorAll('li').forEach(item => {
                item.classList.remove('selected-project');
            });
            li.classList.add('selected-project');

            switchProject(project);
            renderTodos(project);
        });

        projectsList.appendChild(li);
    });
}

function renderTodos(project) {
    const todosList = document.querySelector('.todos');
    todosList.innerHTML = '';

    project.todoList.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="todo-main">
                <span class="todo-title">${todo.title}</span>
                <span class="todo-date">${todo.dueDate}</span>
            </div>
            <div class="todo-details">
                <span class="todo-desc">${todo.description}</span>
                <span class="todo-priority ${todo.priority}">${todo.priority}</span>
                <input type="checkbox" class="complete-checkbox" ${todo.completed ? 'checked' : ''}>
            </div>
        `;

        todosList.appendChild(li);
    });

}

function setupEventListeners() {
    const addProjectBtn = document.querySelector('.add-project');
    const projectModalOverlay = document.getElementById('project-modal-overlay');
    const closeProjectModalBtn = document.getElementById('close-project-modal-btn');
    const submitProjectBtn = document.getElementById('submit-project-btn');
    const projectTitleInput = document.getElementById('project-title-input');

    const addTodoBtn = document.querySelector('.add-todo');
    const todoModalOverlay = document.getElementById('todo-modal-overlay')
    const closeTodoModalBtn = document.getElementById('close-todo-modal-btn');
    const submitTodoBtn = document.getElementById('submit-todo-btn');
    const todoTitleInput = document.getElementById('todo-title-input');
    const todoDescInput = document.getElementById('todo-desc-input');
    const todoDateInput = document.getElementById('todo-date-input');
    const todoPriorityInput = document.getElementById('todo-priority-input');

    addProjectBtn.addEventListener('click', () => {
        projectModalOverlay.classList.remove('hidden');
    });

    submitProjectBtn.addEventListener('click', () => {
        addProject(projectTitleInput.value);
        projectModalOverlay.classList.add('hidden');
        projectTitleInput.value = "";
        renderProjects();

        const projectsList = document.querySelector('.projects');
        const lastLi = projectsList.querySelector('li:last-child');
        if (lastLi) lastLi.classList.add('selected-project');
        renderTodos(getCurrentProject());
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

        renderTodos(getCurrentProject());
    });

    closeTodoModalBtn.addEventListener('click', () => {
        todoModalOverlay.classList.add('hidden');
        todoTitleInput.value = "";
        todoDescInput.value = "";
        todoDateInput.value = "";
        todoPriorityInput.value = "low";
    }); 


}

export { renderProjects, renderTodos, setupEventListeners, selectFirstProject };