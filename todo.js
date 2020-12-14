import fs from 'fs';
import minimist from 'minimist';
import Todo from './Todoclass.js';
import CheckTodo from './Checktodo.js';

const args = minimist(process.argv);
const argument = Object.keys(args)[1];
const value = Object.values(args)[1];
const jsonContent = fs.readFileSync('todos.json', 'utf-8');
const jsonTodos = JSON.parse(jsonContent);

// Todo app elindítása, üres argumentum esetén a kézikönyv kinyomtatása
function startTodo() {
    if (Object.keys(args).length < 2) {
        printTodoManual();
    } else if (argument !== 'l' && argument !== 'a' && argument !== 'r' && argument !== 'c') {
        console.log('Nem támogatott argumentum!');
        console.log();
        printTodoManual();
    }
}
startTodo();

// Argumentumok ellenőrzése
new CheckTodo( args, jsonTodos ).check();

// A  kézikönyv kinyomtatása
function printTodoManual() {
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
}

// Todo-k listázása
function printTodos() {
    if (jsonTodos.length > 1 && argument === 'l' && typeof args.l === 'boolean') {
        for (let i = 0; i < jsonTodos.length; i++) {
            let index = i + 1;
            let status = jsonTodos[i].done ? "[x]" : "[ ]";
            let text = jsonTodos[i].name;
            console.log(`${index} - ${status} ${text}`);
        }
    }
}
printTodos();

// új Todo hozzáadása
function AddNewTodos() {
    if (process.argv.length > 4) {
    console.log('Egyszerre csak egy feladatot lehet megadni, szöveges formában és " " jelek között!');
    } else if (typeof args.a === 'string') {
        new Todo(args.a).addTodo(jsonTodos);
    }
    fs.writeFileSync('todos.json', JSON.stringify(jsonTodos, null, 4));
}
AddNewTodos();

// Todo eltávolítása
function removeTodo() {
    if (argument === 'r' && typeof args.r === 'number' && value <= jsonTodos.length) {
       new Todo().removeTodo(jsonTodos, args.r);
    }
    fs.writeFileSync('todos.json', JSON.stringify(jsonTodos, null, 4));
}
removeTodo();

// feladat elvégzése
function todoDone() {
    if (argument === 'c' && typeof args.c === 'number' && value <= jsonTodos.length) {
        new Todo().setStatusDone(jsonTodos, args.c)
    }
    fs.writeFileSync('todos.json', JSON.stringify(jsonTodos, null, 4));
}

todoDone();