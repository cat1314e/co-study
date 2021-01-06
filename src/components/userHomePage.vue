<template >
<!--  v-show="1 === 2"-->
<div>
  <Card class="co-card" :bordered="false" v-for="(s, i) in userMessage"
    v-bind:key="i"
    v-show="reportName === s.reportUserName"
  >
  <!--在todo里添加一个label使整行被点击都会响应-->
  <p><span @click="actionClickUserBack">被举报人：{{ s.reportUserName }}</span></p>
  <p>被举报时间：{{ s.reportTime }}</p>
  <p>举报类型：{{ s.reportType }}</p>
  <p>举报范围：{{ s.reportRange }}</p>
  <p>举报描述：{{ s.reportDescribe }}</p>
  <img class="co-image" v-bind:src=s.reportPhoto>
  <div class="co-buttons-update">
    <button @click="actionClickHandle" class="co-button-update">处理</button>
    <button @click="actionClickIgnoreU" class="co-button-update">忽略</button>
    <button @click="actionClickDetainU" :data-id=s.reportInvite class="co-button-update">拘留</button>
  </div>
  </Card>
  <br>
</div>




</template>

<script>
import n21 from '../api/message.js'



export default {
  name: 'userPage',
  props: ['reportName'],
  data: function() {
    return {
      userMessage: n21,
      usershow: true,
      co_id: '',
    }
  },
  methods: {
    actionClickUserBack: function() {
      this.$emit('fatherMethod');
    },
    actionClickHandle: function(event) {
      let self = event.target
      let buttons = self.closest('.co-buttons-update')
      let theButton = buttons.querySelectorAll('.co-button-update')[2]
      let ign = theButton.dataset.id
      // 删除这个邀请码的举报范围：
      // 1用户 => 用户的备考目标，昵称，设置默认值
      //
      // 2 cowall 删除
      // 3 评论  删除。

    },
    actionClickDetainU: function(event) {
      let self = event.target
      this.co_id = self.dataset.id
      console.log('co_id', this.co_id)
      this.$router.push({
        path:`/detain/${this.co_id}`
      },)
    },
    actionClickIgnoreU(event) {
      let self = event.target
      let userCard = self.closest('.co-card')
      console.log('userCard', userCard)
      userCard.remove()
      // 此处添加移除数据库的此条记录，并且刷新userpage组件
      // this.$emit('actionClickIgnore')
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