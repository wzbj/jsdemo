<template>
  <div class="login">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
      <h1 class="title"><i class="el-icon-mobile-phone">登录</i></h1>
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    
    return {
      // 登录表单的数组
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },//非空
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }//长度
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 保留thius
          let _this = this;
          // console.log(this.axios)
          // 发送给后端
          this.axios.post('/api/checklogin',{
            params: {
              username: _this.loginForm.username,
              password: _this.loginForm.password
            }
          })
          .then(res => {
            console.log('后端响应')
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html,body{
  margin:0;
  padding: 0;
}
html,body,#app,.login{
  height: 100%;
}
.login{
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form{
  width: 400px;
  border:1px solid #ccc;
  border-radius: 4px;
  padding: 50px 45px 10px 10px;
}
.el-form .title{
  font-size: 26px;
  font-weight: bold;
  padding: 20px 0 20px 180px;
}
</style>
