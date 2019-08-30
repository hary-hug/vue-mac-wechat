<template>
  <div class="wrapper">
    <div class="tool-bar">
      <div class="avatar" @click="openMe">
        <img :src="me.avatar"/>        
      </div>
      <div class="items">          
        <a class="item" :class="showWechat ? 'active': ''" @click="openWechat">          
          <i class="wechat"></i>
        </a>
        <a class="item" :class="showContact ? 'active': ''" @click="openContact">
          <span class="msg" v-show="contactNo">{{contactNo}}</span>
          <i class="contact"></i>
        </a>
        <a class="item" :class="showPublic ? 'active': ''" @click="openPublic">
          <i class="online"></i>
        </a>      
      </div>
      <div class="setting"><i class="lists"></i></div>

      <div class="my-panel" :class="showMe ? 'active': ''">
        <div class="base">
          <div class="intro">
            <p class="nickname">{{me.nickname}}</p>
            <p class="signature">{{me.signature}}</p>
          </div>
          <img class="avatar" :src="me.avatar"/>
        </div>
        <div class="detail">
          <div class="item">
            <span class="option">邮 箱</span>
            <span class="value">{{me.email}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <wechat-main v-if="showWechat" :openChatId="openChatId"></wechat-main>
      <contact-main v-if="showContact"></contact-main>
      <public-main v-if="showPublic"></public-main>
    </div>
    
  </div>
</template>

<script>
import WechatMain from '@/components/wechat/main.vue'
import ContactMain from '@/components/contact/main.vue'
import PublicMain from '@/components/public/main.vue'

export default {

  data() {
    return {
      conn: null,
      pingInterval: 0,
      showMe: false,
      showWechat: true,  
      showContact: false,      
      showPublic: false,
      openChatId: 0, // 用于传递打开指定的对话          
    }
  },

  components: {
    'wechat-main': WechatMain,
    'contact-main': ContactMain,    
    'public-main': PublicMain, 
  },

  computed: {
    me() {
      return this.$store.state.me
    },
    contactNo() {
      return this.$store.state.newContactNo
    }
  },

  created() {      
    if (this.$token.validate()) {
      this.connect()
    }

    this.$bus.$on('get-chat-detail', (e) => {
      this.conn.send(this.createClientMessage('getChatMessages', {
        'chat_id': e.chatId        
      }))
    })

    this.$bus.$on('send-chat-message', (e) => {
      this.conn.send(this.createClientMessage('sendChatMessage', {
        'chat_id': e.chatId,
        'content': e.content
      }))
    })

    // 接收发信息按钮事件
    this.$bus.$on('create-chat', (e) => {            
      this.conn.send(this.createClientMessage('createChat', {
        'friend_id': e.friendId        
      }))
    })

    // 获取公开的用户列表
    this.$bus.$on('get-public-users', (e) => {
      this.conn.send(this.createClientMessage('getPublicUsers', {}))
    })

    // send-friend-request
    this.$bus.$on('send-friend-request', (e) => {
      this.conn.send(this.createClientMessage('sendFriendRequest', {uid: e.uid}))
    })

    // 发送通过好友验证请求
    this.$bus.$on('send-agree-request', (e) => {
      this.conn.send(this.createClientMessage('sendAgreeFriendRequest', {req_id: e.reqId}))
    })

  },

  methods: {

    openMe(e) {            
      this.showMe = !this.showMe
    },

    openWechat() {
      this.showWechat = true      
      this.showContact = false 
      this.showPublic = false  
    },

    openContact() {      
      this.showContact = true
      this.showWechat = false 
      this.showPublic = false
      // 点击后清空
      this.$store.commit('clearNewContactNo')
      // get my chat lists
      this.conn.send(this.createClientMessage('getFriends',{}))
      // get friend request lists
      this.conn.send(this.createClientMessage('getFriendRequests',{}))
    },

    openPublic() {
      this.showContact = false
      this.showWechat = false 
      this.showPublic = true
    },

    connect() {
      if (this.conn) {
        return
      }
      this.conn = new WebSocket('ws://127.0.0.1:8080/ws?token=' + this.$token.getToken())
      this.conn.onopen = (e) => {   
        this.$store.commit('setConnected', true)     
        // send ping every 12 second
        this.pingInterval = setInterval(() => {          
          this.conn.send(this.createClientMessage('ping', {}))
        }, 15000)

        // get my profile
        this.conn.send(this.createClientMessage('getMe',{}))  
        // get my chat lists
        this.conn.send(this.createClientMessage('getChats',{}))           
      }
      // recieve message
      this.conn.onmessage = (e) => {      
        var res = JSON.parse(e.data)
        switch(res.meta) {
          case 'pong':
            console.log('pong')
            break
          case 'me':
            this.$store.commit('setMe', res.data)
            break
          case 'chats':
            this.$store.commit('setChats', res.data)
            break
          case 'newChat':
            this.$store.commit('addNewChat', res.data)  
            this.openChatId = res.data.chat_id
            this.openWechat()          
            break
          case 'chatMessages':
            this.$store.commit('setChatMessages', res.data)           
            break
          case 'newMessage':
            this.$store.commit('addNewChatMessage', res.data)
            break
          case 'friends':
            this.$store.commit('setFriends', res.data)
            break
          case 'publicUsers':
            this.$store.commit('setPublicUsers', res.data)
            break
          case 'newContactNo':
            this.$store.commit('setNewContactNo', res.data)
            break
          case 'friendRequests':
            this.$store.commit('setFriendRequests', res.data)
            break;
        }
      }
      // close
      this.conn.onclose = (e) => {
        this.conn = null
      }
      // connect error
      this.conn.onerror = (e) => {
        
      }
    },
    createClientMessage (event, data) {
      return JSON.stringify({'event': event, 'payload': JSON.stringify(data)})
    }
  },  
}
</script>

<style>

.wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;    
}

