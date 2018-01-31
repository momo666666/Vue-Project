<template>
  <el-row style="padding:10px 30px;">

    <el-row style="margin: 10px 0;">
      <!--新建的dialog-->
      <el-col :span="20">
        <el-button type="primary" @click="dialogFormVisible = true">新建文档</el-button>
      </el-col>

      <el-col :span="4">欢迎{{user.userName}}</el-col>
      <el-dialog title="新建文档" :visible.sync="dialogFormVisible">
        <el-form :model="createDocuForm">
          <el-form-item label="文档名称" :label-width="formLabelWidth">
            <el-input v-model=" createDocuForm.title" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createNewDocu">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <!--标签页-->
    <el-row>
      <el-tabs id="tabs" v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部文档" name="first" message="hello child document">
          <showAllDocuComponent></showAllDocuComponent>
        </el-tab-pane>
        <el-tab-pane label="我建立的" name="second">
          <showMyDocu></showMyDocu>
        </el-tab-pane>
        <el-tab-pane label="我修改的" name="third">
          <showMyModifyDocu></showMyModifyDocu>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </el-row>
</template>

<script>
  // import {mapGetters, mapActions} from 'vuex'
  import {mapGetters, mapActions} from 'vuex'
  import editorApi from '../api/editor/word'
  import {getStore} from '../utils/localStorage'
  import router from '../router'
  // 导入组件
  let showAllDocuComponent = () => import('./homepage/AllDocument')
  let showMyDocu = () => import('./homepage/MyDocu')
  let showMyModifyDocu = () => import('./homepage/MyModifyDocu')
  export default {
    name: 'homePage',
    data () {
      return {
        activeName2: 'first',
        dialogFormVisible: false,
        createDocuForm: {
          title: ''
        },
        formLabelWidth: '120px', //
        word_id: 0
      }
    },
    mounted () {
      this.getUserInfo()
      this.initData()
    },
    computed: {
      ...mapGetters({
        user: 'getUser'
      }),
      createDocuParams () {   // 新建文档的参数
        return {
          token: getStore('token'),
          title: this.createDocuForm.title
        }
      }
    },
    methods: {
      ...mapActions([
        'getUserInfo',
        'logout'
      ]),
      handleClick (tab, event) {
        console.log(tab, event)
      },
      createNewDocu () {    // 新建一个文档
        this.dialogFormVisible = false
        console.log('createNewDocu has been clicked')
        editorApi.createDocu(this.createDocuParams).then(res => {
          console.log(res.status)
          console.log(res.data + `createNewDocu`)
          let resData = res.data
          this.word_id = resData.object   // 此处获取到wordId，需将其传入到编辑界面
          console.log(this.word_id)
          router.push({
            path: 'word',
            query: {
              word_id: this.word_id,      // wordId传入编辑界面
              title: this.createDocuForm.title,  // 将新建文章标题传入编辑界面
              editable: true
            }
          })
        }).catch(res => {
          console.log(res)
        })
      }
    },
    // 注册组件
    components: {
      showAllDocuComponent,
      showMyDocu,
      showMyModifyDocu
    }
  }
</script>
<style>
  #tabs .el-tabs__item {
    width: 140px;
    text-align: center;
  }
</style>
<style scoped>

</style>
