
let n21 = [
    {
        reportUserName: 'asff',
        reportTime: '2019-04-26 10:51:19',
        reportType: 'saddda',
        reportRange: 'sa',
        reportDescribe: 'afwfdawvf',
        reportPhoto: 'pic',
        reportInvite: 'asd5',
    },
    {
        reportUserName: 'asff',
        reportTime: '2019-04-26 11:04:32',
        reportType: 'aefsrfa',
        reportRange: 'sa',
        reportDescribe: 'afwfdawvf',
        reportPhoto: 'pic',
        reportInvite: 'asd5',
    },
    {
        reportUserName: 'cccc',
        reportTime: '2019-04-26 11:05:32',
        reportType: 'aefsrfa',
        reportRange: 'sa',
        reportDescribe: 'afwfdawvf',
        reportPhoto: 'pic',
        reportInvite: 'ase5',
    },
]

var data = [
    {
        name:'1',
        time:'2019-04-26 10:53:19'
    },
    {
        name:'2',
        time:'2019-04-26 10:51:19'
    },
    {
        name:'3',
        time:'2019-04-26 11:04:32'
    },
    {
        name:'4',
        time:'2019-04-26 11:05:32'
    }
]

n21.sort(function(a,b){
    return a.reportTime < b.reportTime ? 1 : -1
})

const log = console.log.bind(console)
const demoDate = function(day = 0) {
    // 时间标准库
    let s = ''
    let d = new Date()
    let nian = d.getFullYear()
    let yue = d.getMonth() + 1
    let ri = d.getDate()
    let shi = d.getHours()
    let fen = d.getMinutes()
    let miao = d.getSeconds()
    s = `${nian}-${yue}-${ri + day} ${shi}:${fen}:${miao}`
    return s
}
log('demoDate()', demoDate())




