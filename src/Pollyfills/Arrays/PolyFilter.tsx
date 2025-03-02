interface Array<T>{
    customFilter(callback:(value:T,index:number,args:T[])=>boolean):T[]
}

// Array.prototype.filter = null
Array.prototype.customFilter = function<T> (callback:(value:T,index:number,args:T[])=>boolean):T[] {

    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
    }

    const context = this

    if (!Array.isArray(context)) {
        throw new Error('Should be an array')
    }
    if (!context.length) {
        return context
    }


    const newArray:T[] = []
    const Length = context.length


    for (let x = 0; x < Length; x++) {
        const response = callback(context[x], x, context)
        if (response) {
            newArray.push(context[x])
        }
    }
    

    return newArray

}



const data = [{ id: 1, price: 76 }, { id: 2, price: 545 }, { id: 3, price: 6 }, { id: 4, price: 45 }]

const result = data.customFilter((value, index, args) => value.price < 50)

console.log(result, 'result')

