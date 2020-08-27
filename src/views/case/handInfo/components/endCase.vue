<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button class="form-btn" :class="{'active':caseCloseType == 1}" @click="getCaseCloseType(1)">结案</el-button>
      </el-col>
      <el-col :span="12">
        <el-button v-if="roleType == 1" class="form-btn" :class="{'active':caseCloseType == 2}" @click="getCaseCloseType(2)">退回</el-button>
      </el-col>
    </el-row>
    <el-row v-show="caseCloseType == 2">
      <el-col :span="24">
        <el-input v-model="disOpinion5" type="textarea" rows="4" placeholder="请输入退回理由" />
      </el-col>
    </el-row>
    <div v-show="caseCloseType == 1">
      <el-row>
        <el-col :span="6">
          <label>化解结果</label>
        </el-col>
        <el-col :span="18">
          <el-select
            v-model="result"
            class="form"
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in mediateResult"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row v-show="result == '其他'">
        <el-col :span="6">
          <label>具体事由</label>
        </el-col>
        <el-col :span="18">
          <el-input v-model="remark" type="textarea" rows="4" placeholder="退回理由" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>结案日期</label>
        </el-col>
        <el-col :span="18">
          <el-date-picker v-model="caseEndDate" type="datetime" placeholder="选择日期时间" align="right" style="width: 100%;" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  operateCase,
  endCase
} from '@/api/case/index.js'
import { formatDate } from '@/utils/format.js'
import { mapGetters } from 'vuex'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      caseCloseType: 1,
      disOpinion5: '',
      remark: '',
      mediateResult: [
        {
          id: '当事人达成和解',
          label: '当事人达成和解'
        },
        {
          id: '当事人撤诉',
          label: '当事人撤诉'
        },
        {
          id: '联系不到当事人',
          label: '联系不到当事人'
        },
        {
          id: '当事人撤回调解请求',
          label: '当事人撤回调解请求'
        },
        {
          id: '当事人明确表示不接受调解',
          label: '当事人明确表示不接受调解'
        },
        {
          id: '双方分歧较大且难以达成调解协议',
          label: '双方分歧较大且难以达成调解协议'
        },
        {
          id: '其他',
          label: '其他(请备注说明)'
        }
      ],
      caseEndDate: '',
      roleType: '',
      result: null,
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
    this.roleType = this.$store.state.user.userRole
    this.init()
  },
  mounted() {

  },
  methods: {
    // 初始化数据
    init() {
      this.caseId = this.getCaseInfo.id
    },
    // 选择结案类型
    getCaseCloseType(index) {
      this.caseCloseType = index
    },
    // 结案
    endCase() {
      if (this.caseCloseType == 1) { // 结案
        const params = {
          caseId: this.caseId,
          endTime: formatDate(
            new Date(this.caseEndDate).getTime(),
            'YYYY-MM-DD H:m:s'
          ),
          endType: this.result
        }
        if (!params.endTime) {
          this.$message({
            showClose: true,
            message: '请先选择结案日期',
            type: 'error'
          })
          return
        }

        if (!params.endType && params.endType !== 0) {
          this.$message({
            showClose: true,
            message: '请先选择化解结果',
            type: 'error'
          })
          return
        }
        if (params.endType == '其他') {
          params.otherMark = this.remark
          if (!params.otherMark) {
            this.$message({
              showClose: true,
              message: '请先输入其他事项',
              type: 'error'
            })
            return
          }
        }
        endCase(params).then(res => {
          if (res.state === 100) {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'success'
            })
            this.$store.dispatch('GetCaseInfo')
          }
        })
      } else {
        if (!this.disOpinion5) {
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
          disOpinion: this.disOpinion5
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
