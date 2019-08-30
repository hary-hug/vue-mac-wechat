import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  connected: false,
  me: {},
  chats: [],
  chatMessages: [],
  friends: [],
  friendRequests: [],
  publicUsers: [],  
  newContactNo: 0,  
}

const getters = {

}

const mutations = {
  setConnected(state, value) {
    state.connected = value    
  },

  setMe(state, value) {    
    state.me = value
  },

  setChats(state, value) {
    state.chats = value
  },

  addNewChat(state, value) {    
    state.chats = state.chats.filter(item => {
      return item.chat_id !== value.chat_id
    })
    state.chats.unshift(value)    
  },

  setChatMessages(state, value) { 
    // 移除掉之前相同的数据
    state.chatMessages = state.chatMessages.filter(item => {
      return item.chat_id !== value.chat_id
    })
    state.chatMessages.push(value)   
  },

  addNewChatMessage(state, value) {
    let idx = state.chatMessages.findIndex((item) => {      
      return item.chat_id === value.chat_id
    })
    if (idx >= 0) {
      state.chatMessages[idx].lists.push(value.message)    
    }
  },

  setFriends(state, value) {
    state.friends = value
  },

  setFriendRequests(state, value) {
    state.friendRequests = value
  },

  setPublicUsers(state, value) {
    state.publicUsers = value
  },

  setNewContactNo(state, value) {
    state.newContactNo += value.count
  },

  // 清空联系人新消息数量
  clearNewContactNo(state) {
    state.newContactNo = 0
  },

}

const actions = {

}

const store =  new Vuex.Store({
  state,
  getters,
  mutations,
  actions  
})

export default store