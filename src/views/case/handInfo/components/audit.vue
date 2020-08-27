<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button class="form-btn" :class="{'active': examineType1 == 1}" @click="getexamineType1(1)">同意</el-button>
      </el-col>
      <el-col :span="12">
        <el-button :class="{'active': examineType1 == 2}" class="form-btn" @click="getexamineType1(2)">退回</el-button>
      </el-col>
    </el-row>
    <el-row v-show="examineType1 == 2">
      <el-col :span="24">
        <el-input v-model="disOpinion2" type="textarea" placeholder="请输入退回理由" rows="4" />
      </el-col>
    </el-row>
    <el-row v-show="examineType1 == 1">
      <el-col :span="6">
        <label>诉非号</label>
      </el-col>
      <el-col :span="18">
        <el-input
          v-model="caseNo"
          class="form"
          placeholder="请输入内容"
        />
        <el-button type="primary" @click="getCaseNo">重新获取</el-button>
      </el-col>
    </el-row>
    <el-row v-show="examineType1 == 1">
      <el-col :span="6">
        <label>纠纷类型</label>
      </el-col>
      <el-col :span="18">
        <el-select
          v-model="selectbriefId"
          class="form"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in briefData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  operateCase,
  brief,
  caseNo,
  acceptCase
} from '@/api/case/index.js'
import { mapGetters } from 'vuex'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      examineType1: 1,
      disOpinion2: '',
      caseNo: '',
      briefData: null,
      selectbriefId: ''
    }
  },
  computed: {
    ...mapGetters(['getCaseInfo'])
  },
  watch: {
    getCaseInfo: {
      deep: true,
      handler() {
        this.init()
      }
    }
  },
  created() {
    this.getCaseNo()
    this.getBrief()
  },
  mounted() {

  },
  methods: {
    // 审核类型
    getexamineType1(index) {
      this.examineType1 = index
    },
    // 获取案号
    getCaseNo() {
      caseNo({ type: 2 }).then(res => {
        if (res.state == 100) {
          this.caseNo = res.data
        }
      })
    },
    // 获取案由
    getBrief() {
      brief({ pageSize: 1000 }).then(res => {
        this.briefData = []
        const arr = [
          {
            name: '请选择案由',
            id: ''
          }
        ]
        this.briefData = [...arr, ...res.briefPage.content]
        this.$nextTick(() => {
          this.selectbriefId = this.getCaseInfo ? this.getCaseInfo.brief ? this.getCaseInfo.brief.id : '' : ''
        })
      })
    },
    // 审核
    examine() {
      const params = {
        caseId: this.getCaseInfo.id
      }
      if (this.examineType1 == 1) { // 审核
        params.sqCaseNo = this.caseNo
        params.briefId = this.selectbriefId
        params.acceptance = 1
        acceptCase(params).then(res => {
          if (res.state == 100) {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'success'
            })
            this.$store.dispatch('GetCaseInfo')
          }
        })
      } else {
        if (!this.disOpinion2) {
          this.$message({
            showClose: true,
            message: '请输入退回理由',
            type: 'error'
          })
          return
        }
        const params = {
          caseId: this.getCaseInfo.id,
          process: this.getCaseInfo.process - 1,
          disOpinion: this.disOpinion2
        }
        operateCase(params).then(res => {
          if (res.state == 100) {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'success'
            })
            this.$store.dispatch('GetCaseInfo')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
