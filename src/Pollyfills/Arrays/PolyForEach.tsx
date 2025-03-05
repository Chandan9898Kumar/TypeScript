
interface Array<T> {
    customForEach(callback: (item: T, index: number, args: T[]) => void): undefined
  }
  
  Array.prototype.customForEach = function <T>(callback: (item: T, index: number, args: T[]) => void): undefined {
  
    if (typeof callback !== 'function') {
      throw new TypeError("callback should be a function");
    }
  
    if (!Array.isArray(this)) {
      throw new Error('should be an Array')
    }
  
    if (!this.length) {
      return undefined
    }
  
    for (let x = 0; x < this.length; x++) {
      callback(this[x], x, this)
    }
  
    return undefined
  
  }
  
//   const numbers = [1, 2, 3, 4]
//   const result = numbers.customForEach((item, index, arrays) => {
//     numbers[index] = item * 10
//   })
  
//   console.log(numbers)