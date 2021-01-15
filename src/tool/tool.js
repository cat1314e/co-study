const removeArray = (array, id) => {
    let index = -1
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            index = i
            break
        }
    }
    array.splice(index, 1)
    return array
}



const tool = function() {
    let o = {
        removeArray01: removeArray
    }


    return o
}

// let array = [1, 2, 3, 4, 5, 6]
// let n21 = tool()
// let n = n21.removeArray1(array, 1)
// console.log('n', n)

export default tool()