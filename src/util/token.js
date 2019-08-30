const tokenKey = '_token'
const expireKey = '_expire'

// 验证
const validate = () => {
  let sToken = window.localStorage.getItem(tokenKey)
  let expire = window.localStorage.getItem(expireKey)
  let now = Date.parse(new Date()) / 1000  
  if (sToken && expire >= now) {
    return true
  }
  // 清空
  window.localStorage.removeItem(tokenKey)
  window.localStorage.removeItem(expireKey)
  return false
}

// 保存
const save = (token, expire) => {  
  window.localStorage.setItem(tokenKey, token)
  window.localStorage.setItem(expireKey, expire)
}

const getToken = () => {
  return window.localStorage.getItem(tokenKey)
}

const token = {  
  getToken: getToken,  
  validate: validate,
  save: save,
}

export default token