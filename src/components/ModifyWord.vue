<template>
  <div id="allDocument">
    您正在查看《<span style="font-size: 20px;font-weight: bold;">{{title}}</span>》的修改历史
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="uid"
        label="用户"
        width="150">
      </el-table-column>
      <el-table-column
        prop="opTime"
        label="修改时间"
        width="150">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total=this.page.totalData>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import editorApi from '../api/editor/word'
  import {getStore} from '../utils/localStorage'
  import {getTime} from '../utils/transformTime'
  export default {
    data () {
      return {
        page: {
          pageNum: 1,  // 页码
          pageSize: 10, // 每页文章数目
          totalData: 0,     // 总条数
          totalPage: 0      // 总共有多少页
        },
        word_id: 0,
        title: '',
        tableData: [] // 用于接收对象数组
      }
    },
    computed: {
      // 请求修改历史的参数
      modifyOpParams () {
        return {
          token: getStore('token'),
          page: this.page.pageNum,
          word_id: this.word_id
        }
      }
    },
    methods: {
      handleClick (row) {
        console.log(row)
      },
      handleChange (val) {
        console.log(val)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.page.pageNum = val
        this.getOpLog()
        console.log(`当前页: ${val}`)
      },
      getOpLog () {
        editorApi.getOpLog(this.modifyOpParams).then(res => {
          console.log('获取操作记录')
          console.log(res.status)
          console.log(res.data)
          console.log(this.word_id)
          let resData = res.data
          this.page.totalPage = resData.object[1].page // 获取总页数
          this.page.totalData = resData.object[1].num // 获取总数据量
          console.log(this.tableData)
          this.tableData = []
          for (var m = 0; m < resData.object[0].length; m++) {
            this.tableData[m] = resData.object[0][m].edit
          }
          // 转换opTime的时间戳
          for (var i = 0; i < this.tableData.length; i++) {
            var opTime = []
            opTime[i] = getTime(this.tableData[i].opTime)
            this.tableData[i].opTime = opTime[i]
            console.log(this.tableData[i].opTime)
          }
        }).catch(res => {
          console.log(res)
        })
      }
    },
    mounted () {
      this.word_id = this.$route.query.wordid   // 接收到word.vue传过来的wordId
      this.title = this.$route.query.title      // 接收到word.vue传过来的title
      console.log(this.word_id)
      this.getOpLog()
    }
  }
</script>

<style scoped>

</style>
