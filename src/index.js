const arr = [];

arr[1] = 'foo';

async function foo() {
    const greeting = await import('./lib');
    console.log(greeting);
    console.log(next);
}
foo();

arr[1] = 'bar';
