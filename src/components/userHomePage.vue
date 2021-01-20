<template >
<div>
  <div class="userBackground" v-show="personalShow === false" v-if="reporterDetentionInfo.records[0].length !== 0">
    <Card class="co-card" :bordered="false">
      <p>最近封禁详情：{{ reportName }}</p>
      <p>{{ reporterDetentionInfo.record_time }}</p>
      <p>封禁类型：{{ reporterDetentionInfo.detention_type }}</p>
      <p>
        <span>{{ reporterDetentionInfo.who_detention }}</span>
        <span>{{ reporterDetentionInfo.ban_days }}</span>
      </p>
      <p>
        以下为历史封禁信息：
      </p>
      <div class="co-buttons-update">
        <button  @click="updateDetentionRecordButton" v-show="reporterDetentionInfo.status !== 0" class="co-button-update button-changeTime">修改期限</button>
        <button  @click="releaseDetentionRecordButton" v-show="reporterDetentionInfo.status !== 0" class="co-button-update button-changeOut">立即放出</button>
        <button @click="actionClickUserBack" class="co-button-update button-changeBack">返回</button>
      </div>
    </Card>
    <Card class="co-card"
          :bordered="false"
          v-for="(s, i) in reporterDetentionInfo.records"
          v-bind:key="i"
    >
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
        <button @click="actionClickUserBack" class="co-button-update button-changeBack">返回</button>
      </div>
    </Card>
  </div>

<div class="co-chang-days" v-show="changDays === true" >
   <div class="co-chang-day"
   >
     <p>确认修改期限么？</p>
     <hr>
     <p>{{ modalUpdateDetentionData.desc }}</p>
     <form>
       <label for="day">修改为:</label>
       <input type="text"
              id="day"
              v-model="modalUpdateDetentionData.ban_days"
       >
       <p>将在{{ getModalUpdateDetentionMsg() }}</p>
     </form>
     <div class="button-judge">
       <button @click="userClickCancel" class="co-judge">取消</button>
       <button @click="userClickDetermine" class="co-judge my-button-action">确定</button>
     </div>
   </div>
</div>

<div class="co-chang-days" v-show="liberateDay === true" >
  <div class="co-chang-day"
  >
    <p>确认放出该用户么？</p>
    <hr>
    <p>确认后该用户将解封!</p>
    <br>
    <div class="button-judge">
      <button @click="userLiberateCancel" class="co-judge">取消</button>
      <button @click="userLiberateDetermine" class="co-judge my-button-action">确定</button>
    </div>
  </div>
</div>

</div>




</template>

<script>
import apis from "../http/api.js"

