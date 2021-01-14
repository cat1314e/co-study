import pic from '../assets/logo.png'
// import api from "./api.js"

let n21 = [
    {
        reportUserName: 'aaa1',
        reportTime: '2020-10-11 00:00',
        reportType: '啊是不是',
        reportRange: 'sadjwda',
        reportDescribe: '达瓦的吧安慰你都看不到帮我卡巴那俺文件夹八度空间我不懂',
        reportPhoto: pic,
        reportInvite: 'asdb',
    },
    {
        reportUserName: 'aaa2',
        reportTime: '2020-10-11 00:20',
        reportType: 'sadddw不是',
        reportRange: 'sadjwda',
        reportDescribe: '达瓦的吧',
        reportPhoto: pic,
        reportInvite: 'asdb',
    },
    {
        reportUserName: 'bbb3',
        reportTime: '2020-11-2 00:04',
        reportType: 'saddda',
        reportRange: 'sadjwda',
        reportDescribe: '达adwdaw吧',
        reportPhoto: pic,
        reportInvite: 'asd4',
    },
    {
        reportUserName: 'asff',
        reportTime: '2020-11-2 00:00',
        reportType: 'saddda',
        reportRange: 'sa',
        reportDescribe: 'afwfdawvf',
        reportPhoto: pic,
        reportInvite: 'asd5',
    },
    {
        reportUserName: 'asff',
        reportTime: '2020-11-2 02:00',
        reportType: 'aefsrfa',
        reportRange: 'sa',
        reportDescribe: 'afwfdawvf',
        reportPhoto: pic,
        reportInvite: 'asd5',
    },
    {
        reportUserName: 'cccc',
        reportTime: '2020-11-2 00:00',
        reportType: 'aefsrfa',
        reportRange: 'sa',
        reportDescribe: 'afwfdawvf',
        reportPhoto: pic,
        reportInvite: 'ase5',
    },
]

// 给时间逆序排序
n21.sort(function(a,b){
    return a.reportTime < b.reportTime ? 1 : -1
})

export default n21;