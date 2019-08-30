<template>
  <div class="wrapper">
    <div class="login-box">
      <p class="title">登录</p>
      <input v-model="email" class="email" placeholder="邮箱"/>
      <input v-model="password" class="password" type="password" placeholder="密码"/>
      <button class="o-btn login" @click="login">登录</button>
      <p class="or">注册账号?</p>
      <a class="o-btn register" @click="toRegister">去注册</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',         
    }
  },

  created() {
    console.log(this.$token.validate())
    if (this.$token.validate()) {      
      // 打开主界面
      this.$bus.$emit('show-dashboard-event')
    }
  },
  
  methods: {
    // login 
    login() {
      if (!this.email) {
        this.$toast.show('请填写用户名')
        return
      }
      if (!this.password) {
        this.$toast.show('请填写密码')
        return
      }
      this.$api.post('/login', {
        email: this.email,
        password: this.password
      }, (res) => {              
        if (res.code == 1) {              
          this.$token.save(res.data.access_token, res.data.expire_at)
          setTimeout(() => {
            // 打开主界面
            this.$bus.$emit('show-dashboard-event')
          }, 500)
        } else {
          this.$toast.show(res.msg)
        }
      })    
    },

    // open register 
    toRegister() {      
      this.$bus.$emit('show-register-event')     
    }
  }
}
</script>

<style scoped>

.wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;    
}

.login-box {
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 100%;
  padding: 3rem;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: .25rem;
}

.login-box .title {
  margin-top: 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
}

.login-box .email, .login-box .password {
  margin-top: 2rem;
  padding: .375rem 1rem;  
  border: 1px solid #dde6e9;
  border-radius: .25rem;
  height: 3rem;
  line-height: 3rem;
  color: #666;
}

.login-box .o-btn {
  margin-top: 2rem;
  padding: 1rem;  
  border-radius: .25rem;    
  color: #ffffff;
  cursor: pointer;
  text-align: center;
}

.login-box .login {
  background: #75ba47;
}

.login-box .register {
  background: #5d9cec;
}

.login-box .or {
  margin-top: 1rem;
  text-align: center
}

</style>
