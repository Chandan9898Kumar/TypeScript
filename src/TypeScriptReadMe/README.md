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
Syntax: function functionName<T>(param: T): T {
  // function body
}

Example: function identity<T>(arg: T): T {
  return arg;
}
```

2. Generic Interfaces
   You can define an interface with a generic type parameter. This allows you to create interfaces that can work with different types.

```ts
Syntax: interface InterfaceName<T> {
  property: T;
  method(param: T): void;
}

Example: interface Box<T> {
  contents: T;
  getContents(): T;
}
```

3. Generic Classes
   Similar to interfaces, you can define a class with a generic type parameter. This allows instances of the class to work with different types.

```ts
Syntax: class ClassName<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T {
    return this.items[index];
  }
}

Example: class Stack<T> {
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
Syntax: function functionName<T extends SomeType>(param: T): void {
  // function body
}

Example: interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
  console.log(item.length);
}
```

5. Using Multiple Type Parameters
   You can define multiple type parameters by separating them with commas.

```ts
Syntax: function functionName<T, U>(param1: T, param2: U): [T, U] {
  return [param1, param2];
}

Example: function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}
```

6. Default Type Parameters
   You can also provide default types for generic parameters. If a type is not specified when the generic is used, the default type will be used.

```ts
Syntax: function functionName<T = DefaultType>(param: T): T {
  return param;
}

Example: function log<T = string>(value: T): void {
  console.log(value);
}
```

7. Using Generics with Arrays
   You can use generics with arrays to specify the type of elements in the array.

```ts
Syntax: function getArray<T>(items: T[]): T[] {
  return items;
}

Example: const numbers = getArray<number>([1, 2, 3]);
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

### Introduction to generic constraints in TypeScript.

Consider the following example:

```ts
function merge<U, V>(obj1: U, obj2: V) {
  return {
    ...obj1,
    ...obj2,
  };
}
```

The merge() is a generic function that merges two objects. For example:

```ts
let person = merge({ name: "John" }, { age: 25 });

console.log(result); // O/P : { name: 'John', age: 25 }
```

It works perfectly fine.

The merge() function expects two objects. However, it doesn’t prevent you from passing a non-object like this:

```ts
let person = merge({ name: "John" }, 25);

console.log(person); // { name: 'John' }
```

TypeScript doesn’t issue any errors.

`Instead of working with all types, you may want to add a constraint to the merge() function so that it works with objects only.`

`To do this, you need to list out the requirement as a constraint on what U and V types can be.`

`In order to denote the constraint, you use the extends keyword. For example:`

```ts
function merge<U extends object, V extends object>(obj1: U, obj2: V) {
  return {
    ...obj1,
    ...obj2,
  };
}
```

Because the merge() function is now constrained, it will no longer work with all types. Instead, it works with the object type only.

The following will result in an error:

```ts
let person = merge(
    { name: 'John' },
    25
);

> ERROR: Argument of type '25' is not assignable to parameter of type 'object'.
```

### Using type parameters in generic constraints.

TypeScript allows you to declare a type parameter constrained by another type parameter.

The following `prop()` function accepts an object and a property name. It returns the value of the property.

```ts
function prop<T, K>(obj: T, key: K) {
  return obj[key];
}
```

The compiler issues the following error:
`Type 'K' cannot be used to index type 'T'.`

**To fix this error, you add a constraint to K to ensure that it is a key of T as follows:**

```ts
function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

If you pass into the prop function a property name that exists on the obj, the compiler won’t complain. For example:

```ts
function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let str = prop({ name: "John" }, "name");
console.log(str); // John
```

However, if you pass a key that doesn’t exist on the first argument, the compiler will issue an error:

```ts
function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let str = prop({ name: "John" }, "age");


Error:
Argument of type '"age"' is not assignable to parameter of type '"name"'.
```

### Summary of parameters in generic constraints

1. Use `extends` keyword to constrain the type parameter to a specific type.
2. Use `extends keyof` to constrain a type that is the property of another object.

### Introduction to TypeScript generic interfaces.

Like classes, interfaces can also be generic. A generic interface allows you to create an interface that can work with different types while maintaining type safety.

A generic interface has a generic type parameter list in angle brackets <> following the name of the interface:

```ts
interface interfaceName<T> {
  // ...
}
```

This makes the type parameter `T` visible to all members of the interface.

`The type parameter list can have one or multiple types.` For example:

```ts
interface interfaceName<U, V> {
  // ...
}
```

**TypeScript generic interface examples**

1. Generic interfaces that describe object properties

The following shows how to declare a generic interface that consists of two members key and value with the corresponding types `K` and `V`:

```ts
interface Pair<K, V> {
  key: K;
  value: V;
}

> Now, you can use the Pair interface to define any key/value pair with any type. For example:

let month: Pair<string, number> = {
    key: 'Jan',
    value: 1
};

