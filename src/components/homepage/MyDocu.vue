<template>
  <el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="title"
        label="题目">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="最近修改时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, false)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row, true)">编辑</el-button>
        </template>
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
  </el-row>
</template>

<script>
  import editorApi from '../../api/editor/word'
  import {getStore} from '../../utils/localStorage'
  import {getTime} from '../../utils/transformTime'
  import ElRow from 'element-ui/packages/row/src/row'
  import router from '../../router'
  // import router from '../router'
  export default {
    components: {ElRow},
    name: 'MyDocu',
    data () {
      return {
        page: {
          pageNum: 1,  // 页码
          pageSize: 10, // 每页文章数目
          totalData: 0,     // 总条数
          totalPage: 0      // 总共有多少页
        },
        tableData: [] // 用于接收对象数组
      }
    },
    computed: {
      requestMyDocuParams () {   // 请求我建立的文档的参数
        return {
          token: getStore('token'),
          uid: getStore('user_id'),
          page: this.page.pageNum
        }
      }
    },
    methods: {
      handleClick (row, editable) {
        console.log(row)
        let word_id = row.id
        let title = row.title
        let wordContent = row.word
        // bus.$emit('word', wordContent) // 绑定一个事件
        router.push({     // 在路由中带参数传值
          path: 'word',
          query: {
            word: wordContent,
            word_id: word_id,
            title: title,
            editable: editable
          }
        })
      },
      handleChange (val) {
        console.log(val)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.page.pageNum = val
        this.requestMyDocu()
        console.log(`当前页: ${val}`)
      },
      requestMyDocu () {
        editorApi.getMyDocu(this.requestMyDocuParams).then(res => {
          console.log(`getMyDocu`)
          console.log(res.status)
          console.log(res.data)
          let resData = res.data
          this.page.totalPage = resData.object[1].page // 获取总页数
          this.page.totalData = resData.object[1].num // 获取总数据量
          console.log(this.page.totalPage + ` ` + this.page.totalData)
          this.tableData = []
          for (var m = 0; m < resData.object[0].length; m++) {
            this.tableData[m] = resData.object[0][m]
          }
          // this.tableData = resData.object
          console.log(this.tableData)
          // console.log(getTime(1516782155000))
          // 转换createTime的时间戳
          for (var i = 0; i < this.tableData.length; i++) {
            var createTime = []
            createTime[i] = getTime(this.tableData[i].createTime)
            // console.log(createTime[i])
            this.tableData[i].createTime = createTime[i]
            console.log(this.tableData[i].createTime)
          }
          // 转换updateTime的时间戳
          for (var j = 0; j < this.tableData.length; j++) {
            var updateTime = []
            updateTime[j] = getTime(this.tableData[j].updateTime)
            // console.log(createTime[i])
            this.tableData[j].updateTime = updateTime[j]
            console.log(this.tableData[j].updateTime)
          }
        }).catch(res => {
          console.log(res)
        })
      }
    },
    mounted () {
      this.requestMyDocu()
      console.log(`requestMyDocu`)
      console.log(getStore('user_id'))
      console.log(getStore('token'))
    }
  }
</script>

<style scoped>
  .block{
    margin: 0 30%;
  }
</style>
