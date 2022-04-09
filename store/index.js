import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'

//全局注入
Vue.use(Vuex)

export default new Vuex.Store({
    //模块化管理store（仓库）
    modules: {
        tab,
        user
    }
})