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

function removeTodoFromCurrentProject(todo) {
    currentProject.removeTodo(todo);

    saveToStorage();
}

function updateTodoInCurrentProject(todo, updates) {
    todo.updateTodo(updates);

    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadFromStorage() {
    const data = localStorage.getItem('projects');
    if (data) {
        const parsed = JSON.parse(data);

        projects = parsed.map(proj => {
            const project = new Project(proj._title);
            proj._todoList.forEach(todoData => {
                const todo = new Todo(
                    todoData._title,
                    todoData._description,
                    todoData._dueDate,
                    todoData._priority
                );
                todo.id = todoData.id;
                todo.completed = todoData._completed;
                project.addTodo(todo);
            });
            return project;
        });

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
