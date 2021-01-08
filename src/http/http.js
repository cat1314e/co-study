import axios from 'axios'
import qs from 'qs'
import Host from './env'
// import ToolsUse from '../toolUse'
// import { Tools } from '@/assets/js/common'
// import iView from 'iview'
import iView from 'view-design'
import common from '../utils/utils'


let baseURL;
let studyURL;

// if (Host.env === 'pub'){
//     baseURL = Host.PublicHost;
//     studyURL = Host.studyHost
// }else if(Host.env === 'test'){
//     baseURL = Host.testHost;
//     studyURL = Host.testStudyHost
// }else if(Host.env === 'lan'){
//     baseURL = Host.lanHost;
//     studyURL = Host.lanStudyHost
// }else {
//     baseURL = Host.localHost;
//     studyURL = Host.localStudyHost
// }

switch (Host.env) {
    case "pub":
        baseURL = Host.PublicHost;// 生产环境
        // baseURL = Host.testHost;// 测试环境
        studyURL = Host.studyHost // 生产环境
        // studyURL = Host.testStudyHost // 测试环境
        break;
    case "test":
        baseURL = Host.testHost;
        studyURL = Host.testStudyHost
        break;
    case 'lan':
        baseURL = Host.lanHost;
        studyURL = Host.lanStudyHost
        break;
    default:
        baseURL = Host.localHost;
        studyURL = Host.localStudyHost
}

// var baseURL = Host.lanHost;
// var baseURL = Host.localHost;
// var baseURL = Host.testHost;
// var baseURL = Host.PublicHost;
// var baseURL = Host.localStudyHost;

/* 创建axios实例 */
var instance = axios.create({
    baseURL: baseURL,
    timeout: 30000
})
// axios.defaults.baseURL = '/index.php';

//开始显示LoadingBar
function startLoading() {
    iView.LoadingBar.start()
    /* iView.Spin.show({
      render: (h) => {
        return h('div', [
            h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                    type: 'ios-loading',
                    size: 18
                }
            }),
            h('div', '请稍后...')
        ])
      }
    }) */
}

//关闭显示LoadingBar
function endLoading() {
    iView.LoadingBar.finish();
    // iView.Spin.hide()
}

//失败显示LoadingBar
function errorLoading() {
    iView.LoadingBar.error()
    // iView.Spin.hide()
}

//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0

export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}


/* 请求拦截 */
instance.interceptors.request.use((config) => {
    /* 对请求数据操作 */
    showFullScreenLoading()
    return config;
}, (error) => {
    /* 对请求错误情况做些什么 */
    errorLoading()
    return Promise.reject(error);
})

/* 响应拦截器 */
instance.interceptors.response.use((response) => {
    /* 对响应数据做点什么 */
    tryHideFullScreenLoading()
    if (response.status == 403) {
        // Tools.cookie.removeCookie('token');
        window.location.href = window.location.protocol + '//' + window.location.host + '/#/login';
    }
    if (response.data.errCode === -1000 || response.data.errCode === -1001) {
        common.delToken()
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';
    }
    if (["APPLICATION/OCTET-STREAM", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"].includes(response.headers['content-type'])) {
        return response
    } else {
        return response.data;
    }
}, (error) => {
    /* 对响应错误做点什么 */
    errorLoading()
    return Promise.reject(error)
})

/**
 * 使用es6的export default导出了一个函数，导出的函数代替axios去帮我们请求数据，
 * 函数的参数及返回值如下：
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */
const ajax = (method, url, data = {}, host = null, responseType = {}, coAuthorization = null) => {
    if (common.getToken()) {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + common.getToken();
    }
    if (coAuthorization) {
        instance.defaults.headers.common['Costudy-Authorization'] = common.getCostudyAuthorizations(url,data)
    }
    method = method.toLowerCase();
    // data.token = Tools.cookie.getCookie('token')
    if (host === 'study') {
        // instance.defaults.baseURL = studyURL
        // instance.defaults.baseURL = Host.studyHost
        instance.defaults.baseURL = Host.testStudyHost
        // instance.defaults.baseURL = Host.localStudyHost
        // instance.defaults.baseURL = Host.lanStudyHost
    }else {
        instance.defaults.baseURL = baseURL
    }
    if (method == 'post') {
        return instance.post(url, data);
    } else if (method == 'postfile') {
        return instance.post(url, data, {responseType: responseType.responseType});
    } else if (method == 'get') {
        return instance.get(url, {params: data})
    } else {
        console.error('未知的请求方法：' + method);
        return false;
    }
}

export default ajax
