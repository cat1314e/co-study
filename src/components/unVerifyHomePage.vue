<template >
  <div>
<!--    <p>我的世界</p>-->
    <Card class="co-card" :bordered="false" v-for="(s, i) in userMessage"
          v-bind:key="i"
    >
      <p><span @click="actionClickUserMsg">被举报人：{{ s.reportUserName }}</span></p>
      <p>被举报时间：{{ s.reportTime }}</p>
      <p>举报类型：{{ s.reportType }}</p>
      <p>举报范围：{{ s.reportRange }}</p>
      <p>举报描述：{{ s.reportDescribe }}</p>
      <img class="co-image" v-bind:src=s.reportPhoto>
      <div class="co-buttons-update">
        <button @click="actionClickHandle" :disabled="canNoDetain" class="co-button-update">已核实</button>
        <button @click="actionClickIgnoreU" :disabled="canNoDetain" class="co-button-update">忽略</button>
      </div>
    </Card>
    <br>
  </div>




</template>
<script>
import n21 from '../api/message.js'



export default {
  name: 'userPage',
  data: function() {
    return {
      userMessage: n21,
      usershow: true,
      co_id: '',
      canNoDetain: true,
    }
  },
  methods: {
    actionClickUserMsg: function(event) {
      this.$emit('homePageMethod', 'Kp54')

    },
    actionClickHandle: function(event) {

    },
    actionClickIgnoreU: function(event) {

    },
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