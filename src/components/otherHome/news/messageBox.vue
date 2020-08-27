<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      height="500"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
      />
      <el-table-column
        label="标题"
        prop="title"
        width="400"
      />
      <el-table-column
        label="发布者"
        prop="sendName"
      />
      <el-table-column
        label="发布日期"
        prop="date"
      />
      <el-table-column
        align="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleShow(scope.$index, scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="12">
        <el-button type="text" style="display: inline-block;" @click="isRead">标为已读</el-button>
      </el-col>
      <el-col :span="12" class="page-box">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listAffiche, readAffiche } from '@/api/otherHome/otherHome'
export default {
  name: 'MessageBox',
  data() {
    return {
      tableData: [],
      search: '',
      total: 10
    }
  },
  computed: {

  },
  mounted() {
    this.getList()
  },
  methods: {
    handleShow(index, row) {
      this.$emit('show', true, row)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleChange(e) {
      this.getList(e)
    },
    exChange(time) {
      const myDate = new Date(time)
      return `${myDate.getFullYear()}-${(myDate.getMonth() + 1)}-${myDate.getDate()}`
    },
    getList(pageNum = 1) {
      const params = {
        pageNum: pageNum,
        pageSize: 10
      }
      listAffiche(params).then(res => {
        if (res.state === 100) {
          const data = res.data.map(item => {
            return {
              ...item,
              title: item.title,
              sendName: item.admin.name,
              date: this.exChange(item.sendDate)
            }
          })
          this.total = res.count
          const count = {
            hasRead: res.hasRead,
            notRead: res.notRead
          }
          this.$emit('update:count', count)
          this.tableData = data
        }
      })
    },
    isRead() {
      const data = {
        afficheIds: this.multipleSelection.map(item => item.id)
      }
      readAffiche(data).then(res => {
        if (res.state === 100) {
          this.getList()
          this.$message.success(res.message)
        }
      })
    }
  }
}
</script>

<style scoped lang = "scss">
  .page-box {
    text-align: right;
    margin-top: 20px;
  }
</style>
