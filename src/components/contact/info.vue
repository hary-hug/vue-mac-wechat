<template>
  <div class="info">
    <div class="base">
      <div class="intro">
        <p class="nickname">{{user.nickname}}</p>
        <p class="signature">{{user.signature}}</p>
      </div>
      <img class="avatar" :src="user.avatar"/>
    </div>
    <div class="detail">
      <div class="item">
        <span class="option">邮 箱</span>
        <span class="value">{{user.email}}</span>
      </div>
    </div>
    <div class="send">
      <span @click="toDialog(friendId)">发消息</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  props: [
    'friendId'
  ],
  

  computed: {
    user() {      
      let result = this.$store.state.friends.find((item) => {
        return item.uid === this.friendId
      })    
      return result
    }
  },

  methods: {
    toDialog(friendId) {
      this.$bus.$emit('create-chat', {friendId: this.friendId})
    }
  }

}
</script>

<style scoped>

.info {
  padding: 9rem;
  height: 100%;
  background: #ffffff;
}

.base {
  display: flex;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eeeeee;
}

.base .intro {
  width: 100%;
}

.base .intro .nickname {
  font-size: 3rem;
}

.base .intro .signature {
  margin-top: 1rem;  
  color: #999;
}

.base .avatar {
  width: 8rem;
  height: 8rem;
  border-radius: .25rem;
}

.detail {
  margin-top: 2rem;
}

.detail .item .option {
  color: #999;
}

.detail .item .value {
  margin-left: 1rem;
}

.send {
  margin-top: 4rem;
  text-align: center;    
}

.send span { 
  display: inline-block; 
  background: #64ac31;
  border-radius: .25rem;
  color: #fff;
  padding: 1rem 2rem;
  cursor: pointer;
}

</style>


