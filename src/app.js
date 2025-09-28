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

function removeProject(project) {
    projects = projects.filter(item => item !== project);

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

    projects = parsed.map(proj =>
      new Project(
        proj._title,
        proj._todoList.map(
          todo => new Todo(todo._title, todo._description, todo._dueDate, todo._priority)
        )
      )
    );

    currentProject = projects[0] || null;
  }
}

function startApp() {
    loadFromStorage();

    if (projects.length === 0) {
        const defaultProject = new Project('Default');
        projects.push(defaultProject);
        currentProject = defaultProject;
    }
}

export {
  startApp,
  addProject,
  removeProject,
  switchProject,
  addTodoToCurrentProject,
  removeTodoFromCurrentProject,
  updateTodoInCurrentProject
};