.tool-bar {
  position: relative;
  width: 7rem;
  min-width: 7rem; 
  height: 100%;
  background-color: rgba(25, 25, 25, .9); 
  border-top-left-radius: .25rem;
  border-bottom-left-radius: .25rem;
}

.tool-bar .avatar { 
  position: relative;  
  height: 6rem;   
  text-align: center; 
  cursor: pointer;
}

.tool-bar .avatar img {
  width: 4rem;
  height: 4rem;
  margin-top: 1rem;
  border-radius: .25rem;
}

.tool-bar .items {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.tool-bar .items .item {
  position: relative;
  height: 6rem;  
  text-align: center;
  cursor: pointer;
}

.tool-bar .items .item .msg {
  position: absolute;
  top: 2rem;
  left: 3.5rem;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  background: #db4a45;
  color: #fff;
  border-radius: 50%;
}

.tool-bar .items .item i {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  margin-top: 1.75rem;   
}

.tool-bar .items .item i.wechat {
  background: url('../assets/icons/chat.png') no-repeat center; 
  background-size: 2.5rem 2.5rem;
}

.tool-bar .items .active i.wechat {
  background: url('../assets/icons/chat-selected.png') no-repeat center; 
  background-size: 2.5rem 2.5rem;
}

.tool-bar .items .item i.contact {
  background: url('../assets/icons/contact.png') no-repeat center;  
  background-size: 2.5rem 2.5rem;
}

.tool-bar .items .active i.contact {
  background: url('../assets/icons/contact-selected.png') no-repeat center;  
  background-size: 2.5rem 2.5rem;
}

.tool-bar .items .item i.online {
  background: url('../assets/icons/online.png') no-repeat center;  
  background-size: 2rem 2rem;  
}

.tool-bar .items .active i.online {
  background: url('../assets/icons/online-selected.png') no-repeat center;  
  background-size: 2rem 2rem;  
}

.tool-bar .items .item i.favor {
  background: url('../assets/icons/favor.png') no-repeat center; 
  background-size: 2rem 2rem;   
}

.tool-bar .setting {
  position: absolute;
  bottom: 2rem;
  width: 100%;
  height: 4rem;  
  text-align: center;
}

.tool-bar .setting i {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin-top: .5rem;
  background: url('../assets/icons/setting.png') no-repeat center; 
  background-size: 2rem 2rem;
}

.tool-bar .my-panel {
  position: absolute;
  left: 7rem;
  top: 1rem;
  width: 25rem;   
  background: #fff;
  z-index: -1;
  padding: 3rem;
  border-radius: 2px;
  box-shadow: 0 2px 2px rgba(66, 68, 69, 0.1);
  background-color: #FFFFFF;
  opacity: 1;
  transform: translateY(0);
  transition: all .35s linear;
}

.tool-bar .my-panel.active{
  opacity: 1;
  z-index: 99;
  transform: translateY(4rem);
}

.tool-bar .my-panel .info {
  padding: 9rem;
  height: 100%;
  background: #ffffff;
}

.tool-bar .my-panel .base {
  display: flex;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eeeeee;
}

.tool-bar .my-panel .base .intro {
  width: 100%;
}

.tool-bar .my-panel .base .intro .nickname {
  font-size: 1.5rem;
}

.tool-bar .my-panel .base .intro .signature {
  margin-top: 1rem;  
  color: #999;
}

.tool-bar .my-panel .base .avatar {
  width: 4rem;
  height: 4rem;
  border-radius: .25rem;
}

.tool-bar .my-panel .detail {
  margin-top: 2rem;
}

.tool-bar .my-panel .detail .item .option {
  color: #999;
}

.tool-bar .my-panel .detail .item .value {
  margin-left: 1rem;
}

.main-container {
  width: 100%;  
}

</style>
