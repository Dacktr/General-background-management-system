import Vue from 'vue'
import App from './App.vue'
// 这里通过ipmport 进行按需引入 Vue.use进行使用，这样的方法适合在大的项目中使用  
// 按需引入是有点麻烦 小项目尽量使用全局
import { Button, radio, Container, Main, Header, Aside, Menu, Submenu, MenuItem, 
  MenuItemGroup, Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, 
  TableColumn, Breadcrumb, BreadcrumbItem,Tag,Form,FormItem,Input,Select,Option,
  Switch,DatePicker,Dialog,Pagination,MessageBox,Message  } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/index.less'

import router from '../router'
import store from '../store'
import http from 'axios'
import '../api/mock.js'


Vue.config.productionTip = false
Vue.use(Button)
Vue.use(radio)

Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)


Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message  = Message 

// 导航守卫逻辑
router.beforeEach((to,from,next) => {
  //获取store中的token信息,防止页面刷新丢失token信息
  store.commit('getToken')
  const token = store.state.user.token
   //判断token是否存在且是否为登录页
  if(!token && to.name !== 'login') {
    //返回登录页
    next({name: 'login'})
  }else if(token && to.name === 'login'){
    next({name: 'home'})
  }else{
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
