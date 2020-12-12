import fs from 'fs';
import minimist from 'minimist';

const args = minimist( process.argv );
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
    let todoManual = fs.readFileSync('todo_man.txt' , 'utf-8' );
    console.log(todoManual);
}

// Todo-k listázása
function printTodos() {
    const jsonContent = fs.readFileSync('todos.json' , 'utf-8');
    const jsonTodos = JSON.parse (jsonContent);
    if (jsonTodos.length < 1 && argument === 'l' && typeof args.l === 'boolean') {
        console.log('Nincs mára tennivalód! :)');
    } else if (argument === 'l' && typeof args.l === 'boolean') {
        for (let i = 0; i < jsonTodos.length; i++) {
            let index = i + 1;
            let status = jsonTodos[i].done ? "[x]" : "[ ]";
            let text = jsonTodos[i].name;
            console.log(`${index} - ${status} ${text}`);
        } 
    } else if (argument === 'l' && typeof args.l !== 'boolean') {
            console.log('A feladatok listázása: -l, további argumentumok nem szükségesek!');
    }
}

// új Todo hozzáadása
function AddNewTodos() {
    const jsonContent = fs.readFileSync('todos.json', 'utf-8');
    let jsonTodos = JSON.parse(jsonContent);
    if (typeof args.a === 'string' && process.argv.length < 5) {
        let newTodo = {
            name: args.a,
            done: false
        };
        jsonTodos.push(newTodo);
    } else if (typeof args.a === 'boolean') {
        console.log("Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!");
    } else if (typeof args.a === 'number') {
        console.log("Nem lehetséges új feladat hozzáadása: a feladatot szöveges formában kell megadni!");
    } else if (typeof args.a === 'string' && process.argv.length > 4) {
        console.log('Egyszerre csak egy feladatot lehet megadni, szöveges formában és " " jelek között!');
    }
    fs.writeFileSync('todos.json', JSON.stringify(jsonTodos, null, 4));
}

startTodo();
printTodos();
AddNewTodos();