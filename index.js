import minimist from 'minimist';

const args = minimist( process.argv );

const todos = [];

todos.push('Kutyát sétáltatni.');

console.log(todos);

if (typeof args.u === 'string' && typeof args.p === 'string') {
    console.log( `Logged in as ${ args.u }:${ args.p }` );
}