console.log(month);
```

2. Generic interfaces that describe methods.

The following declares a generic interface with two methods `add()` and `remove()`:

```ts
interface Collection<T> {
  add(o: T): void;
  remove(o: T): void;
}
```

And this List<T> generic class implements the Collection<T> generic interface:

```ts
class List<T> implements Collection<T> {
  private items: T[] = [];

  add(o: T): void {
    this.items.push(o);
  }
  remove(o: T): void {
    let index = this.items.indexOf(o);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}
```

From the `List<T>` class, you can create a list of values of various types e.g., numbers, or strings.

For example, the following shows how to use the `List<T>` generic class to create a list of numbers:

```ts
let list = new List<number>();

for (let i = 0; i < 10; i++) {
  list.add(i);
}
```

3. Generic interfaces that describe index types

The following declares an interface that describes an index type:

```ts
interface Options<T> {
  [name: string]: T;
}

let inputOptions: Options<boolean> = {
  disabled: false,
  visible: true,
};



### Explanation:

1. `Generic Interface:` The `Options` interface is defined as a generic interface with a type parameter T. This means that when you use the Options interface, you can specify what type T should be.

2. Index Signature: The [name: string]: T part is an index signature. It indicates that the Options interface can have any number of properties, where the property names are strings and the values are of type T. This allows for a flexible structure where you can have various properties with the same value type.


3. Type Specification: Here, inputOptions is declared as an instance of Options<boolean>. This means that the properties of inputOptions can have string keys, and their values must be of type boolean.


Examples:

interface Product<U ,V>{

    game:U,
    place:U
    [key:string]: U | V

}

const Data:Product<string , number>={

    game:'gta',
    place:'germany',
    discount: 10,
    tax: 5

}

console.log(Data)
```

4. Creating Flexible Component Props

```ts
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void;
}

// Usage in a React component
function List<T>({ items, renderItem, onItemClick }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => onItemClick?.(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// Using the component
interface User {
  id: number;
  name: string;
}

const UserList = () => {
  const users: User[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ];

  return (
    <List<User>
      items={users}
      renderItem={(user) => <span>{user.name}</span>}
      onItemClick={(user) => console.log(`Clicked ${user.name}`)}
    />
  );
};
```

5. Creating Reusable Data Structures

```ts
// Generic interface for API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// Usage with different data types
interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

// User API response
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John", email: "john@example.com" },
  status: 200,
  message: "Success",
  timestamp: new Date(),
};

// Product API response
const productResponse: ApiResponse<Product> = {
  data: { id: 1, title: "Phone", price: 599 },
  status: 200,
  message: "Success",
  timestamp: new Date(),
};
```

6. Creating Type-Safe Collections

```ts
interface Collection<T> {
  items: T[];
  add(item: T): void;
  remove(item: T): void;
  getItem(index: number): T;
}

// Implementation for numbers
class NumberCollection implements Collection<number> {
  items: number[] = [];

  add(item: number): void {
    this.items.push(item);
  }

  remove(item: number): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  getItem(index: number): number {
    return this.items[index];
  }
}

// Usage
const numbers = new NumberCollection();
numbers.add(1);
numbers.add(2);
```

### When to Use Generic Interfaces:

1. Data Structures : When creating reusable data structures that should work with different types

2. API Responses : When handling API responses with different data shapes

3. Component Props : When building reusable UI components that can work with different data types

4. State Management : When managing state that needs to handle different data types

5. Form Handling : When creating form utilities that need to work with different input types

### Examples of generic Index Signature in TypeScript

An index signature in TypeScript allows you to define the type of keys and values for an object. This is useful when you don't know all the property names in advance but you know the shape of the values.

**Syntax**

```ts
interface MyObject {
  [key: string]: number;
}

In this example:

> [key: string] indicates that the keys of the object are strings.
> number indicates that the values associated with those keys are numbers.
```

1. Basic Generic Index Type:

```ts
interface GenericDictionary<T> {
  [key: string]: T;
}

// Usage
const numberDictionary: GenericDictionary<number> = {
  age: 25,
  score: 100,
};

const stringDictionary: GenericDictionary<string> = {
  name: "John",
  city: "New York",
};
```

2. Multiple Type Parameters:

```ts
interface KeyValuePair<K extends string | number, V> {
  [key: K]: V;
}

// Usage
const stringKeyObject: KeyValuePair<string, number> = {
  age: 25,
  score: 100,
};

const numberKeyObject: KeyValuePair<number, string> = {
  1: "First",
  2: "Second",
};
```

3. Generic Interface with Constraints:

```ts
interface Entity {
  id: number;
  name: string;
}

interface EntityMap<T extends Entity> {
  [key: string]: T;
}

// Usage
interface User extends Entity {
  email: string;
}

const userMap: EntityMap<User> = {
  user1: { id: 1, name: "John", email: "john@example.com" },
  user2: { id: 2, name: "Jane", email: "jane@example.com" },
};
```

4. Nested Generic Types:

```ts
interface Collection<T> {
  [key: string]: {
    data: T;
    timestamp: Date;
  };
}

// Usage
interface Product {
  name: string;
  price: number;
}

const productCollection: Collection<Product> = {
  item1: {
    data: { name: "Laptop", price: 999 },
    timestamp: new Date(),
  },
  item2: {
    data: { name: "Phone", price: 699 },
    timestamp: new Date(),
  },
};
```

5. Generic Interface with Multiple Index Types:

```ts
interface MultiIndex<T> {
  [key: string]: T;
  [key: number]: T;
}

// Usage
const mixed: MultiIndex<string> = {
  name: "John",
  1: "One",
  age: "25",
  2: "Two",
};
```

6. Generic Interface with Specific Keys:

```ts
type AllowedKeys = "first" | "second" | "third";

interface ConstrainedMap<T> {
  [K in AllowedKeys]: T;
}

// Usage
const constrainedObject: ConstrainedMap<number> = {
  first: 1,
  second: 2,
  third: 3,
  // fourth: 4 // Error: Object literal may only specify known properties
};
```

`These generic interfaces are useful when:`

1. You need to create reusable type definitions
2. The type of values might change but the structure remains the same
3. You want to ensure type safety while maintaining flexibility
4. You're working with dynamic keys but want to enforce value types

### Mapped types in TypeScript.

Mapped types in TypeScript are a powerful feature that allows you to create new types by transforming existing ones. They enable you to create types based on the properties of another type, applying modifications to each property. This is particularly useful for scenarios where you want to create variations of a type without having to redefine all its properties manually.

`Basic Syntax`

The basic syntax for a mapped type looks like this:

```bash

type MappedType<T> = {
    [K in keyof T]: Type; // Type can be a transformation of T[K]
};



  1. T is the original type.
  2. K iterates over each key in T (using keyof T).
  3. Type can be a transformation of the original property type T[K].

```

**Common Use Cases**

1. Making All Properties Optional: You can create a type where all properties of an existing type are optional.

```bash
type User = {
    id: number;
    name: string;
    email: string;
};

type PartialUser  = {
    [K in keyof User]?: User[K]; // Making all properties optional
};

const user: PartialUser  = {
    name: "Alice" // id and email are optional
};

```

2. Making All Properties Readonly: You can create a type where all properties of an existing type are read-only.

```bash
type ReadonlyUser  = {
    readonly [K in keyof User]: User[K]; // Making all properties readonly
};

const user: ReadonlyUser  = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
};

