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
}

export { renderProjects, renderTodos, setupEventListeners };