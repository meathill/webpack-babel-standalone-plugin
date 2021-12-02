const arr = [];

arr[1] = 'foo';

async function foo() {
    let greeting = await import('./lib');
    greeting = await greeting.default();
    console.log(greeting);
}
foo();

arr[1] = 'bar';
