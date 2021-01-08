<template >
<div>
  <div v-if="reporterDetentionInfo.records[0].length !== 0">
    <Card class="co-card" :bordered="false">
      <p>最近封禁详情：{{ reportName }}</p>
      <p>{{ reporterDetentionInfo.record_time }}</p>
      <p>{{ reporterDetentionInfo.detention_type }}:</p>
      <p>
        <span>{{ reporterDetentionInfo.who_detention }}</span>
        <span>{{ reporterDetentionInfo.ban_days }}</span>
      </p>
      <p  v-if="reporterDetentionInfo.detention_type === '其他'">
        以下为历史封禁信息
      </p>
      <div class="co-buttons-update">
        <button  @click="updateDetentionRecordButton" v-if="reporterDetentionInfo.detention_type !== '其他'" class="co-button-update">修改期限</button>
        <button v-if="reporterDetentionInfo.detention_type !== '其他'" class="co-button-update">立即放出</button>
        <button @click="actionClickUserBack" class="co-button-update">返回</button>
      </div>
    </Card>
    <Card class="co-card" :bordered="false" v-for="(s, i) in reporterDetentionInfo.records"
          v-bind:key="i"
    >
      <!--在todo里添加一个label使整行被点击都会响应-->
      <p><span >被举报人：{{ reportName }}</span></p>
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
      <div class="co-buttons-update">
        <button @click="actionClickUserBack" class="co-button-update" style="height: 50px !important;">返回</button>
      </div>
    </Card>
  </div>
</div>




</template>

<script>
import apis from "../http/api.js"


const findType01 = (array, type) => {
  for (let i = 0; i < array.length; i++) {
    let index = array[i]
    if (index.reporter_invite_code === type) {
      return index
    }
  }
}

const ifToHome = (array, type) => {
  console.log('findType01(array, type)', findType01(array, type))
  if (findType01(array, type) === undefined) {
    return true
  }
  return false
}


export default {
  name: 'userPage',
  props: ['reportName'],
  data: function() {
    return {
      // userMessage: [],
      usershow: true,
      co_id: '',
      str: '',
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
  created() {
    // this.getUserDetentionInfo()
    // this.getData()
    this.getOptions()
  },
  methods: {
    getOptions: function() {
      apis.report_get_options().then(res => {
        const { data, errCode, msg } = res;
        if (errCode === 0) {
          // console.log('getOptions', res)
        }
      }).catch()
    },
    getData() {
      let params = {
        page: 1,
        page_size: 10000,
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
          this.userMessage = res.data.records
          console.log(res.data.records)
          let array = this.userMessage
          let type = this.reportName
          // 如果没有就返回
          if (ifToHome(array, type) === true) {
            this.$emit('fatherMethod')
          }
        }
      }).catch()
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
          // alert(msg)
        }
      }).catch()
    },

    // 返回 父组件
    actionClickUserBack: function() {
      // 当个人记录被删完时，调用这个
      this.$emit('fatherMethod')
    },

    // 修改期限
    updateDetentionRecordButton: function() {

    }

  },
}
</script>

<style>
.co-buttons-update{
  position: absolute;
  right: 5vw;
  width: 20vw;
  top: 5%;
}
.co-button-update{
  background: white;
  border: 1px solid #eee;
  width: 18vw;
  margin: 3%;
  border-radius: 5px;
}
.co-card {
  border: 1px solid #eee;
  padding: 2px 0;
  margin: 5px 0;
}
.co-image{
  width: 60%
}

</style>