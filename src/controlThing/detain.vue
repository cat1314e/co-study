<template>
  <div class="co-detain-all">
    <form method="get" class="co-detain-form">
      <label for="invitation">邀请码</label>
      <input id="invitation" :value=invite type="text"/>
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
        <p>拘留类型：垃圾营销</p>
        <p>拘留来源：自动封禁</p>
      </div>
    </div>
  </div>

</template>

<script>
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
      invite: '',
      nowTime: nowTime,
      outTime: outTime,
      selected: 1,
      options: options,
    }
  },
  created: function() {
    let r = this.$route.params.co_id
    console.log('this.$route.params.co_id', this.$route.params.co_id)
    this.invite = r
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'create',
  },
  methods: {
    detainClick: function() {
      let countDay =  this.selected
      this.outTime = demoDate(countDay)
      this.nowTime = demoDate(0)
    },

  }
}
</script>

<style>
.co-detain-form{
  border-bottom: solid black 1px;
  padding: 10px;
  /*margin: 10px;*/
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