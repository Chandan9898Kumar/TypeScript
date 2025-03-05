interface Array<T> {
  customReduce<U>(callback: (accum: U, current: T, index: number, array: T[]) => U,initialValue?: U): U | T[];
}

Array.prototype.customReduce = function <T, U>(
  callback: (accum: U, current: T, index: number, array: T[]) => U,initialValue?: U): U  | T[] {

  if (typeof callback !== "function") {
    throw new TypeError("callback should be a function");
  }

  if (!Array.isArray(this)) {
    throw new TypeError("Should be an array");
  }

  
 // Type assertion to ensure 'this' is treated as an array
  const arrays = this as unknown as T[];

  if (!arrays.length) {
    return arrays
  }

  if (this.length === 0 && arguments.length < 2) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let index = 0;
  let accumulator: U;

  if (arguments.length > 1) {
    accumulator = initialValue!;
  } else {
    accumulator = this[0] as unknown as U;
    index = 1;
  }

  for (let i = index; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

// Example usage
// const data = [1, 2, 3, 4, 5];

// const result = data.customReduce((acc, curr) => acc + curr, 10);

// console.log(result); // Output: 25

/*

Explanation:
Interface Definition: The Array interface is extended to include the customReduce method.
Type Checking: The method checks if the callback is a function and if this is an array.
Initial Value Handling: The method handles the initial value if provided, otherwise, it uses the first element of the array as the initial value.
Iteration: The method iterates over the array, applying the callback function to accumulate the result.
Example Usage: An example usage of the customReduce method is provided to demonstrate its functionality.



Why Use U?
Flexibility: The generic type U allows the accumulator to be of any type, not just the type of the array elements. This means you can reduce an array of numbers to a string, an object, or any other type.

Type Safety: By specifying the type of the accumulator, TypeScript can provide better type checking and autocomplete suggestions, reducing the likelihood of runtime errors.

If we don't use U, the accumulator would have to be of the same type as the array elements.

Limitations Without U : 

Limited Use Cases: Without U, the customReduce method can only accumulate values of the same type as the array elements. For example, you can't reduce an array of numbers to a string.

Less Type Safety: TypeScript can't enforce the type of the accumulator as strictly, which might lead to runtime errors if the types don't match.
*/
