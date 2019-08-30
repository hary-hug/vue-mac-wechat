<template>
  <div class="wechat">
    <div class="left-bar">
      <div class="search"></div>
      <div class="wechat-lists">
        <a :class="activeItemIndex == i ? 'wechat-item active' : 'wechat-item'" v-for="(chat, i) in chats" :key="i" @click="openDialog(chat.chat_id, i)">
          <div class="user">
            <div class="avatar">
              <span class="new" v-if="chat.new">{{chat.new}}</span>
              <img :src="chat.avatar"/>
            </div>
            <div class="msg">
              <p class="nickname">{{chat.title}}</p>
              <p class="last">{{chat.msg}}</p>
            </div>
          </div>
        </a>                      
      </div>
    </div>
    <div class="right-box">      
      <main-dialog v-if="showDialog" :chatId="chatId"></main-dialog>
    </div>
  </div>
</template>

<script>
import MainDialog from '@/components/wechat/dialog.vue'

export default {

  data() {
    return {
      showIndex: true,
      showDialog: false,
      chatId: 0,
      activeItemIndex: -1,      
    }
  },

  props: [
    'openChatId', // 用于接收父组件传值，并打开指定的chatId对话框
  ],

  components: {    
    'main-dialog': MainDialog,    
  },

  created() {
    if (this.openChatId >0) {
      // 总是在第一个显示
      this.openDialog(this.openChatId, 0)
    }
  },

  computed: {
    chats() {
      return this.$store.state.chats
    }
  },

  methods: {
    openDialog(chatId, i) {
      this.showIndex = false
      this.showDialog = true
      this.chatId = chatId
      this.activeItemIndex = i
    }
  }
}

</script>

<style scoped>

.wechat {
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

.left-bar .wechat-lists {  
  display: flex;
  flex-direction: column;  
  height: 100%;
  overflow-y: auto;     
}

.left-bar .wechat-lists .wechat-item {  
  min-height: 6rem; 
  padding: 0rem 1rem; 
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
}

.left-bar .wechat-lists .wechat-item.active {
  background-color: #eeeeee;  
}

.left-bar .wechat-lists .wechat-item .user {  
  display: flex;
  flex-direction: row;
  padding: 1rem 0rem;
  
}

.left-bar .wechat-lists .wechat-item .avatar {
  position: relative;  
}

.left-bar .wechat-lists .wechat-item .avatar .new {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  line-height: 18px;  
  background-color: #db4a45;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  font-weight: 100;  
}

.left-bar .wechat-lists .wechat-item .avatar img {
  width: 4rem;
  height: 4rem;
  border-radius: .25rem;
}

.left-bar .wechat-lists .wechat-item .msg {
  width: 100%;
  flex-shrink: 2;
  margin-left: 1rem;
}

.left-bar .wechat-lists .wechat-item .msg p {
  height: 2rem;
  line-height: 2rem;
}

.left-bar .wechat-lists .wechat-item .msg .nickname {
  font-size: 1.25rem;
}

.left-bar .wechat-lists .wechat-item .msg .last {
  color: #999;
  font-size: .2rem;
}

.right-box {
  width: 100%;  
  flex-shrink: 2;
  background: #f2f2f2;
}

</style>

