<template>
  <div class="public">
    <div class="header">
    </div>
    <ul class="user-list">
      <li class="item" v-for="(user, i) in users" :key="i">
        <div class="item-box">
          <span class="status" :class="user.online ? 'online': ''"></span>
          <div class="main">
            <img class="avatar" :src="user.avatar"/>
            <span class="nickname">{{user.nickname}}</span>          
          </div>
          <div class="add-friend" @click="addFriend(user.uid)">申请好友</div>
        </div>        
      </li>                 
    </ul>
  </div>
</template>

<script>
export default {

  computed: {
    users() {
      return this.$store.state.publicUsers
    }
  },

  created() {    
    this.$bus.$emit('get-public-users')    
  },

  methods: {
    addFriend(uid) {
      this.$bus.$emit('send-friend-request', {uid: uid})
    }
  }

}
</script>

<style scoped>

.public {  
  height: 100%;
  background: #fff;
}

.public .header {
  height: 6rem;
  min-height: 6rem;   
  padding: 2rem; 
  border-bottom: 1px solid #dddddd;  
}

.user-list {  
  height: 100%;
  overflow-y: auto;
  padding: 2rem;
}

.user-list .item {
  float: left; 
  padding: 1rem;
  width: 20%;
}

.user-list .item .item-box {
  position: relative;
  border-radius: .25rem;   
  background: #f2f2f2;   
}

.user-list .item .status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #ccc;
}

.user-list .item .online {
  background: #64ac31;
}

.user-list .item .main {
  display: flex; 
  flex-direction: column;  
  padding: 1rem;     
}

.user-list .item .avatar {
  width: 2.5rem;
	height: 2.5rem;	
  border-radius: 50%;
}

.user-list .item .nickname {
  margin-top: .5rem;  
  color: #666;
}

.user-list .item .add-friend {
  background: #64ac31;
  color: #fff;
  padding: .5rem;
  text-align: center;
  border-bottom-left-radius: .25rem;
  border-bottom-right-radius: .25rem;
  cursor: pointer;
}

</style>


