<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button class="form-btn" :class="{'active':distributionType == 1}" @click="getDistributionType(1)">接收</el-button>
      </el-col>
      <el-col :span="12">
        <el-button class="form-btn" :class="{'active':distributionType == 2}" @click="getDistributionType(2)">退回</el-button>
      </el-col>
    </el-row>
    <el-row v-show="distributionType == 2">
      <el-col :span="24">
        <el-input v-model="disOpinion4" type="textarea" rows="4" placeholder="请输入退回理由" />
      </el-col>
    </el-row>
    <el-row v-show="distributionType == 1">
      <el-col :span="6">
        <label>解纷员</label>
      </el-col>
      <el-col :span="18">
        <el-select
          v-model="selectMediaterid"
          class="form"
          filterable
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in mediaterData"
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
  distributeCase
} from '@/api/case/index.js'
import { mapGetters } from 'vuex'
import { getMediaterUser } from '@/api/common/common.js'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      distributionType: 1, // // 分配类型
      disOpinion4: '',
      selectMediaterid: '',
      mediaterData: [],
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
  },
  mounted() {

  },
  methods: {
    // 初始化数据
    init() {
      this.caseId = this.getCaseInfo.id
      const courtId = this.getCaseInfo ? this.getCaseInfo.court ? this.getCaseInfo.court.id : '' : ''
      this.selectMediaterid = this.getCaseInfo.mediater ? this.getCaseInfo.mediater.id : ''
      if (!courtId) {
        return
      }
      this.getMediaterUser(courtId)
    },
    // 选择分配类型
    getDistributionType(index) {
      this.distributionType = index
    },
    // 获取解纷人员
    getMediaterUser(id) {
      const params = {
        courtId: id,
        pageSize: 100
      }
      getMediaterUser(params).then(res => {
        if (res.state === 100) {
          this.mediaterData = res.dataPage.content
        }
      })
    },
    // 分配
    distribution() {
      if (this.distributionType == 1) { // 分配
        const params = {
          caseId: this.caseId,
          mediaterId: this.selectMediaterid
        }
        if (!this.selectMediaterid) {
          this.$message({
            showClose: true,
            message: '请先选择解纷员',
            type: 'error'
          })
          return
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
        if (!this.disOpinion4) {
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
          disOpinion: this.disOpinion4
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
