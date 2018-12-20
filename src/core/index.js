import Vue from './instance/index'

// 初始化全局API
import { initGlobalAPI } from './global-api/index'

// 是否服务器渲染
import { isServerRendering } from 'core/util/env'

initGlobalAPI(Vue)

// 定义$isServer属性
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

// 定义$ssrContext属性
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// 赋值版本号
Vue.version = '__VERSION__'

// 导出Vue
export default Vue
