import axios from 'axios'

class Ajax_api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || 'http://localhost:8000/home'
    }

    get(path) {
        let url = this.baseUrl + path
        return axios.get(url,{
            params: {
                ID: 12345
            }
        })
        .then(r => r.data)
    }

    post(path, data) {
        let url = this.baseUrl + path
        return axios.post(url, {
            firstName: 'Fred',
            lastName: 'Flintstone'
        }).then(r => r.data)
    }
}

export default Ajax_api
