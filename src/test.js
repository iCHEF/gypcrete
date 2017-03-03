let counter = 0;

export function increment() {
    return counter++;
}

export function decrement() {
    return counter--;
}

export class Foo {
    static type = 'bar';

    speak() {
        console.log('Hello World!')
    }
}
