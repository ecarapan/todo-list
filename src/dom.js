import { getProjects, addProject, addTodoToCurrentProject, switchProject, getCurrentProject, setTodoCompleted, removeProject, removeTodoFromCurrentProject, updateTodoInCurrentProject } from './app';

function selectFirstProject() {
    const projectsList = document.querySelector('.projects');
    const firstLi = projectsList.querySelector('li');
    firstLi.classList.add('selected-project');

    const firstProject = getProjects()[0];
    switchProject(firstProject);
    renderTodos();
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
            renderTodos();
        });

        projectsList.appendChild(li);
    });
}

function renderTodos() {
    const project = getCurrentProject();
    const todosList = document.querySelector('.todos');
    todosList.innerHTML = '';

    project.todoList.forEach(todo => {
        const li = document.createElement('li');

        if (todo.completed) {
            li.classList.add('checked');
        }

        li.innerHTML = `
            <div class="todo-main">
                <input type="checkbox" class="complete-checkbox" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
                <span class="todo-title">Todo: ${todo.title}</span>
            </div>
            <div class="todo-details">
                <span class="todo-desc">Description: ${todo.description}</span>
                <span class="todo-priority">Priority: ${todo.priority}</span>
                <span class="todo-date">Date: ${todo.dueDate}</span>
                <button class="todo-edit-btn" title="Edit">&#x22EE;</button>
            </div>
        `;

        const checkbox = li.querySelector('.complete-checkbox')
        checkbox.addEventListener('click', () => {
            setTodoCompleted(checkbox.dataset.id, checkbox.checked);
            if (checkbox.checked) {
                li.classList.add('checked');
            } else {
                li.classList.remove('checked');
            }
            
        });

        const editBtn = li.querySelector('.todo-edit-btn');
        const editTodoModalOverlay = document.getElementById('edit-todo-modal-overlay');
        const closeEditTodoModalBtn = document.getElementById('close-edit-todo-modal-btn');
        const updateTodoBtn = document.getElementById('update-todo-btn');
        const editTodoTitleInput = document.getElementById('edit-todo-title-input');
        const editTodoDescInput = document.getElementById('edit-todo-desc-input');
        const editTodoDateInput = document.getElementById('edit-todo-date-input');
        const editTodoPriorityInput = document.getElementById('edit-todo-priority-input');
        const deleteTodoBtn = document.getElementById('delete-todo-btn');

        editBtn.addEventListener('click', () => {
            editTodoModalOverlay.classList.remove('hidden');
            editTodoTitleInput.value = todo.title;
            editTodoDescInput.value = todo.description;
            editTodoDateInput.value = todo.dueDate;
            editTodoPriorityInput.value = todo.priority;
        });

        updateTodoBtn.addEventListener('click', () => {
            const updates = {
                title: editTodoTitleInput.value,
                description: editTodoDescInput.value,
                dueDate: editTodoDateInput.value,
                priority: editTodoPriorityInput.value
            };
            updateTodoInCurrentProject(todo, updates);

            editTodoModalOverlay.classList.add('hidden');
            renderTodos();
        });

        closeEditTodoModalBtn.addEventListener('click', () => {
            editTodoModalOverlay.classList.add('hidden');
            editTodoTitleInput.value = todo.title;
            editTodoDescInput.value = todo.description;
            editTodoDateInput.value = todo.dueDate;
            editTodoPriorityInput.value = todo.priority;
        });

        deleteTodoBtn.addEventListener('click', () => {
            removeTodoFromCurrentProject(todo);
            renderTodos();

            editTodoModalOverlay.classList.add('hidden');
        });

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
    const deleteProjectBtn = document.querySelector('.delete-project');

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
        if (lastLi) {
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
        if (getProjects().length === 1) {
            return;
        }

        removeProject();

        renderProjects();
        renderTodos();

        const projectsList = document.querySelector('.projects');
        const firstLi = projectsList.querySelector('li');
        if (firstLi) {
            firstLi.classList.add('selected-project');
        }
        renderTodos();
    });
}

export { renderProjects, renderTodos, setupEventListeners, selectFirstProject };