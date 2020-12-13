class Todo {
    name;
    done = false;

    constructor(name = '') {
        this.name = name;
    }

    addTodo(arr) {
        arr.push(this);
        return this;
    }

    removeTodo(arr, index) {
        arr.splice(index - 1, 1);
        return this;
    }

    setStatusDone(arr, index) {
        arr[index - 1].done = true;
        return this;
    }
}

export default Todo;