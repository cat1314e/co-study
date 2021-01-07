<template>
  <div class="co-detain-all">
    <form method="get" class="co-detain-form">
      <label for="invitation">邀请码</label>
      <input id="invitation" :value=userMessage.be_report_invite_code type="text"/>
      <input class="co-select" type="submit" value="查询">
    </form>
    <div class="co-detain-text">
      <div>
        <h3>拘留：</h3>
        <label for="downMenu">拘留天数</label>
        <select id="downMenu" v-model="selected">
          <option v-for="(option, i) in options " :key="i" :value ="option.value">{{ option.text }}</option>
        </select>
        <p>预计于{{ outTime }}释放</p>
        <button @click="detainClick" class="co-detain-sure">确定</button>
      </div>
      <div class="co-detain-len">
        <h3>拘留记录：</h3>
        <div>拘留时间：{{ nowTime }} 至
          <br>{{ outTime }}</div>
        <p>拘留类型：{{ userMessage.report_type }}</p>
        <p>拘留来源：{{ userMessage.be_report_status }}</p>
      </div>
    </div>
  </div>

</template>

<script>
import apis from "../http/api.js"


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
    let nowTime = demoDate(0)
    let outTime = demoDate(1)
    let options = [
      {text: '一天', value: 1},
      {text: '三天', value: 3},
      {text: '七天', value: 7},
    ]

    return {
      co_id: '',
      nowTime: nowTime,
      outTime: outTime,
      selected: 1,
      options: options,
      userMessage: {},
      detention_type: null,
    }
  },
  created: function() {
    let r = this.$route.params.co_id
    console.log('this.$route.params.co_id', this.$route.params.co_id)
    this.co_id = r

    // 获取数据，
    this.getData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'create',
  },
  methods: {

    // 拿到数据
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
        if (errCode === 0) {
          let array = res.data.records
          // console.log('array', array)
          // console.log('this.co_id', this.co_id)
          this.userMessage = findId(array, this.co_id)
          // console.log('this.userMessage', this.userMessage)
          this.getOptions()
        }
      }).catch()
    },
    getOptions: function() {
      apis.report_get_options().then(res => {
        const { data, errCode, msg } = res;
        if (errCode === 0) {
          // console.log('getOptions', res)
          let typeArray = res.data.reportTypeList
          let type1 = findType(typeArray, this.userMessage.report_type)
          // console.log('type1', type1)
          this.detention_type = type1.value
          // console.log('this.detention_type', this.detention_type)
        }
      }).catch()
    },
    //单条核实按钮
    detainClick: function() {
      let countDay = this.selected
      this.outTime = demoDate(countDay)
      this.nowTime = demoDate(0)

      let id = this.userMessage.id
      let Sid = String(id)
      let post_data = {
        // this.getOptions()
        // ban_days: 7
        // check_type: 1
        // detention_time: "2021-01-07 14:40:31"
        // detention_type: 1
        // id: "488"
        id: Sid,
        detention_time: this.nowTime,
        ban_days: countDay,
        detention_type: this.detention_type,
        check_type: 1,
      }
      console.log('post_data', post_data)
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


  }
}
</script>

<style>
.co-detain-form{
  border-bottom: solid black 1px;
  padding: 10px;
}

.co-detain-all{
  font-size: 18px;
}
#invitation{
  width: 50vw;
  height: 20px;
}
.co-select{
  width: 20vw;
  height: 30px;
}

.co-detain-text{
  line-height: 300%;
  padding: 10px;
}

#downMenu{
  width: 50vw;
  border-radius: 3px;
}
.co-detain-sure{
  position: relative;
  width: 80vw;
  height: auto;
  border-radius: 3px;
  left: 5vw;
  background: #e8e8e8;

}

.co-detain-len{
  position: relative;
  top: 10px;
  border-top: solid black 1px;
  border-bottom: solid black 1px;
  /*padding: 10px;*/
}
</style>