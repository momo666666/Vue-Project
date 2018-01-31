<template>
  <el-row>
    <el-col :span="10" offset="7" style="padding: 50px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
          <el-form-item label="账号" prop="account">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <!--<el-button type="primary" @click="onLogin('form')">登录</el-button>-->
            <el-button type="primary" @click="userLogin">登录</el-button>
            <el-button type="primary" @click="onRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
  import authApi from '../api/auth/user'
  import router from '../router'
  import {mapActions} from 'vuex'

  export default {
    name: 'login',
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户账号', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入用户密码', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      userLogin () {
        // 'sws001'
        // console.log(this.form)
        authApi.userLogin(this.form).then(res => {
          console.log(res.status)
          console.log(res.data)
          let resData = res.data
          let loginRes = {}
          loginRes.access_token = resData.object[1].token
          loginRes.user = {
            id: resData.object[0].id,
            username: resData.object[0].userName
          }
          this.login(loginRes)
          router.push({
            path: 'homePage'
          })
        }).catch(res => {
          console.log(res)
        })
      },
      // onLogin (formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       this.$router.push('/word')
      //     } else {
      //       console.log('error submit!!')
      //       return false
      //     }
      //   })
      // },
      onRegister () {
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped>
  .clearfix {
    text-align: center;
    font-size: 22px;
  }
</style>
