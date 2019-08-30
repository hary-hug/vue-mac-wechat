
var axios = require('axios')
// 接口地址
var host = 'http://127.0.0.1:8080/api'

/**
 * 判断元素类型
 * @param obj
 * @returns {string}
 */
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

/**
 * 参数过滤
 * @param o
 * @returns {*}
 */
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

/**
 * 接口请求
 * @param method
 * @param url
 * @param params
 * @param handler 处理返回结果的方法
 */
function apiAxios (method, url, params, handler) {
  if (params) {
    params = filterNull(params)
  }

  axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      baseURL: host,
      withCredentials: false,
      headers: {
        'x-token': window.localStorage.getItem('_token')        
      }
    })
    .then((res) => {                 
      if (handler) {        
        handler(res.data)
        return
      }
    })
    .catch((err) => {
      let res = err.response  
      console.log(err) 
      // if (err) {
      //   window.alert('api error, HTTP CODE: ' + res.status)
      // }
    })
}

export default {
  get: function (url, params, handler) {
    return apiAxios('GET', url, params, handler)
  },
  post: function (url, params, handler) {
    return apiAxios('POST', url, params, handler)
  },
  put: function (url, params, handler) {
    return apiAxios('PUT', url, params, handler)
  },
  delete: function (url, params, handler) {
    return apiAxios('DELETE', url, params, handler)
  }
}