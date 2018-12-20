import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 定义VUE CLASS 类
function Vue (options) {

  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    // 输出错误信息：Vue是一个构造函数，应该用“new”关键字调用
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化选项
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
