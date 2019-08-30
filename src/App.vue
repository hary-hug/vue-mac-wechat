<template>
  <div id="app">    
    <login v-if="showLogin"></login> 
    <register v-if="showRegister"></register>
    <dashboard v-if="isLogin"></dashboard> 
  </div>
</template>

<script>
import Login from '@/components/login.vue'
import Register from '@/components/register.vue'
import Dashboard from '@/components/dashboard.vue'

export default {
  name: 'app',

  data() {
    return {
      showLogin: false,
      showRegister: false,
      isLogin: false,
    }
  },

  components: {
    'login': Login,
    'register': Register,
    'dashboard': Dashboard,
  },

  created () {

    if (!this.$token.validate()) {
      this.showLogin = true        
    } else {
      this.isLogin = true
    }

    this.$bus.$on('show-login-event', (e) => {
      this.showLogin = true
      this.showRegister = false
    })
    
    this.$bus.$on('show-register-event', (e) => {
      this.showLogin = false
      this.showRegister = true
    })

    this.$bus.$on('show-dashboard-event', (e) => {      
      this.isLogin = true
      this.showLogin = false
      this.showRegister = false      
    })
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;  
  box-sizing: border-box;
  -webkit-box-sizing: border-box;  
}

html, body {  
  width: 100%;
  height: 100%;
  color: #333;
  font-size: 10px;
  font-weight: 400;  
  font-family: 'Avenir', Helvetica, Arial, sans-serif; 
  background: url('./assets/bg.jpg') no-repeat center; 
  background-size: cover;
}

a { 
  color: #333;
  text-decoration: none;
}

li {
  list-style: none;
}

input, textarea, button {
  outline: none;
  border: none;
}

::placeholder {
  color: #aaa;
}

.clear:after {
  content: '';
  display: block;
  visibility: hidden;
  height: 0;
  clear: both;
}

.clear {
  zoom: 1;
}

.fade-enter-active {
  transition: opacity 2s
}

.fade-leave-active {
  transition: opacity 1s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 80rem;
  min-height: 50rem;
  max-height: 60rem;
  margin: 0 auto;
  padding: 6rem 0;  
  overflow: hidden;  
}

@media (max-width: 960px) {
  #app {
    padding: 0;
  }
}

</style>
