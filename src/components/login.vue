<template>
  <div id="app">
    <Form class="co-study-form" ref="formInline" :model="formInline" :rules="ruleInline" inline label-position="top" label-height="50px">
      <div class="co-portrait">
        <img id="portrait" :src="url" alt="co-portrait">
      </div>
      <FormItem class="co-zhu" prop="user">
        <Input class="co-study-input" type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem class="co-zhu" prop="password">
        <Input class="co-study-input" type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem class="co-zhu">
        <Button class="co-study-button" type="primary" @click="handleSubmit('formInline')">登录</Button>
      </FormItem>
    </Form>

  </div>

</template>
<script>
import pic from '../assets/coStudy.png'
import common from '../utils/utils'
import apis from "../http/api"
export default {
  data: function() {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 0, message: '密码长度不能为空', trigger: 'blur' }
        ]
      },
      url: pic,
    }
  },
  methods: {
    handleSubmit(name) {
      let post_data = {
        'user_name': this.formInline.user,
        'password': this.formInline.password
      }
      apis.user_login(post_data).then(res=>{
        const {data, errCode, msg} = res;
        console.log('res', res)
        if (errCode === 0) {
          common.setToken(data.access_token)
          // console.log('access_token', localStorage.getItem('access_token'))
          this.$router.push('/homepage')
        }else {
          alert(msg)
        }
      })
    }
  },
}
</script>

<style>

.co-study-form {
  position: absolute;
  top: 40%;
  left: 5%;
  width: 90%;

}
.co-zhu{
  width: 95%;

}
.co-study-input{
  width: 100%;

}
.co-study-button{
  width: 100%;
  left: 10%;
  height: 45px;
  border-radius: 5px;
}
.co-portrait{
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid cornsilk;
  overflow: hidden;
  left: 50%;
  top: -78%;
  transform: translateX(-50%);
}
.co-portrait::before{
  content: "";
  padding-top: 100%;
  display: block;
}
#portrait{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translateX(-50%) translateY(-50%);
}
.ivu-input {
  height: 45px;
}
</style>