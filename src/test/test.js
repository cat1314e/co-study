

let array1 = [
    {id: 665, },
    {id: 661, },
    {id: 662, },
    {id: 663, },
    {id: 667, },
]

const removeArray01 = (array, id) => {
    let index = -1
    for (let i = 0; i < array.length; i++) {
        if (array1[i].id === id) {
            index = i
            console.log('index', index)
            break
        }
    }
    array.splice(index, 1)
}

removeArray01(array1, 663)
console.log('array', array1)