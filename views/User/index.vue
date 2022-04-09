<template>
    <div class="manage">
        <!-- Dialog对话框 visible.sync:是否显示Dialog,支持.sync修饰符 -->
        <el-dialog
            :title="operateType === 'add' ? '新增用户' : '更新用户'"
            :visible.sync="isShow"
        >
             <!-- 引入公共组件commonForm,并返回data数据 
                    inline：行内表单模式
                    ref绑定控件，$refs获取控件  -->
            <common-form
                :formLabel="opertateFormLabel"
                :form="operateForm"
                :inline="true"
                ref="form"
            ></common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow =false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
        <!-- 头部新增用户以及输入框和搜索 -->
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+ 新增</el-button>
            <common-form
                :formLabel="formLabel"
                :form="searchFrom"
                :inline="true"
                ref="form"
            >
                <!-- 之前预留的插槽就为了插入其他组件 -->
                <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
            </common-form>
        </div>
        <common-table 
            :tableData="tableData"
            :tableLabel="tableLabel"
            :config="config"
            @changePage="getList()"
            @edit="editUser"
            @del="delUser"
        ></common-table>
    </div>
</template>
<script>
import CommonForm from '../../src/components/CommonForm.vue'
import CommonTable from '../../src/components/CommonTable.vue'
import { getUser } from '../../api/data'

export default {
    name: 'User_',
    components: {
        CommonForm,
        CommonTable
    },
    data (){
        return {
           operateType: 'add',
           // 设置isShow默认值
           isShow: false,
           opertateFormLabel: [
                {
                    model: 'name',
                    label: '姓名',
                    type: 'input'
                },
                {
                    model: 'age',
                    label: '年龄',
                    type: 'input'
                },
                {
                    model: 'sex',
                    label: '性别',
                    type: 'select',
                    opts: [
                        {
                            label: '男',
                            value: 1
                        },
                        {
                            label: '女',
                            value: 0
                        }
                    ]
                },
                {
                    model: 'birth',
                    label: '出生日期',
                    type: 'date'
                },
                {
                    model: 'addr',
                    label: '地址',
                    type: 'input'
                }
            ],
            operateForm: {
                name: '',
                addr: '',
                age: '',
                birth: '',
                sex: ''
            },
            formLabel: [
                {
                    model: "keyword",
                    label: '',
                    type: 'input'
                }
            ],
            searchFrom: {
                keyword: ''
            },
            tableData: [],
            tableLabel: [
                {
                    prop: "name",
                    label: "姓名"
                },
                {
                    prop: "age",
                    label: "年龄"
                },
                {
                    prop: "sexLabel",
                    label: "性别"
                },
                {
                    prop: "birth",
                    label: "出生日期",
                    width: 200
                },
                {
                    prop: "addr",
                    label: "地址",
                    width: 320
                }
                
            ],
            config: {
                page: 1,
                total: 30
            }
        }
    },
     methods: {
         //点击事件
         confirm() {
             //判断是编辑还是新增
             if (this.operateType === 'edit') {
                 this.$http.post('/user/edit', this.operateForm).then(res =>{
                     console.log(res)
                     this.isShow =false
                     //调用完之后重置
                     this.getList()
                 })
             }else{
                 this.$http.post('/user/add', this.operateForm).then(res =>{
                     console.log(res)
                     this.isShow =false
                     this.getList()
                 })
             }
         },
         //点击新增跳出弹窗
         addUser() {
              //控制弹窗弹出
             this.isShow = true
             //将值默认为新增
             this.operateType = 'add'
               //初始化
             this.operateForm =  {
                name: '',
                addr: '',
                age: '',
                birth: '',
                sex: ''
            }
         },
         //编辑
         editUser(row) {
             this.operateType = 'edit'
             this.isShow = true
             // 这个方法用于数据回调，已经写入的数据点开在弹窗内有写入的记录
             this.operateForm = row
         },
         //第一个参数是提示，第二个是标题
         delUser(row) {
             this.$confirm("此操作将永久删除该文件，是否继续？","提示",{
                 confirmButtonText: "确认",
                 cancelButtonText: "取消",
                 type: "warning"
             }).then(() => {
                const id = row.id
                this.$http.post("/user/del",{
                    params: {id}
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                     this.getList()
                })
             })
         },
         getList(name = '') {
             this.config.loading = true
             name ? (this.config.page = 1) : ''
             getUser({
                 page: this.config.page,
                 name
             }).then(({data:res}) => {
                 console.log(res,'res')
                 this.tableData = res.list.map(item => {
                     item.sexLabel = item.sex === 0 ? "女" : "男"
                     return item
                 })
                 this.config.total =res.count
                 this.config.loading = false
             })
         }
     },
     created() {
        this.getList()
     }
}
</script>
<style lang="less" scoped>
.manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>