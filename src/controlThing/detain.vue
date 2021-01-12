<template>
  <div class="co-detain-all">
    <form method="get" class="co-detain-form">
      <label for="invitation">邀请码：  </label>
      <input id="invitation" :value=be_report_invite_code  type="text"/>
      <span @click="invitationSelect" class="co-select">查询</span>
    </form>
<!--    <div class="co-detain-text">-->
      <div class="co-detain-text">
        <h4>拘留：</h4>
        <label for="co-deType">拘留类型： </label>
        <select id="co-deType" v-model="deType">
          <option v-for="(reportList, i) in reportTypeList " :key="i" :value ="reportList.value">{{ reportList.label }}</option>
        </select>
        <br>
        <label for="downMenu">拘留天数： </label>
        <select id="downMenu" v-model="selected">
          <option v-for="(option, i) in options " :key="i" :value ="option.value">{{ option.text }}</option>
        </select>
        <p>预计于 {{ getDetainOutTime() }} 释放</p>
        <button @click="detainClick" class="co-detain-sure">确定</button>
      </div>
      <div class="co-detain-text co-detain-len">
        <div v-if="reporterDetentionInfo.records[0].length !== 0">
          <Card class="co-card" :bordered="false">
            <p>最近封禁详情：{{ be_report_invite_code }}</p>
            <p>{{ reporterDetentionInfo.record_time }}</p>
            <p>{{ reporterDetentionInfo.detention_type }}:</p>
            <p>
              <span>{{ reporterDetentionInfo.who_detention }}</span>
              <span>{{ reporterDetentionInfo.ban_days }}</span>
            </p>
            <p>
              以下为历史封禁信息：
            </p>
          </Card>
          <Card class="co-card"
                :bordered="false"
                v-for="(s, i) in reporterDetentionInfo.records"
                v-bind:key="i"
          >
            <p><span >被举报人：{{ be_report_invite_code }}</span></p>
            <div v-for="(m, n) in s"
                 v-bind:key="n"
            >
              <p>{{ m.record_time }}</p>
              <p>{{ m.record_desc }}{{ m.ban_days }}</p>
            </div>
          </Card>
          <br>
        </div>
        <div v-else>
          <Card class="co-card" :bordered="false">
            <!--在todo里添加一个label使整行被点击都会响应-->
            <p> 暂无封禁记录～</p>
          </Card>
        </div>
      </div>
<!--    </div>-->
  </div>

</template>

<script>
import apis from "../http/api.js"


