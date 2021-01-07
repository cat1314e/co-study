<template >
<!--  v-show="1 === 2"-->
  <div  class="co-home">
    <Card class="co-card" :bordered="false" v-for="(m, i) in userMessage"
          v-show="home_to_user === true"
          v-bind:key="i"
    >
      <!--在todo里添加一个东西使整行被点击都会响应-->
      <p>被举报人：<span @click="actionClickUser">{{ m.be_report_invite_code }}</span></p>
      <p>被举报时间：{{ m.datetime }}</p>
      <p>举报类型：{{ m.report_type }}</p>
      <p>举报范围：{{ m.report_content }}</p>
      <p>举报描述：{{ m.report_remark }}</p>
      <img class="co-image" v-bind:src=m.avatar>
      <div class="co-buttons-update">
        <button @click="actionClickHandle" class="co-button-update">处理</button>
        <button @click="actionClickIgnore" class="co-button-update">忽略</button>
        <button @click="actionClickDetain" :data-id=m.be_report_invite_code class="co-button-update">拘留</button>
      </div>
    </Card>
    <UserHomePage
        v-show="home_to_user === false"
        @fatherMethod="fatherMethod"
        v-bind:reportName="user_test"
    >
    </UserHomePage>

  </div>
</template>


<script>

import userHomePage from './userHomePage'
import apis from "../http/api.js"

export default {
  name: 'home',

  data: function() {
    return {
      userMessage: [],
      home_to_user: true,
      user_test: '',
      co_id: '',
    }
  },
  created() {
    this.getData()
    this.getOptions()
  },
  methods: {
    getOptions: function() {
      apis.report_get_options().then(res => {
        const { data, errCode, msg } = res;
        if (errCode === 0) {
          console.log('getOptions', res)
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
        console.log('data', res)
        if (errCode === 0) {
          this.userMessage = res.data.records
          console.log(res.data.records)
        }
      }).catch()
    },
    actionClickUser: function(event) {
      console.log('dark bad')
      this.home_to_user = false
      this.user_test = event.target.innerText
      console.log('this.user_test', this.user_test)
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
    actionClickDetain: function(event) {
      let self = event.target
      this.co_id = self.dataset.id
      console.log('co_id', this.co_id)
      this.$router.push({
        path:`/detain/${this.co_id}`
      })
    },
    fatherMethod() {
      console.log('测试')
      this.home_to_user = true
    },
    actionClickIgnore(event) {
      let self = event.target
      let userCard = self.closest('.co-card')
      console.log('userCard', userCard)
      userCard.remove()
      // 此处添加移除数据库的此条记录

    }
  },
  components: {
    UserHomePage: userHomePage,
  }
}
</script>

<style>

.co-card{
  border: 1px solid #eee;
  padding: 2px 0;
  margin: 5px 0;
}
.co-home{
  background:#eee;
  padding: 5px;
  line-height: 5vh;
}
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
.co-image{
  width: 60%;
}

</style>