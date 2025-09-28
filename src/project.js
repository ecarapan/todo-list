import Todo from './todo';

class Project {
    constructor(title) {
        this._title = title;
        this._todoList = [];
    }

    get title() {
        return this._title;
    }

    get todoList() {
        return this._todoList;
    }

    addTodo(todo) {
        this._todoList.push(todo);
    }

    removeTodo(todo) {
        this._todoList = this._todoList.filter(item => item !== todo);
    }
}

export default Project;