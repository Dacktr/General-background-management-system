import Cookie from 'js-cookie'
//import router from 'router'
export default {
    //自定义变量，用来保存数据
    state: {
        //默认不折叠
        isCollapse: false,
        //默认首页
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        //当切换到其他页面的时候传值，默认为空，在下面加上判断再修改数值
        currentMenu: null,
        menu:[]
    },
    //触发事件，相当于方法，这也是唯一可以修改state数据的场所
    mutations: {
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 判断点击的值是否为首页，不是就获取值跳转
        selectMenu(state,val){
            if(val.name !== 'home') {
                state.currentMenu = val
                //判断当前首页是否存在
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if(result === -1) { 
                     //等于-1即为不存在，再通过push提交新值
                    state.tabsList.push(val)
                }
            }else{
                //重置currentMenu
                state.currentMenu = null
            }
        },
        closeTag(state,val) {
            const result = state.tabsList.findIndex(item  => item.name === val.name)
            state.tabsList.splice(result,1)
        },
         //将Menu数据缓存到Cookies中，避免刷新时数据丢失
        setMenu(state,val) {
            state.menu = val
            //stringify将数据序列化
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            //Menu数据重置
            state.menu = []
            //清空Cookies
            Cookie.remove('menu')
        },
        //路由的动态添加
        addMenu(state, router) {
            //判断Cookies中是否有menu
            if(!Cookie.get('menu')) {
                return
            }
            //将Cookies中的menu数据转成json对象
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //处理后台返回的menu
            const menuArray = []
            menu.forEach(item => {
                if(item.children) {
                    item.children = item.children.map(item => {
                        //路由component用模板字符串拼接找到url
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由的动态添加
            menuArray.forEach(item => {
                //将页面添加到Main.vue中
                router.addRoute('Main', item) 
            })

        }
    }
}