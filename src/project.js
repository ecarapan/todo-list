import Todo from './todo';

class Project {
    static _idCounter = 0;

    constructor(title) {
        this._id = ++Project._idCounter;
        this._title = title;
        this._todoList = [];
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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