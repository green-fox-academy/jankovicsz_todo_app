class Todo {
    name;
    done = false;

    constructor(name) {
        this.name = name;
    }

    addTodo(arr) {
        arr.push(this);
        return this;
    }

    printTodoManual() {
        console.log(
            '============================= \n' +
            'Parancssori Todo applikáció \n' +
            '============================= \n' +
            '\n' +
            'Parancssori argumentumok:\n' +
            '    -l   Kilistázza a feladatokat \n' +
            '    -a   Új feladatot ad hozzá \n' +
            '    -r   Eltávolít egy feladatot \n' +
            '    -c   Teljesít egy feladatot\n'
        );
        return this;
    }
}

export default Todo;