<template >
<!--  v-show="1 === 2"-->
  <div  class="co-home" @touchstart="goTouchStart($event)" @touchmove="goTouchMove($event)" @touchend="goTouchEnd($event)">
    <div class="co-home-title">
      <span class="co-no-been co-been"
            :class="{ beenActive: ifActive === true }"
            @click="actionNoVerify"
      >
        未核实
      </span>
      <span class="co-has-been co-been"
            :class="{ beenActive: ifActive === false }"
            @click="actionIsVerify"
      >
        已核实
      </span>
    </div>
    <div>
      <Card class="co-card" :bordered="false" v-for="(m, i) in userMessage"
            v-show="homePage === true"
            v-bind:key="i"
      >
        <p>被举报人：<span @click="actionClickUser(i)" class="zhu">{{ m.be_report_invite_code }}</span></p>
        <p>被举报时间：{{ m.datetime }}</p>
        <p>举报类型：<span class="zhu">{{ m.report_type }}</span></p>
        <p>举报范围：{{ m.report_content }}</p>
        <p>举报状态：<span class="zhu">{{ m.be_report_status }}</span></p>
        <p>举报描述：{{ m.report_remark }}</p>
        <div>
          <img class="co-image" v-bind:src=getUrl(m.image)>
        </div>
        <div class="co-buttons-update" :data-id=m.id>
          <button @click="actionClickHandle(i)" class="co-button-update">处理</button>
          <button @click="actionClickIgnore(i)" class="co-button-update">忽略</button>
          <button @click="actionClickDetain(i)" class="co-button-update">拘留</button>
        </div>
        <div class="zhu-handle" v-show="HandleYes">
        </div>
        <div class="co-handle" v-show="HandleYes">
          <p>确定要处理该用户吗？</p>
          <p>1.用户的备考目标，昵称，设置默认值</p>
          <p>2.cowall 删除</p>
          <p>3.评论  删除。</p>
          <button class="co-pan-handle co-left" @click="actionHandleYes(i)">确定</button>
          <button class="co-pan-handle co-right" @click="actionHandleNo">取消</button>
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
        this.getData(t)
        this.$refs.Verify.getVerifyData(t)
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
      // 2 cowall 删除
      // 3 评论  删除


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
      if (selector.innerText.includes('未核实')) {
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
}
.co-home{
  background:#eee;
  padding: 5px;
  line-height: 5vh;
}
.co-home-title{
  position: relative;
  top: 0;
  width: 100%;
  padding: 5px;
  background: #eceaea;
  z-index: 100;
}
.co-been{
  position: relative;
  padding: 7px 10px;
  border: 1px solid silver;
  border-radius: 5px;
  background: white;
}
.co-has-been{
  left: 20px;
}
.co-no-been{
  left: 10px;
}
.beenActive{
  background: lightyellow;
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
  width: 300px;
  height: auto;
  background: white;
  top: 40%;
  left: 50%;
  padding: 10px;
  transform: translateX(-50%)translateY(-50%);
}
.co-pan-handle{
  position: relative;
  background: white;
  border: 1px gainsboro solid;
  width: 100px;
  border-radius: 5px;
}

.co-right{
  left: 40px;
}
.co-left{
  /*left: 10px;*/
}
</style>