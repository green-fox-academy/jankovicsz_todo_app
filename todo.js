import fs from 'fs';
import minimist from 'minimist';

const args = minimist(process.argv);
const argument = Object.keys(args)[1];

// Todo app elindítása
function startTodo() {
    if (Object.keys(args).length < 2) {
        printTodoManual();
    } else if (argument !== 'l' && argument !== 'a' && argument !== 'r' && argument !== 'c') {
        console.log('Nem támogatott argumentum!');
    }
}

// A kézikönyv kinyomtatása
function printTodoManual() {
    let todoManual = fs.readFileSync('todo_man.txt', 'utf-8');
    console.log(todoManual);
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
        let newTodo = {
            name: args.a,
            done: false
        };
        jsonTodos.push(newTodo);
    }
    fs.writeFileSync('todos.json', JSON.stringify(jsonTodos, null, 4));
}

// Todo eltávolítása
function removeTodo() {
    const jsonContent = fs.readFileSync('todos.json', 'utf-8');
    let jsonTodos = JSON.parse(jsonContent);
    if (typeof args.r === 'boolean') {
        console.log("Nem lehetséges az eltávolítás: nem adott meg indexet!");
    } if (typeof args.r === 'string') {
        console.log("Nem lehetséges az eltávolítás: a megadott index nem szám!");
    } if (args.r > jsonTodos.length) {
        console.log('Nem lehetséges az eltávolítás: túlindexelési probléma adódott!');
    }  if (args.r === 0) {
        console.log('Nem támogatott érték!');
    }
    else if (typeof args.r === 'number') {
        jsonTodos.splice(args.r - 1, 1);
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
        jsonTodos[args.c - 1].done = true;
    }
    fs.writeFileSync('todos.json', JSON.stringify(jsonTodos, null, 4));
}

startTodo();
printTodos();
AddNewTodos();
removeTodo();
todoDone();