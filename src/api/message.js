import pic from '../assets/logo.png'
import api from "./api.js"


let n22 = []
// api.report_get_data(' ').then(res => {
//     console.log('res', res)
//     const { data, errCode, msg } = res;
//     if (errCode === 0) {
//         // this.pageOption.total = data.count;
//         // this.dataList = data.records;
//     }
// }).catch()
// let params = {
//     page: this.pageOption.page,
//     page_size: this.pageOption.page_size,
//     start_datetime: this.filterData.datetime[0],
//     end_datetime: this.filterData.datetime[1],
//     be_report_invite_code: this.filterData.be_report_invite_code,
//     be_report_status: this.filterData.be_report_status,
//     report_type: this.filterData.report_type,
//     report_status: this.filterData.report_status,
//     report_content: this.filterData.report_content,
//     reporter_invite_code: this.filterData.reporter_invite_code
// }


let n21 = [
    {
        reportUserName: 'aaa',
        reportTime: '2020-10-11 00:00',
        reportType: '啊是不是',
        reportRange: 'sadjwda',
        reportDescribe: '达瓦的吧安慰你都看不到帮我卡巴那俺文件夹八度空间我不懂',
        reportPhoto: pic,
        reportInvite: 'asdb',
    },
    {
        reportUserName: 'aaa',
        reportTime: '2020-10-11 00:20',
        reportType: 'sadddw不是',
        reportRange: 'sadjwda',
        reportDescribe: '达瓦的吧',
        reportPhoto: pic,
        reportInvite: 'asdb',
    },
    {
        reportUserName: 'bbb',
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