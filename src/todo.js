class Todo {
    constructor(title, description, dueDate, priority) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = false;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get dueDate() {
        return this._dueDate;
    }

    get priority() {
        return this._priority;
    }
    
    get completed() {
        return this._completed;
    }

    set completed(value) {
        this._completed = value;
    }

    updateTodo(updates) {
        if (updates.title !== undefined) this._title = updates.title;
        if (updates.description !== undefined) this._description = updates.description;
        if (updates.dueDate !== undefined) this._dueDate = updates.dueDate;
        if (updates.priority !== undefined) this._priority = updates.priority;
    }
}

export default Todo;