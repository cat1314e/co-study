<template >
  <div  class="co-home" @touchstart="goTouchStart($event)" @touchmove="goTouchMove($event)" @touchend="goTouchEnd($event)">
    <div class="co-home-title">
      <button class="co-no-been co-been"
            :class="{ beenActive: ifActive === true }"
            @click="actionNoVerify"
      >
        待处理
      </button>
      <button class="co-has-been co-been"
            :class="{ beenActive: ifActive === false }"
            @click="actionIsVerify"
      >
        已核实
      </button>
    </div>
    <div>
      <Card class="co-card" :bordered="false" v-for="(m, i) in userMessage"
            v-show="homePage === true"
            v-bind:key="i"
      >
        <p @click="actionClickUser(i)">被举报人：<span class="changBackGround">{{ m.be_report_invite_code }}</span></p>
        <p>举报时间：{{ m.datetime }}</p>
        <p>举报类型：{{ m.report_type }}</p>
        <p>举报范围：{{ m.report_content }}</p>
        <p>举报状态：{{ m.be_report_status }}</p>
        <p>举报描述：{{ m.report_remark }}</p>
        <div class="co-list">
<!--          v-show="m.image.length > 0"-->
<!--          v-for="(a, j) in m.image"-->
<!--          v-bind:src=a-->
          <img
              class="co-image"
              v-show="m.image.length > 0"
              v-for="(a, j) in m.image"
              v-bind:src=getUrl(a)
              v-bind:key="j"
              v-bind:class="{
                    png_active: j === activeIndex01 && i === activeIndex02,
                }"
              @click="enlargeImage(i, j)"
          >
<!--          <img class="co-image" src="../assets/coStudy.png" v-bind:class=active @click="enlargeImage">-->
        </div>
        <div class="co-buttons-update" :data-id=m.id>
          <button @click="actionClickHandle(i)"  class="co-button-update button-handle">处理</button>
          <button @click="actionClickIgnore(i)"  class="co-button-update button-ignore">忽略</button>
          <button
              v-show="contentType.includes(m.content_type) "
              @click="actionClickDetain(i)"
              class="co-button-update button-detain"
          >拘留</button>
        </div>
        <div class="zhu-handle" v-show="HandleYes">
        </div>
        <div class="co-handle" v-show="HandleYes">
          <p>确定要处理该用户吗？</p>
          <p>1.用户的备考目标，昵称，设置默认值</p>
          <p>2.coWall 删除</p>
          <p>3.评论  删除。</p>
          <button class="co-pan-handle co-left changBackGround" @click="actionHandleNo">取消</button>
          <button class="co-pan-handle co-right changBackGround " @click="actionHandleYes(i)">确定</button>
        </div>
      </Card>

      <unVerifyHomePage
          ref="Verify"
          v-show="home_to_verifyPage === true"
          @homePageMethod="homePageMethod"
      >
      </unVerifyHomePage>

      <UserHomePage
          ref="child"
          v-show="home_to_userPage === true"
          @fatherMethod="fatherMethod"
          v-bind:reportName="user_test"
      >
      </UserHomePage>
    </div>
  </div>
</template>


<script>
import unVerifyHomePage from './unVerifyHomePage'
import userHomePage from './userHomePage'
import apis from "../http/api.js"
import tool from '../tool/tool.js'


