<template>
  <div class="contact">
    <div class="left-bar">
      <div class="search"></div>
      <ul class="option-list">
        <li class="option-item">
          <div class="menu" @click="openNews">
            <span></span><span>新的朋友</span>
          </div>
          <ul class="u-list" v-show="showNews">
            <li class="u-item" v-for="(req, i) in friendRequests" :key="i" @click="openRequstInfo(req.req_id)">
              <img class="avatar" :src="req.avatar"/>
              <span class="nickanme">{{req.nickname}}</span>
              <span class="status" v-if="req.status == 0">等待验证</span>
              <span class="status" v-if="req.status == 1">已添加</span>              
            </li>            
          </ul>        
        </li>
        <li class="option-item">
          <div class="menu">
            <span></span><span>群聊</span>
          </div>          
        </li>
        <li class="option-item">
          <div class="menu" @click="openFriends">
            <span></span><span>联系人</span>
          </div>
          <ul class="u-list" v-show="showFriends">
            <li class="u-item" v-for="(friend, i) in friends" :key="i" @click="openFriendInfo(friend.uid)">
              <img class="avatar" :src="friend.avatar"/>
              <span class="nickanme">{{friend.nickname}}</span>
            </li>            
          </ul>
        </li>
      </ul>   
    </div>
    <div class="right-box">
      <main-info v-if="showFriendInfo" :friendId="friendId"></main-info>
      <main-request v-if="showRequestInfo" :reqId="reqId"></main-request>
    </div>
  </div>
</template>

<script>
import MainInfo from '@/components/contact/info.vue'
import MainRequest from '@/components/contact/request.vue'

export default {

  data() {
    return {
      showNews: false,
      showFriends: false,
      friendId: 0,
      reqId: 0,
      showFriendInfo: false,
      showRequestInfo: false,
    }
  },

  components: {    
    'main-info': MainInfo,  
    'main-request': MainRequest,    
  },
  
  computed: {
    friends() {      
      return this.$store.state.friends
    },
    friendRequests() {
      return this.$store.state.friendRequests
    }
  },

  methods: {

    openNews() {
      this.showNews = !this.showNews
    },

    openFriends() {      
      this.showFriends = !this.showFriends
    },

    openFriendInfo(friendId) {
      this.friendId = friendId
      this.showFriendInfo = true
      this.showRequestInfo = false
    },

    openRequstInfo(reqId) {
      this.reqId = reqId
      this.showFriendInfo = false
      this.showRequestInfo = true
    },

  }
}
</script>

<style scoped>

.contact {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.left-bar {
  display: flex;
  flex-direction: column;  
  width: 20rem;  
  height: 100%; 
  min-width: 20rem; 
  background: #fbfbfb;
  border-right: 1px solid #dddddd;
}

.left-bar .search {     
  height: 6rem;
  min-height: 6rem;  
  padding: 2rem 1rem;   
  background: #fbfbfb;
  border-bottom: 1px solid #eeeeee;
}

.left-bar .option-list {
  display: flex;
  flex-direction: column;  
  height: 100%;
  overflow-y: auto; 
}

.left-bar .option-list .menu {
  display: flex;
  padding: 0 1rem;
  margin-top: 2rem;
  cursor: pointer;  
}

.left-bar .option-list .menu span {
  height: 2rem;
  line-height: 2rem;
  text-align: center;
}

.left-bar .option-list .menu span:nth-child(1) {
  width: .8rem; 
  height: .8rem;
  border-radius: 2px;
  border-right: 2px solid #aaa;
  border-bottom: 2px solid #aaa;  
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);  
  margin-top: .56rem;
}

.left-bar .option-list .menu span:nth-child(2) {
  margin-left: .6rem;
}

.left-bar .option-list .u-list {
  padding-left: 2.5rem;
}

.left-bar .option-list .u-item {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  cursor: pointer;
}

.left-bar .option-list .u-item .avatar {
  width: 3rem;
  height: 3rem;
  border-radius: .25rem;
  margin-right: 1rem;
}

.left-bar .option-list .u-item .status {
  margin-right: 2rem;
  flex: 1;
  text-align: right;  
  color: #999;
}

.right-box {
  width: 100%;  
  flex-shrink: 2;
  background: #f2f2f2;
}

</style>
