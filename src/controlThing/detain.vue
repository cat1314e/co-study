<template>
  <div class="co-detain-all">
    <form method="get" class="co-detain-form">
      <label for="invitation">邀请码：  </label>
      <input id="invitation" :value=be_report_invite_code  type="text"/>
      <input class="co-select" type="submit" value="查询">
    </form>
<!--    <div class="co-detain-text">-->
      <div class="co-detain-text">
        <h4>拘留：</h4>
        <label for="downMenu">拘留天数： </label>
        <select id="downMenu" v-model="selected">
          <option v-for="(option, i) in options " :key="i" :value ="option.value">{{ option.text }}</option>
        </select>
        <p>预计于 {{ getDetainOutTime() }} 释放</p>
        <button @click="detainClick" class="co-detain-sure">确定</button>
      </div>
      <div class="co-detain-text co-detain-len">
        <h4>拘留记录：</h4>
        <p>拘留时间：{{ nowTime }}</p>
        <p>截至时间：{{ getDetainOutTime() }}</p>
        <p>拘留类型：{{ report_type }}</p>
        <p>拘留来源：{{ be_report_status }}</p>
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
    }
  },
  created: function() {
    this.getNowTime()

    let r = this.$route.query.co_id
    this.co_id = r
    console.log('r', r)
    // 获取数据，
    this.be_report_invite_code = this.$route.query.be_report_invite_code
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
          this.$router.replace('/homepage')
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
  font-size: 18px;
}
#invitation{
  width: 35vw;
  height: 30px;
}
.co-select{
  position: relative;
  left: 3%;
  border-radius: 3px;
  background: white;
  width: 15vw;
  height: auto;
  font-size: 16px;
  border: 1px solid #a1a0a0;

}

.co-detain-text{
  line-height: 230%;
  padding: 10px;
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