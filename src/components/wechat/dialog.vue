<template>
  <div class="dialog">   
    <div class="header">
      <p class="title">{{chatDetail.title}}</p>
    </div> 
    <ul class="dialog-box" id="dialog">      
      <li :class="message.self == 1 ? 'row right': 'row left'" v-for="(message, i) in messages" :key="i">
        <div class="main-flex">
          <div class="main" v-if="message.self">            
            <div class="detail">              
              <p class="text" v-html="message.content"></p>
            </div>
            <img class="avatar" :src="message.avatar"/>
          </div>
          <div class="main" v-if="!message.self">
            <img class="avatar" :src="message.avatar"/>
            <div class="detail">
              <p class="nickname">{{message.nickname}}</p>
              <p class="text" v-html="message.content"></p>
            </div>
          </div>
        </div>
        <p class="timeline">{{message.create_time}}</p>
      </li>             
    </ul>
    <div class="input-box">      
      <textarea class="text" autofocus placeholder="不说点啥合适吗?" @keyup.enter.exact="sendMessage" v-model="content"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ''  
    }
  },

  props: [
    'chatId'
  ],

  computed: {
    connected() {
      return this.$store.state.connected
    },

    chatDetail() {
      let result = this.$store.state.chatMessages.find((item) => {
        return item.chat_id === this.chatId
      })
      if (typeof result == 'undefined') {
        return {}
      }
      return {
        title: result.title
      }
    },
    
    messages() {
      let result = this.$store.state.chatMessages.find((item) => {
        return item.chat_id === this.chatId
      })
      if (typeof result == 'undefined') {
        return []
      }      
      return result.lists
    },

  },

  watch: {     
    chatId() {      
  		this.$bus.$emit('get-chat-detail', {chatId:this.chatId})
    },

    // 自动滚动到底部
    messages() {            
      this.autoBottom()
    }
  },

  created() {    
    this.$bus.$emit('get-chat-detail', {chatId:this.chatId})    
  },
  
  methods: {
    sendMessage() {
      let content = this.content.trim()
      if (content == '') {
        return
      }
      this.$bus.$emit('send-chat-message', {chatId:this.chatId, content})
      this.content = ''
    },

    autoBottom() {
      // this.$nextTick 能够等到DOM变化完成之后再进行执行    
      this.$nextTick(() => {
        let ele = document.getElementById('dialog')        
        ele.scrollTop = ele.scrollHeight
      })
    }

  }
  
}
</script>

<style scoped>

.dialog {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  height: 6rem;
  min-height: 6rem;   
  padding: 2rem; 
  border-bottom: 1px solid #dddddd;  
}

.dialog-box {
  height: 100%;
  padding: 2rem;
  overflow-y: auto;
}

.dialog-box .row {
  display: flex;
  flex-direction: column;
  min-height: 6rem;  
}

.dialog-box .row .main-flex {
  display: flex;
  flex-direction: row;
}

.dialog-box .row .main-flex .main {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.dialog-box .right .main-flex .main {
  justify-content: flex-end;
}

.dialog-box .row .main-flex .main .avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: .25rem;
}

.dialog-box .row .main-flex .main .detail {
  display: flex;
  flex-direction: column;  
  max-width: 20rem;
}

.dialog-box .left .main-flex .main .detail {  
  margin-left: 1rem;
}

.dialog-box .right .main-flex .main .detail {  
  margin-right: 1rem;
}

.dialog-box .row .main-flex .main .detail .nickname {
  color: #999;
}

.dialog-box .row .main-flex .main .detail .text {
  position: relative;
  padding: .6rem;  
  background: #ffffff;
  border-radius: .25rem;  
}

.dialog-box .left .main-flex .main .detail .text {
  margin-top: .25rem;
}

.dialog-box .left .main-flex .main .detail .text::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 1px;
  border-left: 1px solid #f6f6f6;
  border-bottom: 1px solid #f6f6f6;
  background-color: #FFFFFF;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 8px;
  left: -4px;
}

.dialog-box .right .main-flex .main .detail .text::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 1px;
  border-left: 1px solid #f6f6f6;
  border-bottom: 1px solid #f6f6f6;
  background-color: #FFFFFF;
  -webkit-transform: rotate(225deg);
  -moz-transform: rotate(225deg);
  -ms-transform: rotate(225deg);
  -o-transform: rotate(225deg);
  transform: rotate(225deg);
  position: absolute;
  top: 8px !important;
  right: -4px !important;
}

.dialog-box .row .timeline {  
  color: #999;
  text-align: center;  
  padding: 2rem 0;
  font-size: 85%;
}

.input-box {
  display: flex;
  flex-direction: column;
  height: 7rem;
  min-height: 7rem;
  padding: 1rem 2rem;
  border-top: 1px solid #dddddd;
}

.input-box .text {
  width: 100%;
  height: 100%;  
  background: #f2f2f2;
  resize: none;
}

</style>

