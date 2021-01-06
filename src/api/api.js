import axios from 'axios'

const ajax = (method, url, params) => {
    if (method === 'post') {
        return (
            axios.post('http://data-test.co-study.com.cn/api' + url, {
                params
            })
        )
    } else if (method === 'post') {
        return (
            axios.get('http://data-test.co-study.com.cn/api' + url, {
                params
            })
        )
    }
}

const apis = {
    user_login: (params) => ajax('post', '/user/sign_in', params),
}

export default apis
