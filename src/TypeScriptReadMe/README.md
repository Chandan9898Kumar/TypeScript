### TypeScript Generics Guide

`Introduction`

. Basic Syntax

. Common Use Cases

. Best Practices

. Advanced Examples

`Introduction`
Generics in TypeScript allow you to write flexible, reusable code that works with multiple data types while maintaining type safety. They act as type variables that can hold any type you specify when using the component or function.

`Basic Syntax`
Generic Function.

```ts
// Basic generic function
function getFirst<T>(array: T[]): T {
  return array[0];
}

// Usage
const numberResult = getFirst<number>([1, 2, 3]); // returns number
const stringResult = getFirst<string>(["a", "b"]); // returns string
```

`Generic Interface`

```ts
interface Container<T> {
  value: T;
  getValue(): T;
}

// Implementation
class NumberContainer implements Container<number> {
  constructor(public value: number) {}
  getValue(): number {
    return this.value;
  }
}
```

### Common Use Cases.

`1. Generic Components in React`

```ts
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
<List<string>
  items={["Apple", "Banana"]}
  renderItem={(item) => <span>{item}</span>}
/>;
```

`2. Generic API Services`

```ts
class ApiService<T> {
  constructor(private baseUrl: string) {}

  async fetch(id: number): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }
}

// Usage
interface User {
  id: number;
  name: string;
}

const userApi = new ApiService<User>("/api/users");
```

`3. Generic State Management`

```ts
class StateManager<T> {
  private state: T;

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(newState: T): void {
    this.state = newState;
  }
}
```

### Best Practices

`1. Type Constraints`
Use extends to limit the types that can be used with your generic:

```ts
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

// Valid
logLength("string"); // strings have length
logLength([1, 2, 3]); // arrays have length
// Invalid
logLength(123); // numbers don't have length
```

`2. Multiple Type Parameters`

```ts
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair<string, number>("hello", 42);
```

`3. Generic Defaults`

```ts
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

// No need to specify type if using default
const response: ApiResponse = {
  data: "some data",
  status: 200,
  message: "success",
};
```

### Advanced Examples.

`1. Generic Factory Function`

```ts
interface Product {
  id: number;
  name: string;
}

function createFactory<T>(defaultValues: Partial<T>) {
  return (override: Partial<T> = {}): T => {
    return { ...defaultValues, ...override } as T;
  };
}

const createProduct = createFactory<Product>({ id: 0, name: "" });
const product = createProduct({ name: "New Product" });
```

`2. Generic Utility Types`

```ts
// Pick specific properties
type PickedProps<T, K extends keyof T> = Pick<T, K>;

interface User {
  id: number;
  name: string;
  email: string;
}

type UserBasicInfo = PickedProps<User, "name" | "email">;
```

### When to Use Generics

1. Creating reusable components that work with different data types
2. Building utility functions that should work with multiple types
3. Implementing data structures (stacks, queues, etc.)
4. Creating type-safe API services
5. Managing state with different data shapes

### Benefits

- **Type Safety:** Catch errors at compile time
- **Code Reusability:** Write once, use with many types
- **Better IDE Support:** Get proper autocomplete and type checking
- **Reduced Code Duplication:** Avoid writing similar code for different types

### Common Pitfalls to Avoid

1. Overusing generics when simple types would suffice
2. Not constraining generic types when necessary
3. Using `any` instead of proper generic types
4. Creating overly complex generic structures

> **Remember:** Generics are powerful but should be used judiciously. Always aim for the simplest solution that meets your needs while maintaining type safety.

> **NOTE:** Use TypeScript generics to develop reusable, generalized, and type-safe functions, interfaces, and classes.

### The syntax for defining and using generics

1. Generic Functions
   To define a generic function, you specify a type parameter in angle brackets (<T>) before the function's parameters. Here's the syntax:

```ts
Syntax: 
function functionName<T>(param: T): T {
  // function body
}

Example: 
function identity<T>(arg: T): T {
  return arg;
}
```

2. Generic Interfaces
   You can define an interface with a generic type parameter. This allows you to create interfaces that can work with different types.

```ts
Syntax:
 interface InterfaceName<T> {
  property: T;
  method(param: T): void;
}

Example:
interface Box<T> {
  contents: T;
  getContents(): T;
}
```

3. Generic Classes
Similar to interfaces, you can define a class with a generic type parameter. This allows instances of the class to work with different types.

```ts
Syntax:

class ClassName<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    get(index: number): T {
        return this.items[index];
    }
}

Example:

class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }
}

```

4. Generic Constraints.
You can constrain a generic type to ensure it extends a specific type or interface. This is done using the extends keyword.


```ts
Syntax:
function functionName<T extends SomeType>(param: T): void {
    // function body
}

Example:

interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
    console.log(item.length);
}

```
5. Using Multiple Type Parameters
You can define multiple type parameters by separating them with commas.

```ts
Syntax:

function functionName<T, U>(param1: T, param2: U): [T, U] {
    return [param1, param2];
}

Example:
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}
```

6. Default Type Parameters
You can also provide default types for generic parameters. If a type is not specified when the generic is used, the default type will be used.

```ts
Syntax:
function functionName<T = DefaultType>(param: T): T {
    return param;
}

Example :
function log<T = string>(value: T): void {
    console.log(value);
}
```

7. Using Generics with Arrays
You can use generics with arrays to specify the type of elements in the array.


```ts
Syntax:

function getArray<T>(items: T[]): T[] {
    return items;
}

Example :

const numbers = getArray<number>([1, 2, 3]);
const strings = getArray<string>(["a", "b", "c"]);
```


### CODING EXAMPLES:

1. Using `any` type isn’t type-safe, So instead use generic types.

```ts
let numbers = [1, 5, 7, 4, 2, 9];
let colors = ['red', 'green', 'blue'];


function getRandomAnyElement(items: any[]): any {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

console.log(getRandomAnyElement(numbers));
console.log(getRandomAnyElement(colors));


> A better solution to avoid code duplication while preserving the type is to use generics.


>  The following shows a generic function that returns the random element from an array of type T:

function getRandomElement<T>(items: T[]): T {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}



console.log(getRandomElement(numbers));
console.log(getRandomElement(colors));



This function uses type variable T. The T allows you to capture the type provided when calling the function. Additionally, the function uses the T type variable as its return type.

This getRandomElement() function is generic because it can work with any data type including string, number, object

By convention, we use the letter T as the type variable. However, you can freely use other letters such as A, B C

```

### Calling a generic function.

1. The following shows how to use the getRandomElement() with an array of numbers:

```ts
let numbers = [1, 5, 7, 4, 2, 9];
let randomEle = getRandomElement<number>(numbers);
console.log(randomEle);
```

**At Above example explicitly passes number as the T type into the getRandomElement() function.**

2.  In practice, you’ll use type inference ( Type inference describes where and how TypeScript infers types when you don’t explicitly annotate them. ) for the argument. It means that you let the TypeScript compiler set the value of T automatically based on the type of argument that you pass into, like this:

```ts
let numbers = [1, 5, 7, 4, 2, 9];
let randomEle = getRandomElement(numbers);
console.log(randomEle);
```

**In Above example, we didn’t pass the number type to the getRandomElement() explicitly. The compiler looks at the argument and sets T to its type.**
