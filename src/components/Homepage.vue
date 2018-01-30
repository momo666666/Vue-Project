<template>
    <div id="homepage">
      <p>欢迎{{user.username}}</p>
      <!--新建的dialog-->
      <el-button type="text" @click="dialogFormVisible = true">新建文档</el-button>

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


      <!--标签页-->
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部文档" id="allDocu" name="first" message="hello child document">
          <showAllDocuComponent></showAllDocuComponent>
        </el-tab-pane>
        <el-tab-pane label="我建立的" id="myDocu" name="second">
          <showMyDocu></showMyDocu>
        </el-tab-pane>
        <el-tab-pane label="我修改的" id="myMoDocu" name="third">
          <showMyModifyDocu></showMyModifyDocu>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  // import {mapGetters, mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
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
        formLabelWidth: '120px'
      }
    },
    mounted () {
      // this.getUserInfo()
      // this.initData()
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
      // ...mapActions([
      //   'getUserInfo'
      // ]),
      handleClick (tab, event) {
        console.log(tab, event)
      },
      createNewDocu () {    // 新建一个文档
        this.dialogFormVisible = false
        console.log('createNewDocu has been clicked')
        editorApi.createDocu(this.createDocuParams).then(res => {
          console.log(res.status)
          console.log(res.data)
          let resData = res.data
          let wordId = resData.object   // 此处获取到wordId，需将其传入到编辑界面
          console.log(wordId)
          router.push({
            path: 'word',
            query: {
              wordId: wordId,      // 传入编辑界面
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

<style scoped>

</style>
