### Array Polyfills

### 1. Map

`Purpose ( interface Array<T> ): This interface declaration extends TypeScript's built-in Array interface to add a new custom method called customMap. This is essentially creating a polyfill for the native map method, but with a custom implementation.`


`Question :`  how this This interface declaration extends TypeScript's built-in Array interface to add a new custom method called customMap:

`Explanation :`

1. Interface Declaration Merging :
```ts
interface Array<T> { ... }
```
A. TypeScript uses "declaration merging" - when you declare an interface with the same name as an existing one

B. Instead of replacing the original interface, it adds new members to it

C. The original Array interface remains intact, and your new method is added to it


2. Generic Type Parameters :

```ts
interface Array<T> {          // Original array type
    customMap<U>(...)        // New type parameter for transformation
}

1. T represents the type of elements in the original array
2. U represents the type of elements in the resulting array
3. This allows transformation from type T to type U
```


```ts
//  Here, T is already known from the Array interface ( Array<T>), so we only need to declare <U> at the method level.
interface Array<T> {
  // Extends the existing Array interface with generic type T
  customMap<U>( // Defines a new method that can return a different type U
    callback: (value: T, index: number, array: T[]) => U, // Callback function
    thisArg?: any // Optional this context
  ): U[]; // Returns an array of type U
}
```

**Full Implementation**

```ts
interface Array<T> {
  //   callback: (value: T, index: number, array: T[]) => U,  // Callback  Returns a single value of type U
  customMap<U>(
    callback: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];
  // Main function Returns an array of U values
  // NOTE : if you use : customMap<T,U>(callback: (value: T, index: number, array: T[]) => U,thisArg?: any): U[];
  // then it will break . becuase // This creates a new T that shadows the Array's T.
  // 1. T in customMap shadows the original T from Array<T>
  // 2. Creates disconnect between array type and callback parameter
  // 3. TypeScript can't infer types properly
}

if (!Array.prototype.customMap) {
  Array.prototype.customMap = function <T, U>(
    callback: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[] {
    // T comes from 'this' array type
    // U comes from callback return type
    // Needs T because it's a standalone function that doesn't automatically know the array type
    // Needs U because it needs to know the transformation type

    // Check if this is null or undefined
    if (this == null) {
      throw new TypeError(
        "Array.prototype.customMap called on null or undefined"
      );
    }

    // Check if callback is a function
    if (typeof callback !== "function") {
      throw new TypeError(`${callback} is not a function`);
    }

    // Convert this to object and get its length
    const O = Object(this);
    const len = O.length >>> 0;

    // Create an array to store the results
    const result: U[] = new Array(len);

    // Iterate through the array
    for (let i = 0; i < len; i++) {
      // Check if the index exists in the array
      if (i in O) {
        // Call the callback function with proper this binding
        result[i] = callback.call(thisArg, O[i] as T, i, O);
      }
    }

    return result;
  };
}

// Example usage:
const numbers = [1, 2, 3, 4];
const doubled = numbers.customMap((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]

// Example with types
const stringNumbers = numbers.customMap((num) => num.toString());
console.log(stringNumbers); // ['1', '2', '3', '4']
```

### Example: With explicitly specify the generic types when calling customMap.

```ts
Array.prototype.customMap = function <T, U>(
  callback: (value: T, index: number, array: T[]) => U,
  thisArg?: any
): U[] {
  // Type checking
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const arr = this as T[];
  const result: U[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      // Handle sparse arrays
      result[i] = callback.call(thisArg, arr[i], i, arr);
    }
  }

  return result;
};

// Usage with explicit types
const numbers = [1, 2, 3, 4];

// Explicit number to number transformation
const doubled = numbers.customMap<number, number>((num) => num * 2);

// Explicit number to string transformation
const formatted = numbers.customMap<number, string>((num) => `Number: ${num}`);

// Explicit type parameters are optional but can be helpful for clarity
// TypeScript can usually infer types correctly without explicit typing
// Use explicit typing when:
// You need more type safety
// The inferred types are incorrect
// You're working with complex transformations
// You want to make the code more self-documenting
```

`More Explanations`

