<template>
  <el-row style="margin: 10px 30px;">
    <el-row style="margin-bottom:10px;">您正在{{ve}}《<span style="font-size: 15px;font-weight: bold;">{{title}}</span>》</el-row>
    <el-row style="border: 1px solid #ebeef5;box-shadow: 0 2px 12px 0 rgba(25, 22, 22, 0.1);">
      <div id="div1" class="toolbar"></div>
      <div id="div2" class="text" style="min-height: 450px">
        <p>请输入内容</p>
      </div>
    </el-row>
    <el-row class="button_right">
      <el-button type="primary" icon="el-icon-upload el-icon--right" v-on:click="open1" v-if=this.editable>提交</el-button>
      <el-button type="primary" icon="el-icon-delete" v-on:click="open2" v-if=this.editable>删除</el-button>
      <el-button type="primary" icon="el-icon-document" v-on:click="viewModifyHistory">查看历史修改</el-button>
    </el-row>
  </el-row>
</template>

<script>
  // import bus from '../utils/eventBus'
  import E from 'wangeditor'
  import editorApi from '../api/editor/word'
  import {getStore} from '../utils/localStorage'
  import router from '../router'
  import ElRow from 'element-ui/packages/row/src/row'
  export default {
    components: {ElRow},
    name: 'editor',
    data () {
      return {
        editorContent: '',
        word_id: 0,
        title: '',
        editable: false,
        ve: ''  // 查看/编辑
      }
    },
    computed: {
      // 提交按钮 给后台的表单
      submitParams () {
        return {
          token: getStore('token'),
          word_id: this.word_id,
          word_content: this.editorContent
        }
      },
      // 请求一篇文章所有信息的表单
      askWordParams () {
        return {
          token: getStore('token'),
          word_id: this.word_id
        }
      },
      // 删除一篇文章的表单
      deleteWordParams () {
        return {
          token: getStore('token'),
          word_id: this.word_id
        }
      }
    },
    methods: {
      // 提交 打开的弹框
      open1 () {
        this.$confirm('是否确认修改该文档内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submit()
          // this.$message({
          //   type: 'success',
          //   message: '修改成功'
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
      },
      // 删除 打开的弹框
      open2 () {
        this.$confirm('是否确认删除该文档内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDocument()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
      },
      // 请求正文信息
      askWordInfo () {
        editorApi.getDocuContent(this.askWordParams).then(r => {
          console.log('请求成功')
          console.log(r.status)
          console.log(r.data)
          this.editorContent = ''
          this.editorContent = r.data.object.word
          console.log(`文章内容为：` + this.editorContent)
        }).catch(res => {
          console.log('请求文章内容失败')
          console.log(res.status)
          console.log(res.data)
        })
      },
      // 删除文章
      deleteDocument: function () {
        editorApi.deleteDocu(this.deleteWordParams).then(r => {
          console.log('删除成功')
          console.log(r.status)
          console.log(r.data)
          if (r.data.code === 700) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            router.push({
              path: '/homepage'
            })
          }
        }).catch(res => {
          console.log('删除文章失败')
          console.log(res.status)
          console.log(res.data)
        })
      },
      viewModifyHistory: function () {
        router.push({     // 在路由中带参数传值,将wordid的值传入ModifyWord.vue
          path: 'modifyWord',
          query: {
            word_id: this.word_id,
            title: this.title
          }
        })
      },
      submit () {
        editorApi.editContent(this.submitParams).then(r => {
          console.log('上传成功')
          console.log(r.status)
          console.log(r.data)
          if (r.data.code === 600) {
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            // this.askWordInfo()  // 请求最新正文信息
          }
          router.push({
            path: '/homepage'
          })
        }).catch(res => {
          console.log('上传失败')
          console.log(res.status)
          console.log(res.data)
        })
      }

    },
    mounted () {
      // var editor = new E('#editorElem')
      var editor = new E('#div1', '#div2')
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      console.log(this.$route.query)
      this.editorContent = this.$route.query.word
      this.word_id = this.$route.query.word_id
      this.title = this.$route.query.title
      this.editable = this.$route.query.editable
      console.log(this.word_id + this.title + this.editable)
      editor.customConfig.zIndex = 100    // 调整zIndex，解决编辑区和弹框冲突问题
      editor.create()
      editor.txt.html(this.editorContent)
      editor.$textElem.attr('contenteditable', this.editable)
      if (this.editable) {
        this.ve = '编辑'
      } else this.ve = '查看'
    }
  }
</script>
<style scoped>
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    height: 400px;
  }
  .button_right{
    float: right;
    margin-top:10px;
  }
  .button_right button{
    margin-left:20px;
  }


</style>
