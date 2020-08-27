<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button class="form-btn" :class="{'active':distributeType == 1}" @click="getDistributeType(1)">接收</el-button>
      </el-col>
      <el-col :span="12">
        <el-button class="form-btn" :class="{'active':distributeType == 2}" @click="getDistributeType(2)">退回</el-button>
      </el-col>
    </el-row>
    <el-row v-show="distributeType == 2">
      <el-col :span="24">
        <el-input v-model="disOpinion3" placeholder="请输入退回理由" type="textarea" rows="4" />
      </el-col>
    </el-row>
    <el-row v-show="distributeType == 1">
      <el-col :span="6">
        <label>解纷机构</label>
      </el-col>
      <el-col :span="18">
        <el-select
          v-model="selectCountId"
          class="form"
          placeholder="请选择"
          filterable
          style="width: 100%"
        >
          <el-option
            v-for="item in countData1"
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
  acceptCase,
  distributeCase,
  endCase,
  flowCase,
  afterEnd
} from '@/api/case/index.js'
import { mapGetters } from 'vuex'
import { getMediater1 } from '@/api/common/common.js'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      distributeType: 1,
      disOpinion3: '',
      selectCountId: '',
      countData1: [],
      caseId: ''
    }
  },
  computed: {
    ...mapGetters(['getCaseInfo'])
  },
  watch: {
    getCaseInfo() {
      this.init()
    }
  },
  created() {
    this.getMediater()
    this.init()
  },
  mounted() {

  },
  methods: {
    // 初始化数据
    init() {
      this.caseId = this.getCaseInfo.id
      this.selectCountId = this.getCaseInfo.court ? this.getCaseInfo.court.id : ''
    },
    // 选择分发类型
    getDistributeType(index) {
      this.distributeType = index
    },
    // 获取解纷机构
    getMediater() {
      getMediater1({ pageSize: 100, courtType: '1,2' }).then(res => {
        if (res.state == 100) {
          this.countData1 = res.content
        }
      })
    },
    // 分发
    distribute() {
      if (this.distributeType == 1) { // 分发
        const params = {
          caseId: this.caseId,
          courtId: this.selectCountId
        }
        distributeCase(params).then(res => {
          if (res.state == 100) {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'success'
            })
            this.$store.dispatch('GetCaseInfo')
          }
        })
      } else { // 退回
        if (!this.disOpinion3) {
          this.$message({
            showClose: true,
            message: '请输入退回理由',
            type: 'error'
          })
          return
        }
        const params = {
          caseId: this.caseId,
          process: this.getCaseInfo.process - 1,
          disOpinion: this.disOpinion3
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
