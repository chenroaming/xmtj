<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button class="form-btn" :class="{'active': flowType == 1}" @click="getFlowType(1)">分流</el-button>
      </el-col>
      <el-col :span="12">
        <el-button class="form-btn" :class="{'active': flowType == 2}" @click="getFlowType(2)">不受理</el-button>
      </el-col>
    </el-row>
    <el-row v-show="flowType == 2">
      <el-col :span="24">
        <el-input v-model="disOpinion" placeholder="请输入退回理由" type="textarea" rows="4" />
      </el-col>
    </el-row>
    <el-row v-show="flowType == 1">
      <el-col :span="6">
        <label>受理机关</label>
      </el-col>
      <el-col :span="18">
        <el-select
          v-model="selectFlowCountId"
          class="form"
          placeholder="请选择"
          filterable
          style="width: 100%"
        >
          <el-option
            v-for="item in countData"
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
  flowCase
} from '@/api/case/index.js'
import { getMediater1 } from '@/api/common/common.js'
import { mapGetters } from 'vuex'
export default {
  components: {

  },
  props: {
  },
  data() {
    return {
      countData: [],
      flowType: 1,
      selectFlowCountId: '',
      disOpinion: '',
      caseId: ''
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
    this.init()
    this.getMediater()
  },
  mounted() {

  },
  methods: {
    // 初始化数据
    init() {
      this.caseId = this.getCaseInfo.id
      this.selectFlowCountId = this.getCaseInfo.flowCourt ? this.getCaseInfo.flowCourt.id : ''
    },
    // 获取受理机关
    getMediater() {
      getMediater1({ pageSize: 100, courtType: '1' }).then(res => {
        if (res.state == 100) {
          this.countData = res.content
        }
      })
    },
    // 分流类型
    getFlowType(index) {
      this.flowType = index
    },
    // 分流
    flowCase() {
      console.log()
      const params = {
        caseId: this.caseId,
        acceptance: this.flowType
      }
      if (this.flowType == 1) {
        if (!this.selectFlowCountId) {
          this.$message({
            showClose: true,
            message: '请选择受理单位',
            type: 'error'
          })
          return
        }
        params.courtId = this.selectFlowCountId
        flowCase(params).then(res => {
          if (res.state === 100) {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'success'
            })
          }
          this.$store.dispatch('GetCaseInfo')
        })
      } else {
        if (!this.disOpinion) {
          this.$message({
            showClose: true,
            message: '请输入退回理由',
            type: 'error'
          })
          return
        }
        params.disOpinion = this.disOpinion
        flowCase(params).then(res => {
          if (res.state === 100) {
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