const demoDate = function() {
  // 时间标准库
  let s = ''
  let d = new Date()
  let nian = d.getFullYear()
  let yue = d.getMonth() + 1
  let ri = d.getDate()
  let shi = d.getHours()
  let fen = d.getMinutes()
  let miao = d.getSeconds()
  s = `${nian}-${yue}-${ri} ${shi}:${fen}:${miao}`
  return s
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

const findType = (array, type) => {
  for (let i = 0; i < array.length; i++) {
    let index = array[i]
    if (index.label === type) {
      return index
    }
  }
}


export default {
  name: 'detain',
  data: function(){
    let nowTime = demoDate()
    let options = [
      {text: '1 天', value: 1},
      {text: '2 天', value: 3},
      {text: '7 天', value: 7},
    ]

    return {
      co_id: '',
      nowTime: nowTime,
      selected: 1,
      options: options,
      userMessage: {},
      detention_type: null,
      be_report_invite_code: '',
      report_type: '',
      be_report_status: '',
      reportTypeList: [],
      deType: 0,

      reporterDetentionInfo: {
        status: 0,
        record_time: null,
        who_detention: null,
        detention_type: null,
        ban_days: null,
        records: [[]]
      },
    }
  },
  created: function() {
    this.getNowTime()
    // 获取数据，
    let r = this.$route.query.co_id
    this.co_id = r
    this.be_report_invite_code = this.$route.query.be_report_invite_code
    this.getUserDetentionInfo(this.be_report_invite_code)
    this.report_type = this.$route.query.report_type
    this.be_report_status = this.$route.query.be_report_status
    this.getOptions()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'create',
  },
  methods: {
    getOptions: function() {
      apis.report_get_options().then(res => {
        const { data, errCode, msg } = res;
        if (errCode === 0) {
          console.log('res', res)
          this.reportTypeList = res.data.reportTypeList
          let typeArray = res.data.reportTypeList
          let type1 = findType(typeArray, this.report_type)
          console.log('type1', type1)
          this.detention_type = type1.value
        }
      }).catch()
    },
    getNowTime() {
      this.nowTime = this.$moment(this.nowTime).format('YYYY-MM-DD HH:mm:ss')
    },

    getDetainOutTime() {
        let endDateTime = this.$moment(this.nowTime).add(this.selected, 'days').format('YYYY-MM-DD HH:mm:ss')
        return endDateTime
    },

    getUserDetentionInfo: function(str){
      console.log('invite_code', str)
      let params = {
        invite_code: str
      }
      apis.report_get_user_detention_record(params).then(res => {
        const { data, errCode, msg } = res;
        console.log('data', data)
        if (errCode === 0) {
          this.reporterDetentionInfo.status = data.status;
          this.reporterDetentionInfo.record_time = data.record_time;
          this.reporterDetentionInfo.who_detention = data.who_detention;
          this.reporterDetentionInfo.detention_type = data.detention_type;
          this.reporterDetentionInfo.ban_days = data.ban_days;
          this.reporterDetentionInfo.records = data.records
        } else {
          alert(msg)
        }
      }).catch()
    },

    // 查询按钮
    invitationSelect: function() {
      let value = document.querySelector('#invitation')
      let str = value.value
      if (str === '') {
        return
      }
      console.log('value', value)
      this.getUserDetentionInfo(str)
    },
    //单条核实按钮
    detainClick: function() {
      let countDay = this.selected
      console.log('countDay', countDay)
      this.nowTime = demoDate()

      let id = this.co_id
      let post_data = {
        // this.getOptions()
        // ban_days: 7
        // check_type: 1
        // detention_time: "2021-01-07 14:40:31"
        // detention_type: 1
        // id: "488"
        id: id.toString(),
        detention_time: this.nowTime,
        ban_days: countDay,
        detention_type: this.detention_type,
        check_type: 1,
      }
      apis.report_report_check(post_data).then(res => {
        const { data, errCode, msg } = res;
        if (errCode === 0) {
          this.$router.push('/homepage')
        } else {
          alert(msg)
        }
      }).catch(err => {
        alert('接口异常')
      })
    },
    // 改变邀请码
  }
}
</script>

<style>
.co-detain-form{
  border-bottom: solid #a1a0a0 1px;
  padding: 10px;
}

.co-detain-all{
  font-size: 16px;
}
#invitation{
  width: 35vw;
  height: 30px;
}
.co-select{
  position: relative;
  left: 3%;
  border-radius: 5px;
  background: white;
  height: auto;
  font-size: 16px;
  padding: 4px 10px;
  border: 1px solid #a1a0a0;

}

.co-detain-text{
  line-height: 230%;
  padding: 10px;
}
#co-deType{
  width: 30vw;
  border-radius: 3px;
  height: 30px;
}
#downMenu{
  width: 50vw;
  border-radius: 3px;
  height: 30px;
}
.co-detain-sure{
  position: relative;
  width: 90vw;
  height: auto;
  border-radius: 3px;
  left: 1%;
  background: #ffffff;
  border: 1px solid #a1a0a0;

}

.co-detain-len{
  position: relative;
  top: 10px;
  border-top: solid #a1a0a0 1px;
  border-bottom: solid #a1a0a0 1px;
  padding-bottom: 10px;
}
</style>