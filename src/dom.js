import { getProjects, addProject } from './app';

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

            renderTodos(project);
        });

        projectsList.appendChild(li);
    });

    const firstLi = projectsList.querySelector('li');
    firstLi.classList.add('selected-project');
}

function renderTodos(project) {
  
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
    });

    closeProjectModalBtn.addEventListener('click', () => {
        projectModalOverlay.classList.add('hidden');
        projectTitleInput.value = "";
    });

    addTodoBtn.addEventListener('click', () => {
        todoModalOverlay.classList.remove('hidden');
    });

    submitTodoBtn.addEventListener('click', () => {
        
    });

    closeTodoModalBtn.addEventListener('click', () => {
        todoModalOverlay.classList.add('hidden');
        todoTitleInput.value = "";
        todoDescInput.value = "";
        todoDateInput.value = "";
        todoPriorityInput.value = "low";
    }); 


}

export { renderProjects, renderTodos, setupEventListeners };