// user.name = "Bob"; // Error: Cannot assign to 'name' because it is a read-only property.
```

3. Transforming Property Types: You can change the type of each property in a type.

```bash
type UserWithStringId = {
    [K in keyof User]: string; // Changing all properties to string
};

const user: UserWithStringId = {
    id: "1", // Now id is a string
    name: "Alice",
    email: "alice@example.com"
};
```

4. Filtering Properties: You can create a mapped type that only includes certain properties based on a condition.

```bash
type UserWithStringKeys = {
    [K in keyof User as K extends 'name' | 'email' ? K : never]: User[K];
};

const user: UserWithStringKeys = {
    name: "Alice",
    email: "alice@example.com"
};
```

# When to Use Mapped Types

> Code Reusability: When you want to create variations of existing types without repeating code.
> Type Transformations: When you need to apply transformations to types, such as making properties optional or readonly.
> Dynamic Type Creation: When you want to create types based on the structure of other types dynamically.


1. ### TypeScript Flow Visualization

![TypeScript Control Flow Analysis](https://www.typescriptlang.org/static/TypeScript%20Control%20Flow%20Analysis-8a549253ad8470850b77c4c5c351d457.png)

This diagram illustrates TypeScript's control flow analysis.


2. ### TypeScript Interfaces Visualization

![TypeScript Interfaces](https://www.typescriptlang.org/static/TypeScript%20Interfaces-34f1ad12132fb463bd1dfe5b85c5b2e6.png)

This diagram illustrates how interfaces work in TypeScript.



3. ### TypeScript Types Visualization

![TypeScript Types](https://www.typescriptlang.org/static/TypeScript%20Types-ae199d69aeecf7d4a2704a528d0fd3f9.png)

This diagram illustrates the type system in TypeScript.


4. ### TypeScript Classes Visualization

![TypeScript Classes](https://www.typescriptlang.org/static/TypeScript%20Classes-83cc6f8e42ba2002d5e2c04221fa78f9.png)

This diagram illustrates how classes work in TypeScript.

### TypeScript Resources

[TypeScript Cheat Sheet](https://rmolinamir.github.io/typescript-cheatsheet/#type-assertions)