export default {
  name: 'home',

  data: function() {
    return {
      userMessage: [],
      ifActive: true,
      pageOption: {
        page_size: 10,
        total: 100,
        page: 1
      },
      activeClickActive: false,
      activeIndex01: -1,
      activeIndex02: -1,
      contentType: [0, 1, 4],
      // active: '',
      homePage: true,
      home_to_verifyPage: false,
      home_to_userPage: false,
      HandleYes: false,
      user_test: '',
      co_id: '',
      distance: 0,
      userPage: 1,
      pngUrl: 'https://co-study.oss-cn-shanghai.aliyuncs.com/app/image/report/',
    }
  },
  created() {
    this.getData()
    this.getOptions()
  },
  methods: {
    goTouchStart(e){
      this.distance = e.targetTouches[0].pageY
    },
    goTouchMove(){
    },
    goTouchEnd(e){
      this.distance -= e.changedTouches[0].pageY
      if (this.distance > 30) {
        this.userPage += 1
        let t = this.userPage
        if (this.ifActive === true) {
          this.getData(t)
        } else {
          this.$refs.Verify.getVerifyData(t)
        }
        console.log('this.userPage',this.userPage)
      }
    },
    getOptions: function() {
      apis.report_get_options().then(res => {
        const { data, errCode, msg } = res;
        if (errCode === 0) {
          console.log('getOptions', data)
        }
      }).catch()
    },
    getData: function(t = 1) {
      let params = {
        page: t,
        page_size: this.pageOption.page_size,
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
          // this.userMessage.concat(res.data.records)
          this.userMessage = [...this.userMessage, ...data.records]
          this.pageOption.total = data.count
          console.log(res.data)
        }
      }).catch()
    },

    // 放大图片
    enlargeImage(i, j) {
      this.activeClickActive = !this.activeClickActive
      if (this.activeClickActive === true ) {
        this.activeIndex01 = j
        this.activeIndex02 = i
      } else {
        this.activeIndex01 = -1
        this.activeIndex02 = -1
      }
      // event.classList.add('png_active')
    },

    // 核实和未核实页面
    actionNoVerify: function() {
      this.ifActive = true
      this.homePage = true
      this.home_to_verifyPage = false
      this.home_to_userPage = false
    },
    actionIsVerify: function() {
      this.ifActive = false
      this.homePage = false
      this.home_to_verifyPage = true
      this.home_to_userPage = false
      this.$refs.Verify.getVerifyData()
    },
    // 切换到个人页面
    actionClickUser: function(index) {
      this.home_to_userPage = true
      this.homePage = false
      this.user_test = this.userMessage[index].be_report_invite_code
      this.$refs.child.getUserDetentionInfo(this.user_test)
    },


    actionHandleYes: function(index) {
      this.HandleYes = !this.HandleYes
      // 删除这个邀请码的举报范围：
      // 1用户 => 用户的备考目标，昵称，设置默认值
      // 2 coWall 删除
      // 3 评论  删除
      let params = {
        report_id: index,
      }
      apis.report_handle(params).then(res => {
        const { data, errCode, msg } = res;
        if (errCode === 0) {
          console.log('处理成功')
          let id = index.toString()
          this.userMessage = tool.removeArray01(this.userMessage, id)
        }
      }).catch()

    },
    actionHandleNo: function() {
      this.HandleYes = !this.HandleYes
    },
    actionClickHandle: function(index) {
      this.HandleYes = !this.HandleYes
    },

    fatherMethod() {
      const e = (selector) => document.querySelector(selector)
      let selector = e('.beenActive')
      if (selector.innerText.includes('待处理')) {
        console.log('测试')
        this.home_to_userPage = false
        this.homePage = true
      } else {
        console.log('已核实')
        this.home_to_verifyPage = true
        this.home_to_userPage = false
      }
    },
    homePageMethod(card) {
      console.log('card', card)
      this.home_to_verifyPage = false
      this.home_to_userPage = true
      this.$refs.child.getUserDetentionInfo(card)
    },
    getUrl(image) {
      let url = this.pngUrl + image
      return url
    },
    actionClickDetain: function(index) {
      this.co_id = this.userMessage[index].id
      let be_report_invite_code = this.userMessage[index].be_report_invite_code
      let report_type = this.userMessage[index].report_type
      let be_report_status = this.userMessage[index].be_report_status
      console.log('be_report_invite_code', be_report_invite_code)
      this.$router.push({
        path: '/detain',
        query: {
          co_id: this.co_id,
          total: this.pageOption.total,
          be_report_invite_code: be_report_invite_code,
          report_type: report_type,
          be_report_status: be_report_status,
        }
      })
    },
    actionClickIgnore(index) {
      let id = this.userMessage[index].id
      // 此处添加移除数据库的此条记录
      let post_data = {
        id: id.toString(),
        check_type: 2
      };
      apis.report_report_check(post_data).then(res => {
        const { data, errCode, msg } = res;
        if (errCode === 0) {
          let numberId = Number(id)
          this.userMessage = tool.removeArray01(this.userMessage, numberId)
        } else {
          alert(msg)
        }
      }).catch(err => {
        alert('接口异常')
      })
    }
  },
  components: {
    unVerifyHomePage: unVerifyHomePage,
    UserHomePage: userHomePage,
  }
}
</script>

<style>

.co-card{
  border: 1px solid #eee;
  padding: 2px 0;
  margin: 5px 0;
  height: auto;
  background: #FCF6E7;
}
.co-home{
  background: #FAE8AA;
  line-height: 5vh;
  color: #78661f;
}
.co-home-title{
  position: relative;
  top: 0;
  width: 100%;
  padding: 5px;
  background: #FCF6E7;
  opacity: 0.8;
  z-index: 100;
}
.co-been{
  position: relative;
  padding: 0 15px;
  outline: none;
  /*width: 80px;*/
  border: 1px solid silver;
  border-radius: 5px;
  /*background: #f9f0cd;*/
  background: white;
}
.co-has-been{
  left: 20px;
}
.co-no-been{
  left: 10px;
}
.beenActive{
  background: #f3e4aa;
  /*color: #9c8c4f;*/
}
.co-buttons-update{
  position: absolute;
  right: 5vw;
  width: 20vw;
  top: 20px;
}
.co-button-update{
  border: 1px solid #eee;
  outline: none;
  width: 18vw;
  margin: 3%;
  border-radius: 5px;
}
.co-button-update:active{
  background: lightskyblue;
}
.changBackGround:active{
  background: lightskyblue;
}
.button-detain {
  background: #f3e4aa;
  color: #9c8c4f;
}
.button-handle {
  background: #f3c4aa;
  color: #784b1f;
}
.button-ignore {
  background: #eaf3aa;
  color: #6fc81f;
}
.zhu-handle{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: beige;
}
.co-handle{
  position: fixed;
  width: 85vw;
  height: auto;
  background: #f3e4aa;
  top: 40%;
  left: 50%;
  padding: 10px;
  transform: translateX(-50%)translateY(-50%);
}
.co-pan-handle{
  position: relative;
  background: white;
  border: 1px gainsboro solid;
  top: 2px;
  width: 86px;
  height: 40px;
  border-radius: 5px;
  opacity: 0.8;
}

.co-right{
  left: 80px;
  background: sandybrown;

}

.co-left{
  left: 20px;
  background: honeydew;
}
.co-list{
  position: relative;
  width: 100%;
  height: auto;
}
.co-image{
  width: 30%;
  height: 20vw;
  z-index: 100;
}
.png_active{
  position: absolute;
  transition: width 0.5s, height 0.5s, translateX 0.5s;
  transform: translateX(-50%);
  left: 50%;
  top: 0;
  width: 100%;
  height: 50vw;
}


</style>