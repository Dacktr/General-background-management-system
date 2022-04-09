<template>
    <div class="common-table">
        <el-table :data="tableData" height="90%" stripe>
            <!-- 列表  show-overflow-tooltip超长之后显示-->
            <el-table-column
                show-overflow-tooltip
                v-for="item in tableLabel"
                :key="item.prop"
                :label="item.label"
                :width="item.width ? item.width : 125"
            >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pager"
            layout="prev,pager,next"
            :total="config.total"
            :current-page.sync="localConfig.page" 
            @current-change="changePage"
            :page-size="20"
        >

        </el-pagination>
    </div>
</template>
<script>
export default {
    name: 'CommonTable',
    props: {
        tableData: Array,
        tableLabel: Array,
        config: Object
    },
    //已改 vue3 这是Vue官方防止从子组件意外变更父级组件的状态内容，这样会导致你应用的数据流向杂乱无章
    data() {
        return{
            localConfig:this.config 
        }
    },
    methods: {
        //编辑
        handleEdit(row) {
            //自定义事件分发
            this.$emit('edit', row)
        },
         //删除
        handleDelete(row) {
            this.$emit('del', row)
        },
        //页码的改变
        changePage(page) {
            this.$emit('changePage', page)
        }
    }
}
</script>
<style lang="less" scoped>
.common-table{
    height: calc(100% - 62px);
    background-color: #fff;
    position: relative;
    .pager {
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
</style>
