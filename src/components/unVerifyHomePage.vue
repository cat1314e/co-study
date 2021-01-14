<template >
  <div>
<!--    <p>我的世界</p>-->
    <Card class="co-card" :bordered="false" v-for="(s, i) in userMessage"
          v-bind:key="i"
    >
      <p><span @click="actionClickUserMsg(i)">被举报人：{{ s.be_report_invite_code }}</span></p>
      <p>被举报时间：{{ s.datetime }}</p>
      <p>举报类型：{{ s.report_type }}</p>
      <p>举报范围：{{ s.report_content }}</p>
      <p>举报描述：{{ s.report_remark }}</p>
      <img class="co-image" v-bind:src=getUrl(s.image)>
      <div class="co-buttons-update">
        <button @click="actionClickHandle" :disabled="canNoDetain" class="co-button-update">已核实</button>
        <button @click="actionClickIgnoreU" :disabled="canNoDetain" class="co-button-update">忽略</button>
      </div>
    </Card>
    <br>
  </div>




</template>
<script>
import apis from "../http/api.js"


export default {
  name: 'userPage',
  data: function() {
    return {
      userMessage: [],
      canNoDetain: true,
      card: null,
      pngUrl: 'https://co-study.oss-cn-shanghai.aliyuncs.com/app/image/report/',
      pageOption: {
        page_size: 10,
        total: 100,
        page: 1,
      },
    }
  },
  created() {
    this.getVerifyData()
  },
  methods: {
    getVerifyData: function(t = 1) {
      let params = {
        page: t,
        page_size: this.pageOption.page_size,
        start_datetime: '',
        end_datetime: '',
        be_report_invite_code: null,
        be_report_status: null,
        report_type: null,
        report_status: 1,
        report_content: null,
        reporter_invite_code: null,
      }
      apis.report_get_data(params).then(res => {
        const { data, errCode, msg } = res;
        if (errCode === 0) {
          // this.userMessage.concat(res.data.records)
          this.userMessage = [...this.userMessage, ...data.records]
          this.pageOption.total = data.count
          console.log(res.data)
        }
      }).catch()
    },
    actionClickUserMsg: function(index) {
      console.log('index', index)
      this.card = this.userMessage[index].be_report_invite_code
      this.$emit('homePageMethod', this.card)
    },
    actionClickHandle: function(event) {

    },
    actionClickIgnoreU: function(event) {

    },
    getUrl(image) {
      let url = this.pngUrl + image
      return url
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