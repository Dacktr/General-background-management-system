// 右侧侧边栏
<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="'' + item.path" :key="item.path">
            <!-- 别把icon后的'-'漏掉了会失去图标 -->
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>

        <!-- for循环 遍历二级菜单元素 :index="item.path" -->
        <el-submenu v-for="item in hasChildren" :index="'' + item.path" :key="item.path">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subIndex.toString()">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-menu {
        height: 100%;
        border: none; //去除边框
        h3 {
            color: #fff;
            text-align: center;
            line-height: 48px;
        }
    }
</style>

<script>
export default {
  data() {
    return {
      menu: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
        this.$router.push({
            name: item.name
        })
        //把获取到的面包屑实现的数据往上提交
        this.$store.commit('selectMenu', item)
    }
  },
  //分无子菜单noChildren 和有子菜单hasChildren
  //判断当前项目下有无子项目,ES6特性
  computed: {
      noChildren() {
          return this.asyncMenu.filter(item => !item.children)
      },
      hasChildren() {
          return this.asyncMenu.filter(item => item.children)
      },
      //计算属性中，当需要使用多个变量的计算结果时，可以利用vue的计算属性，将计算结果返回给一个计算属性，
      //后面直接调用该属性，利用计算属性结合v-module可以实现简单的计算器功能
      isCollapse() {
        return this.$store.state.tab.isCollapse
      },
       //拿到store中的menu属性
      asyncMenu() {
        return this.$store.state.tab.menu
      }
  }
};
</script>