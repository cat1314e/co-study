<template >
  <div>
    <Card class="co-card" :bordered="false" v-for="(s, i) in userMessage"
          v-bind:key="i"
    >
      <p>被举报人：<span @click="actionClickUserMsg(i)">{{ s.be_report_invite_code }}</span></p>
      <p>举报时间：{{ s.datetime }}</p>
      <p>举报类型：{{ s.report_type }}</p>
      <p>举报范围：{{ s.report_content }}</p>
      <p>举报状态：{{ s.be_report_status }}</p>
      <p>举报描述：{{ s.report_remark }}</p>
      <div class="co-list"  v-show="imgActiveChange === true">
        <img
            class="co-image"
            v-for="(a, j) in s.image"
            v-show="a !== ''"
            v-bind:src=getUrl(a)
            v-bind:key="j"
            v-bind:class="{
                    png_active: j === activeIndex01 && i === activeIndex02,
                }"
            @error="handleError(j, i)"
            @click="enlargeImageVerify(j, i)"
        >
      </div>
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
      imgActiveChange: true,
      card: null,
      activeIndex01: -1,
      activeIndex02: -1,
      pngUrl: 'https://co-study.oss-cn-shanghai.aliyuncs.com/app/image/report/',
      pageOption: {
        page_size: 10,
        total: 100,
        page: 1,
      },
    }
  },
  created() {

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
          this.$emit('func', {total: this.pageOption.total, len: this.userMessage.length,})
          console.log(res.data)
          // console.log('this.userMessage.length', this.userMessage.length)
        }
      }).catch()
    },
    actionClickUserMsg: function(index) {
      console.log('index', index)
      this.card = this.userMessage[index].be_report_invite_code
      this.$emit('homePageMethod', this.card)
    },

    handleError(j, i) {
      this.imgActiveChange = !this.imgActiveChange
      this.userMessage[i].image[j] = ''
      this.imgActiveChange = !this.imgActiveChange
    },
    // 图片点击放大
    enlargeImageVerify(j, i) {
      this.activeClickActive = !this.activeClickActive
      if (this.activeClickActive === true) {
        this.activeIndex01 = j
        this.activeIndex02 = i
      } else {
        this.activeIndex01 = -1
        this.activeIndex02 = -1
      }
      // event.classList.add('png_active')
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
  background: #0a0a0a0a;
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
  width: 30%;
  height: 20vw;
  z-index: 100;
}
.png_active{
  position: absolute;
  /*float: left;*/
  /*transition: width 0.5s, height 0.5s, translateX 0.5s;*/
  transform: translateX(-50%);
  left: 50%;
  top: 0;
  width: 100%;
  height: 50vw;
}

</style>