export default {
  name: 'userPage',
  data: function() {
    return {
      reportName: '',
      changDays: false,
      personalShow: false,
      liberateDay: false,
      reporterDetentionInfo: {
        status: 0,
        record_time: null,
        who_detention: null,
        detention_type: null,
        ban_days: null,
        records: [[]]
      },
      modalUpdateDetentionData: {
        desc: null,
        detention_time: null,
        ban_days: 0,
        min_ban_days: null
      },
      backOptions: [],
    }
  },
  created() {
    this.getOptions()
  },
  methods: {
    getOptions: function() {
      apis.report_get_options().then(res => {
        const { data, errCode, msg } = res;
        if (errCode === 0) {
          this.backOptions = data
        }
      }).catch()
    },
    getUserDetentionInfo: function(str){
      this.reportName = str
      console.log('invite_code', str)
      let params = {
        invite_code: str
      }
      apis.report_get_user_detention_record(params).then(res => {
        const { data, errCode, msg } = res;
        console.log('data', data)
        if (errCode === 0) {
          this.reporterDetentionInfo.status = data.status;
          console.log('status', data.status)
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

    // 返回 父组件
    actionClickUserBack: function() {
      this.$emit('fatherMethod')
    },

    // 放出按钮
    releaseDetentionRecordButton: function() {
      this.personalShow = !this.personalShow
      this.liberateDay = !this.liberateDay
    },
    // 修改期限
    updateDetentionRecordButton: function() {
      this.changDays = !this.changDays
      this.personalShow = !this.personalShow
      this.getBeReporterLastStatus()
      // alert('sadd')
    },

    getModalUpdateDetentionMsg() {
      if (this.modalUpdateDetentionData.detention_time) {
        let endDateTime = this.$moment(this.modalUpdateDetentionData.detention_time).add(this.modalUpdateDetentionData.ban_days, 'days').format("YYYY-MM-DD")
        return endDateTime + ' 放出'
      } else {
        let endDateTime = this.$moment().add(this.modalUpdateDetentionData.ban_days, 'days').format("YYYY-MM-DD")
        return endDateTime + ' 放出'
      }
    },

    updateDetentionRecord(type) {
      if (type === 1 && this.modalUpdateDetentionData.ban_days < 1) {
        alert('天数不能小于1')
        return
      }
      let post_data = {
        update_type: type,
        invite_code: this.reportName,
        detention_time: this.modalUpdateDetentionData.detention_time,
        ban_days: this.modalUpdateDetentionData.ban_days,
        detention_type: this.reporterDetentionInfo.detention_type,
      }
      apis.report_update_detention_record(post_data).then(res => {
        const { data, errCode, msg } = res;
        if (errCode === 0) {
          this.showUserDetentionRecord = false
          console.log('放出了')
          this.getUserDetentionInfo(this.reportName)
        } else {
          alert(msg)
        }
      }).catch(err => {
        alert('接口异常')
      })

    },
    // 修改期限的数据
    getBeReporterLastStatus() {
      let params = {
        invite_code: this.reportName
      };
      apis.report_get_be_reporter_last_status(params).then(res => {
        const { data, errCode, msg } = res;
        console.log('datass', data)
        if (errCode === 0) {
          this.modalUpdateDetentionData.desc = data.desc;
          this.modalUpdateDetentionData.detention_time = data.detention_time;
          this.modalUpdateDetentionData.ban_days = data.min_ban_days
        } else {
          alert(msg)
        }
      }).catch(err => {
        alert('接口异常')
      })
    },
    // 确定和取消
    //
    userClickDetermine: function() {
      this.updateDetentionRecord(1)
      this.changDays = !this.changDays
      this.personalShow = !this.personalShow
    },
    userClickCancel: function() {
      this.changDays = !this.changDays
      this.personalShow = !this.personalShow
    },
    userLiberateDetermine: function() {
      this.updateDetentionRecord(2)
      this.personalShow = !this.personalShow
      this.liberateDay = !this.liberateDay

    },
    userLiberateCancel: function() {
      this.personalShow = !this.personalShow
      this.liberateDay = !this.liberateDay
    },



  },
}
</script>

<style scoped>
.co-buttons-update{
  position: absolute;
  right: 5vw;
  width: 20vw;
  top: 5%;
}
.co-button-update{
  border: 1px solid #eee;
  width: 18vw;
  margin: 3%;
  border-radius: 5px;
}
.button-changeTime {
  background: #f3e4aa;
  color: #9c8c4f;
}
.button-changeOut {
  background: #f3c4aa;
  color: #784b1f;
}
.button-changeBack {
  background: #eaf3aa;
  color: #6fc81f;
}
.co-card {
  border: 1px solid #eee;
  padding: 2px 0;
  margin: 5px 0;
}
.co-image{
  width: 60%
}
.userBackground{
  background: #FAE8AA;
}
.co-chang-days{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.5;
}

.co-chang-day{
  position: absolute;
  width: 80%;
  height: 40%;
  background: #FCF6E7;
  left: 10%;
  top: 20%;
  color: #403610;
  padding: 10px;
  border-radius: 5px;
}
.button-judge{
  position: absolute;
  left: 50%;
  bottom: 10%;
  width: 200px;
  transform: translateX(-50%);

}
.co-judge{
  border: 1px solid black;
  margin: 0 10px;
  width: 66px;
  height: 34px;
  border-radius: 5px;
}
.my-button-action{
  background: lightsalmon;
}
</style>