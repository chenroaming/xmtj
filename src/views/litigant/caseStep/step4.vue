<template>
  <div style="text-align: center;">
    <el-button type="primary" @click="addEvi('form')"><i class="el-icon-circle-plus" />新增证据</el-button>
    <el-table :data="tableData" height="350" stripe style="width: 100%">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="litigantMan" label="当事人" />
      <el-table-column prop="provideDate" label="提供时间" />
      <el-table-column prop="evidenceAttachments" label="附件">
        <template slot-scope="scope">
          <div v-for="item in scope.row.evidenceAttachments" :key="item.id">
            <el-button type="text" @click="showDetail(item)">
              {{ item.name }}
            </el-button>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="evidenceName" label="证据名称" />
      <el-table-column prop="objectOfProof" label="证明对象" />
      <el-table-column prop="source" label="证据来源" width="180" /> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="opera-btn">
            <img src="@/assets/img/edit.png" @click="edit(scope.row)">
            <img src="@/assets/img/del.png" @click="delEvidence(scope.row)">
            <span class="down-btn" @click="downFiles(scope.row.evidenceAttachments)">
              <i class="el-icon-download" />
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right;">
      <el-button type="primary" @click="next('before')">上一步</el-button>
      <el-button type="primary" @click="next('next')">下一步</el-button>
    </div>
    <addevi ref="addevi" :litigant-list="litigantList" @done="getLitigant" />
    <preview ref="preview" :look-url="lookUrl" />
  </div>
</template>

<script>
import {
  detailsCase,
  evidenceList,
  delEvi,
  submitCase } from '@/api/litigant/litigant'
import addevi from '@/components/addCase/addevi'
import { formatDate } from '@/utils/format'
import preview from '@/components/addCase/preview'
export default {
  name: 'Step4',
  components: {
    addevi, preview
  },
  data() {
    return {
      lawCaseId: '',
      tableData: [],
      litigantList: [],
      dialogVisible1: false,
      lookUrl: ''
    }
  },
  computed: {

  },
  mounted() {
    this.lawCaseId = this.$store.getters.getLawCaseId || window.localStorage.getItem('lawCaseId')
    this.$emit('update:step', 2)
    this.getLitigant()
  },
  methods: {
    addEvi(name) { // 增加证据
      this.$refs.addevi.show()
    },
    exChange(time) {
      const myDate = new Date(time)
      return `${myDate.getFullYear()}-${(myDate.getMonth() + 1)}-${myDate.getDate()}   ${myDate.getHours()}:${myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()}`
    },
    getLitigant() {
      const data = {
        lawCaseId: this.lawCaseId
      }
      detailsCase(data).then(({ state, lawCase: { litigants }}) => {
        if (state === 100) {
          this.litigantList = litigants
        }
      })
      evidenceList(data).then(res => {
        if (res.state === 100) {
          this.tableData = res.evidences.map(item => {
            return {
              ...item,
              provideDate: formatDate(item.provideDate)
            }
          })
        }
      })
    },
    next(word) {
      if (word === 'next') {
        // const data = {
        //   lawCaseId: this.lawCaseId,
        //   isOverApplication: 1
        // }
        // if (this.$store.state.user.userRole == 3) {
        //   submitCase(data).then(res => {
        //     if (res.state === 100) {
        //       this.$message.success(res.message)
        //       this.$router.push({ name: 'step5' })
        //     }
        //   })
        // } else {
        //   this.$router.push({ name: 'homeIndex' })
        // }
        this.$router.push({ name: 'step5' })
      } else {
        this.$router.push({ name: 'step3' })
      }
    },
    edit(item) {
      console.log(item)
      this.$refs.addevi.edit(item)
    },
    delEvidence(item) {
      const data = {
        eviId: item.id
      }
      delEvi(data).then(res => {
        if (res.state === 100) {
          this.getLitigant()
        }
      })
    },
    // 批量下载文件
    downFiles(files) {
      if (files && files.length >= 0) {
        files.forEach(item => {
          this.downFile(item.url)
        })
      }
    },
    downFile(url) {
      const ele = document.createElement('a')
      ele.setAttribute('href', url) // 设置下载文件的url地址
      ele.setAttribute('download', '')// 用于设置下载文件的文件名
      ele.click()
    },
    showDetail(item) {
      this.$refs.preview.preview(item)
    }
  }
}
</script>

<style scoped lang = "scss">
  .opera-btn {
    img {
      width: 30px;
      height: 30px;
      cursor: pointer;
      &:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
  .down-btn {
    cursor: pointer;
    display: inline-flex;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    background-color: #7FCBFE;
    width: 30px;
    height: 30px;
    color: #fff;
    margin-left: 5px;
    float: left;
    margin-right: 10px;
  }
</style>
