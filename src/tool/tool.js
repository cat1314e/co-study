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

const findId = (array, id) => {
    id = Number(id)
    for (let i = 0; i < array.length; i++) {
        let index = array[i]
        if (index.id === id) {
            return index
        }
    }
}

const findAllId = (array, intCode) => {
    let result = []
    for (let i = 0; i < array.length; i++) {
        if (array[i].be_report_invite_code === intCode) {
            let index = array[i].id.toString()
            result.push(index)
        }
    }
    return result
}

const findType = (array, type) => {
    for (let i = 0; i < array.length; i++) {
        let index = array[i]
        if (index.label === type) {
            return index
        }
    }
}

const tool = function() {
    let o = {
        removeArray01: removeArray,
        findId: findId,
        findAllId: findAllId,
        findType: findType,
    }
    return o
}


export default tool()