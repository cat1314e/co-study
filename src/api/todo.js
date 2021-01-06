import Ajax_api from './api'

class TodoApi extends Ajax_api {
    add(data) {
        let path = '/add'
        return this.post(path, data)
    }

    delete(todoId) {
        let path = '/delete/' + todoId
        return this.get(path)
    }

    update(todoId, data) {
        let path = '/update/' + todoId
        return this.post(path, data)
    }

    all() {
        let path = '/all'
        return this.get(path)
    }

    detail(todoId, callback) {
        let path = '/' + todoId
        return this.get(path, callback)
    }
}

export default TodoApi
