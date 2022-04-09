<template>
    <header>
        
        <div class="l-content">
            <!-- 这个icon图标按钮可以在官方文档里查看 -->
            <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
            <!-- <h3 style="color:#fff">首页</h3> -->
            <el-breadcrumb separator="/" >
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <!-- 官方文档中搜索dropdown(下拉菜单),并查看相关属性 -->
            <el-dropdown trigger="click" size="mini">
                <span>
                    <img class="user" :src="userImg">
                </span> 
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu> 
            </el-dropdown>
        </div>
    </header>
</template>
<script>
//面包屑的数据引入
import { mapState } from 'vuex'
export default {
    name: 'CommomHeader',
    data() {
        return {
            userImg: require('../assets/images/user.png')
        }
    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        logOut() {
            //首先清除已有token
            this.$store.commit('clearToken')
            //重置Menu
            this.$store.commit('clearMenu')
             //跳转
            this.$router.push('/login')
        }
    },
    //将store中的数据注入
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    }
}
</script>
<style lang="less" scoped>
header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
} 
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
} 
// 解决elm面包屑默认组件样式，depp覆盖原来的样式
/deep/.el-breadcrumb__inner {
  color: rgb(201, 197, 197);
}
/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #fff;
}
</style>