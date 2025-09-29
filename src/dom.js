import { getProjects } from './app';

function renderProjects() {
    const projectsList = document.querySelector('.projects');
    projectsList.innerHTML = '';

    getProjects().forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.title;
        projectsList.appendChild(li);
    });
}

function renderTodos() {
  
}

function setupEventListeners() {
  
}


export { renderProjects, renderTodos, setupEventListeners };