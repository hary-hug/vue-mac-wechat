<template>
  <div class="wrapper">
    <div class="register-box">
      <p class="title">注册</p>
      <input v-model="email" class="email" placeholder="邮箱"/>
      <input v-model="password" class="password" type="password" placeholder="密码"/>
      <input v-model="rePassword" class="password" type="password" placeholder="确认密码"/>
      <button class="o-btn register" @click="register">注册</button>
      <p class="or">已有账号?</p>
      <a class="o-btn login" @click="toLogin">去登录</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      rePassword: '',      
    }
  },

  created() {
    
  },

  methods: {
    register() {
      if (!this.email) {
        this.$toast.show('请填写用户名')
        return
      }
      if (!this.password) {
        this.$toast.show('请填写密码')
        return
      }
      if (!this.rePassword) {
        this.$toast.show('请填写确认密码')
        return
      }
      if (this.password != this.rePassword) {
        this.$toast.show('密码不一致')
        return
      }
      this.$api.post('/register', {
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

    // open login 
    toLogin() {      
      this.$bus.$emit('show-login-event')      
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

.register-box {
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 100%;
  padding: 3rem;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: .25rem;
}

.register-box .title {
  margin-top: 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
}

.register-box .email, .register-box .password {
  margin-top: 2rem;
  padding: .375rem 1rem;  
  border: 1px solid #dde6e9;
  border-radius: .25rem;
  height: 3rem;
  line-height: 3rem;
  color: #666;
}

.register-box .o-btn {
  margin-top: 2rem;
  padding: 1rem;  
  border-radius: .25rem;    
  color: #ffffff;
  cursor: pointer;
  text-align: center;
}

.register-box .login {
  background: #75ba47;
}

.register-box .register {
  background: #5d9cec;
}

.register-box .or {
  margin-top: 1rem;
  text-align: center
}

</style>


