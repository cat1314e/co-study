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
        <button @click="detainClick" :disabled=canNoDetain class="co-detain-sure">{{ doDetain }}</button>
      </div>

      <div class="co-detain-text co-detain-len">
        <div v-if="reporterDetentionInfo.records[0].length !== 0">
          <div class="co-card" :bordered="false">
            <p>最近封禁详情：{{ be_report_invite_code }}</p>
            <div v-if="reporterDetentionInfo.record_time !== null">
              <p>{{ reporterDetentionInfo.record_time }}</p>
              <p>{{ reporterDetentionInfo.detention_type }}:</p>
              <p>
                <span>{{ reporterDetentionInfo.who_detention }}</span>
                <span>{{ reporterDetentionInfo.ban_days }}</span>
              </p>
            </div>
            <p>
              以下为历史封禁信息：
            </p>
          </div>
          <div class="co-card"
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
          </div>
          <br>
        </div>
        <div v-else>
          <div class="co-card" :bordered="false">
            <!--在todo里添加一个label使整行被点击都会响应-->
            <p> 暂无封禁记录～</p>
          </div>
        </div>
      </div>
<!--    </div>-->
  </div>

</template>

<script>
import apis from "../http/api.js"


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


export default {
  name: 'detain',
  data: function(){
    let options = [
      {text: '1 天', value: 1},
      {text: '3 天', value: 3},
      {text: '7 天', value: 7},
    ]

    return {
      co_id: '',
      selected: 1,
      options: options,
      userMessage: [],
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
        records: [[]],
      },
      total: 100,
      canNoDetain: false,
      doDetain: '确定',
    }
  },
  created: function() {
    // 获取数据，
    let r = this.$route.query.co_id
    this.co_id = r
    this.be_report_invite_code = this.$route.query.be_report_invite_code
    this.getUserDetentionInfo(this.be_report_invite_code)
    this.report_type = this.$route.query.report_type
    this.be_report_status = this.$route.query.be_report_status
    this.total = this.$route.query.total
    this.getOptions()
    this.getData()
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
          this.reportTypeList = res.data.reportTypeList
          let typeArray = res.data.reportTypeList
          let type1 = findType(typeArray, this.report_type)
          this.detention_type = type1.value
        }
      }).catch()
    },
    getData: function(t = 1) {
      let params = {
        page: t,
        page_size: this.total,
        start_datetime: '',
        end_datetime: '',
        be_report_invite_code: null,
        be_report_status: null,
        report_type: null,
        report_status: null,
        report_content: null,
        reporter_invite_code: null,
      }
      apis.report_get_data(params).then(res => {
        const { data, errCode, msg } = res;
        // console.log('data', res)
        if (errCode === 0) {
          this.userMessage = data.records
          this.total = data.count
        }
      }).catch()
    },

    getDetainOutTime() {
      let time = this.reporterDetentionInfo.record_time
      if (time !== null){
        let endDateTime = this.$moment(time).add(this.selected, 'days').format('YYYY-MM-DD HH:mm:ss')
        return endDateTime
      } else {
        let endDateTime = this.$moment().add(this.selected, 'days').format('YYYY-MM-DD HH:mm:ss')
        return endDateTime
      }

    },

    getUserDetentionInfo: function(str){
      console.log('invite_code', str)
      let params = {
        invite_code: str
      }
      apis.report_get_user_detention_record(params).then(res => {
        const { data, errCode, msg } = res;
        // console.log('data', data)
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
      this.be_report_invite_code = str
      this.getUserDetentionInfo(str)
      let codeIds = this.getReportIds()
      console.log('codeIds', codeIds)
      if (codeIds.length === 0) {
        this.canNoDetain = true
        this.doDetain = '改用户当前未被举报'
      } else {
        this.canNoDetain = false
        this.doDetain = '确定'
      }
    },

    getReportIds() {
      this.getData()
      let array = this.userMessage
      let intCode = this.be_report_invite_code
      let codeIds =  findAllId(array, intCode)
      return codeIds
    },
    // 批量核实
    detainClick() {
      let countDay = this.selected
      console.log('')
      let detention_time = this.getDetainOutTime()
      let codeIds = this.getReportIds()
      let post_data = {
        id: codeIds.join(','),
        detention_time: detention_time,
        ban_days: countDay,
        detention_type: this.deType,
        check_type: 1
      };
      apis.report_report_check(post_data).then(res => {
        const { data, errCode, msg } = res;
        console.log('删除', res)
        if (errCode === 0) {
          console.log('批量删除成功')
          this.$router.replace('/homepage')
        } else {
          alert(msg)
        }
      }).catch(err => {
        alert('接口异常')
      })
    },
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
.co-card{
  /*padding: 10px;*/
  width: 100%;
  border: none;
}

.co-detain-text{
  line-height: 230%;
  padding: 10px;
}
#co-deType{
  width: 28vw;
  border-radius: 3px;
  height: 30px;
  background: white;
}
#downMenu{
  width: 50vw;
  border-radius: 3px;
  height: 30px;
  background: white;
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