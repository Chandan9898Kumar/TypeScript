interface Array<T> {
  customMap<U>(callback: (value: T, index: number, array: T[]) => U,thisArg?: any): U[]; // Main function Returns an array of U values
}

if (!Array.prototype.customMap) {
  Array.prototype.customMap = function <T, U>(callback: (value: T, index: number, array: T[]) => U,thisArg?: any): U[] {
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

// // Example usage:
// const numbers = [1, 2, 3, 4];
// const doubled = numbers.customMap((num) => num * 2);
// console.log(doubled); // [2, 4, 6, 8]

// // Example with types
// const stringNumbers = numbers.customMap((num) => num.toString());
// console.log(stringNumbers); // ['1', '2', '3', '4']







