/*
 * 全局环境配置
 * @api  后台api地址
 * @link 全局链接地址
 */
const CONFIG = {
    // testHost: 'http://test.co-study.com.cn',
    // testHost: 'http://106.15.227.20:3333',

    env: 'pub',
    // env:'test',
    // env:'lan',
    // env:'dev',

    // 后台项目
    testHost: 'http://data-test.co-study.com.cn/api',  // 测试环境
    PublicHost: 'http://data.co-study.com.cn/api',  // 生产环境
    localHost: 'http://127.0.0.1:7000/api',  // 本地环境
    lanHost: 'http://192.168.1.101:7000/api',  // 局域网本地环境

    // app项目
    studyHost: 'https://slb.co-study.com.cn', // 生产环境
    testStudyHost: 'http://test.co-study.com.cn',   // 测试环境
    localStudyHost: 'http://localhost:5000',  // 本地环境
    lanStudyHost: 'http://192.168.1.101:5000'  // 局域网本地环境
};

export default CONFIG