```ts
 // Example usage:
const numbers = [1, 2, 3, 4];  // This is Array<number>, so T = number
const strings = numbers.customMap((num) => num.toString()); // U = string
//                                        ^               ^
//                                        |               |
//                              Callback returns          |
//                              single string        Final result is
//                                                  string[]

// How types flow:
interface Array<number> {  // T is replaced with number
    customMap<string>(    // U is specified as string based on return type
        callback: (value: number, index: number, array: number[]) => string,
        thisArg?: any
    ): string[];
}


When you call customMap, TypeScript:
    Already knows T (from the array type)
    Infers U from the callback's return type



So while the syntax looks different:
    Interface: Array<T> with method customMap<U>

    Implementation: function <T, U>

They are equivalent because:
    T in the interface comes from the array type
    T in the implementation matches the array type
    U in both cases represents the transformation type

TypeScript's type system correctly matches these together at compile time

The implementation needs both <T, U> because it's a standalone function that needs to know both types,
 while the interface already has T from the array context and only needs U for the transformation.


```


### 2. Filter


```ts
interface Array<T> {
  customFilter(callback: (value: T, index: number, args: T[]) => boolean): T[];
  //  Or We can also write like this :
  //  customFilter: (callback: (value: T, index: number, args: T[]) => boolean) => T[];
}

// Array.prototype.filter = null
Array.prototype.customFilter = function <T>(
  callback: (value: T, index: number, args: T[]) => boolean
): T[] {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  const context = this;

  if (!Array.isArray(context)) {
    throw new Error("Should be an array");
  }
  if (!context.length) {
    return context;
  }

  const newArray: T[] = [];
  const Length = context.length;

  for (let x = 0; x < Length; x++) {
    const response = callback(context[x], x, context);
    if (response) {
      newArray.push(context[x]);
    }
  }

  return newArray;
};

const data = [
  { id: 1, price: 76 },
  { id: 2, price: 545 },
  { id: 3, price: 6 },
  { id: 4, price: 45 },
];

const result = data.customFilter((value, index, args) => value.price < 50);

console.log(result, "result");
```
`Note:`
Here on Filter, we did not uses <U> Generics.
because : 
1. The callback returns type U (could be any type).
2. filter's callback should always return a boolean. so used boolean instead of <U>. But In Map, we used <U>.

`Filter's Purpose `
  1. Filter is meant to be a predicate operation - it should only decide whether to keep or discard elements
  2. It should always return a subset of the original array with the same type
  3. The callback should return a boolean (true/false) decision



### Example of multiple generic type parameters with examples:

1. When to Use Single Generic <T>:

```ts
// Use <T> when you're working with a single type
function identity<T>(value: T): T {
  return value;
}

// Example: Input and output are the same type
const result = identity<number>(42); // returns number
const text = identity<string>("hello"); // returns string
```

2. When to Use Multiple Generics <T, U>:

```ts
// Use <T, U> when you're transforming from one type to another
function transform<T, U>(input: T, converter: (value: T) => U): U {
  return converter(input);
}

// Example: Converting from one type to another
const numToString = transform<number, string>(42, (num) => num.toString());
//                         Input ^      Output ^
```

> Let's look at your specific example:

```ts
// Version 1: Single Generic (INCORRECT)
export function useArrayTransform<T>(
  array: T[],
  transformer: (item: T) => T // Must return same type as input
) {
  return array.customMap(transformer);
}

// Version 2: Two Generics (CORRECT)
export function useArrayTransform<T, U>(
  array: T[],
  transformer: (item: T) => U // Can return different type
) {
  return array.customMap(transformer);
}

> Why Version 2 is Better:

// With single generic <T>:
const numbers = [1, 2, 3];
// This would NOT work because input and output must be same type
const strings = useArrayTransform<number>(numbers, num => num.toString()); // Error!

// With two generics <T, U>:
const numbers = [1, 2, 3];
// This works because we can transform from number to string
const strings = useArrayTransform<number, string>(numbers, num => num.toString());

```

# Data Transformation: ( Real-World Example )

```ts
interface User {
  id: number;
  name: string;
}

interface UserDTO {
  userId: string;
  displayName: string;
}

// Need both T and U for different input/output types
function convertData<T, U>(data: T[], converter: (item: T) => U): U[] {
  return data.customMap(converter);
}

const users: User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

const dtos = convertData<User, UserDTO>(users, (user) => ({
  userId: user.id.toString(),
  displayName: user.name,
}));
```