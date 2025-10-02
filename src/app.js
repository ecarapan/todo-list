import Project from './project';
import Todo from './todo';

let projects = [];
let currentProject = null;

function addProject(title) {
    const newProject = new Project(title);
    projects.push(newProject);
    currentProject = newProject;

    saveToStorage();
}

function removeProject() {
    projects = projects.filter(item => item !== currentProject);
    currentProject = projects[0] || null;

    saveToStorage();
}

function switchProject(project) {
    currentProject = project;
}

function addTodoToCurrentProject(todoData) {
    const newTodo = new Todo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority
    );
    currentProject.addTodo(newTodo);

    saveToStorage();
}

function removeTodoFromCurrentProject(todoId) {
    const todo = currentProject.todoList.find(t => t.id == todoId);
    if (todo) {
        currentProject.removeTodo(todo);
        saveToStorage();
    }
}

function updateTodoInCurrentProject(todoId, updates) {
    const todo = currentProject.todoList.find(t => t.id == todoId);
    if (todo) {
        todo.updateTodo(updates);
        saveToStorage();
    }
}

function saveToStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadFromStorage() {
    const data = localStorage.getItem('projects');
    if (data) {
        const parsed = JSON.parse(data);
        let maxTodoId = 0;
        let maxProjectId = 0;

        projects = parsed.map(projData => {
            const project = new Project(projData._title);
            project.id = projData._id; 

            if (project.id > maxProjectId) {
                maxProjectId = project.id;
            }

            if (projData._todoList) {
                projData._todoList.forEach(todoData => {
                    const todo = new Todo(
                        todoData._title,
                        todoData._description,
                        todoData._dueDate,
                        todoData._priority
                    );
                    todo.id = todoData._id; 
                    todo.completed = todoData._completed;
                    project.addTodo(todo);

                    if (todo.id > maxTodoId) {
                        maxTodoId = todo.id;
                    }
                });
            }
            return project;
        });

        Project._idCounter = maxProjectId;
        Todo._idCounter = maxTodoId;

        currentProject = projects[0] || null;
    }
}

function getProjects() {
    return projects;
}

function getCurrentProject() {
    return currentProject;
}

function setTodoCompleted(todoId, value) {
    const todo = currentProject.todoList.find(t => t.id == todoId);
    todo.completed = value;

    saveToStorage();
}

function startApp() {
    loadFromStorage();

    if (projects.length === 0) {
        const defaultProject = new Project('Default Project');
        projects.push(defaultProject);
        currentProject = defaultProject;

        saveToStorage();
    }
}

export {
    startApp,
    addProject,
    removeProject,
    switchProject,
    addTodoToCurrentProject,
    removeTodoFromCurrentProject,
    updateTodoInCurrentProject,
    getProjects,
    getCurrentProject,
    setTodoCompleted
};
