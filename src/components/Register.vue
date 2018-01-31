<template>
  <el-row>
    <el-col :span="10" offset="7" style="padding: 50px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>注册</span>
        </div>
        <el-form :model="RegisterForm" status-icon :rules="rules2" ref="RegisterForm" label-width="100px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="RegisterForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="RegisterForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="RegisterForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userRegister">提交</el-button>
            <el-button @click="resetForm('RegisterForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import authApi from '../api/auth/user'
  import router from '../router'

  export default {
    name: 'register',
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.RegisterForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }

      return {
        RegisterForm: {
          username: '',
          password: '',
          checkPass: ''
        },
        rules2: {
          username: [
            {required: true, message: '请输入用户账号', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      postRegister () {
        return {
          username: this.RegisterForm.username,
          password: this.RegisterForm.password
        }
      }
    },
    methods: {
      userRegister () {
        authApi.userRegister(this.postRegister).then(res => {
          console.log(res.status)
          console.log(res.data)
          router.push({
            path: 'login'
          })
        }).catch(res => {
          console.log(res)
        })
      },
      // submitForm (formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       this.$router.push('')
      //     } else {
      //       console.log('error submit!!')
      //       return false
      //     }
      //   })
      // },
      resetForm (formName) {
        this.$refs[formName].resetFields()
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
