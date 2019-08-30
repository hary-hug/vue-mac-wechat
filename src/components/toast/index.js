import Vue from 'vue'
import ToastVue from './toast.vue'

const ToastConstructor = Vue.extend(ToastVue)

ToastConstructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', this.destroyeInstance.bind(this))
}

ToastConstructor.prototype.destroyeInstance = function () {
  this.$destroy(true)
  this.$el.removeEventListener('transitionend', this.destroyeInstance)
  this.$el.parentNode.removeChild(this.$el)
}

export default {
  show (msg = '', duration = 1000) {
    const instance = new ToastConstructor({
      el: document.createElement('div'),
      propsData: {
        msg: msg,
        visible: false
      }
    })
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.visible = true
      setTimeout(() => {
        instance.close()
      }, duration)
    })
  }
}