import fs from 'fs';
import minimist from 'minimist';
import Todo from './Todoclass.js'

const args = minimist(process.argv);
const argument = Object.keys(args)[1];

// Todo app elindítása, üres argumentum esetén a kézikönyv kinyomtatása
function startTodo() {
    if (Object.keys(args).length < 2) {
        printTodoManual();
    } else if (argument !== 'l' && argument !== 'a' && argument !== 'r' && argument !== 'c') {
        console.log('Nem támogatott argumentum!');
    }
}

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
    return this;
}

// Todo-k listázása
function printTodos() {
    const jsonContent = fs.readFileSync('todos.json', 'utf-8');
    const jsonTodos = JSON.parse(jsonContent);
    if (jsonTodos.length < 1 && argument === 'l' && typeof args.l === 'boolean') {
        console.log('Nincs mára tennivalód! :)');
    } if (argument === 'l' && typeof args.l !== 'boolean') {
        console.log('A feladatok listázása: -l, további argumentumok nem szükségesek!');
    } else if (argument === 'l' && typeof args.l === 'boolean') {
        for (let i = 0; i < jsonTodos.length; i++) {
            let index = i + 1;
            let status = jsonTodos[i].done ? "[x]" : "[ ]";
            let text = jsonTodos[i].name;
            console.log(`${index} - ${status} ${text}`);
        }
    }
}

// új Todo hozzáadása
function AddNewTodos() {
    const jsonContent = fs.readFileSync('todos.json', 'utf-8');
    let jsonTodos = JSON.parse(jsonContent);
    if (typeof args.a === 'boolean') {
        console.log("Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!");
    } if (typeof args.a === 'number') {
        console.log("Nem lehetséges új feladat hozzáadása: a feladatot szöveges formában kell megadni!");
    } if (typeof args.a === 'string' && process.argv.length > 4) {
        console.log('Egyszerre csak egy feladatot lehet megadni, szöveges formában és " " jelek között!');
    } else if (typeof args.a === 'string' && process.argv.length < 5) {
        const todo = new Todo(args.a).addTodo(jsonTodos);
    }
    fs.writeFileSync('todos.json', JSON.stringify(jsonTodos, null, 4));
}

// Todo eltávolítása
function removeTodo() {
    const jsonContent = fs.readFileSync('todos.json', 'utf-8');
    let jsonTodos = JSON.parse(jsonContent);
    if (typeof args.r === 'boolean') {
        console.log("Nem lehetséges az eltávolítás: nem adtál meg indexet!");
    } if (typeof args.r === 'string') {
        console.log("Nem lehetséges az eltávolítás: a megadott index nem szám!");
    } if (args.r > jsonTodos.length) {
        console.log('Nem lehetséges az eltávolítás: túlindexelési probléma adódott!');
    }  if (args.r === 0) {
        console.log('Nem támogatott érték!');
    }
    else if (typeof args.r === 'number') {
        const todo = new Todo().removeTodo(jsonTodos, args.r);
    }
    fs.writeFileSync('todos.json', JSON.stringify(jsonTodos, null, 4));
}

// feladat elvégzése
function todoDone() {
    const jsonContent = fs.readFileSync('todos.json', 'utf-8');
    let jsonTodos = JSON.parse(jsonContent);
    if (typeof args.c === 'boolean') {
        console.log("Nem lehetséges a feladat végrehajtása: nem adtál meg indexet!");
    } if (typeof args.c === 'string') {
        console.log("Nem lehetséges a feladat végrehajtása: a megadott index nem szám!");
    } if (args.c > jsonTodos.length) {
        console.log('Nem lehetséges a feladat végrehajtása: túlindexelési probléma adódott!');
    } if (args.c === 0) {
        console.log('Nem támogatott érték!');
    }
    else if (typeof args.c === 'number') {
        const todo = new Todo().setStatusDone(jsonTodos, args.c)
        //jsonTodos[args.c - 1].done = true;
    }
    fs.writeFileSync('todos.json', JSON.stringify(jsonTodos, null, 4));
}

startTodo();
printTodos();
AddNewTodos();
removeTodo();
todoDone();
