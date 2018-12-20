/* @flow */

import config from '../config'
import {initUse} from './use'
import {initMixin} from './mixin'
import {initExtend} from './extend'
import {initAssetRegisters} from './assets'
import {set, del} from '../observer/index'
import {ASSET_TYPES} from 'shared/constants'
import builtInComponents from '../components/index'
import { warn, extend,nextTick,mergeOptions,defineReactive} from '../util/index'

export function initGlobalAPI(Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      // 不要替换Vue.config对象，而是设置单独的字段。
      warn('Do not replace the Vue.config object, set individual fields instead.')
    }
  }
  // 各种全局配置项
  Object.defineProperty(Vue, 'config', configDef)

  // 公开的util方法。
  // 注意：这些不是公共API的一部分——避免依赖
  // 除非你意识到风险。
  // 各种工具函数
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
  // 定义全局属性
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick
  // 初始化Vue options 选项属性
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // 这用于标识“base”构造函数以扩展所有纯对象
  // 在Weex的多实例场景中使用的组件。
  Vue.options._base = Vue
  // 扩展延申组件
  extend(Vue.options.components, builtInComponents)

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
