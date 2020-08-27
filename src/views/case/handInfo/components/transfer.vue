<template>
  <div>
    <el-row v-if="isMeditorSuccess">
      <el-col :span="8" style="line-height: 40px;">是否申请立案:</el-col>
      <el-col :span="6">
        <el-button class="form-btn" :class="{'active':register === true}" @click="getregister(true)">是</el-button>
      </el-col>
      <el-col :span="6">
        <el-button class="form-btn" :class="{'active':register === false}" @click="getregister(false)">否</el-button>
      </el-col>
    </el-row>
    <el-row v-if="!isMeditorSuccess">
      <el-col :span="8" style="line-height: 40px;">申请法院赋强:</el-col>
      <el-col :span="16">
        <el-select
          v-model="moveType"
          class="form"
          placeholder="请选择赋强类型"
        >
          <el-option
            v-for="item in moveTypeData"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  afterEnd
} from '@/api/case/index.js'
import { mapGetters } from 'vuex'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      register: null,
      endtypes: ['当事人达成和解', '当事人撤诉'],
      endTypeStr: '',
      caseId: '',
      moveTypeData: [
        {
          id: '1',
          label: '司法确认'
        },
        {
          id: '2',
          label: '仲裁裁决'
        },
        {
          id: '3',
          label: '申请支付令'
        },
        {
          id: '4',
          label: '公证赋强'
        }
      ],
      moveType: ''
    }
  },
  computed: {
    ...mapGetters(['getCaseInfo']),
    // 判断是否调解成功
    isMeditorSuccess() {
      return this.endtypes.indexOf(this.endTypeStr) == -1
    }
  },
  watch: {
    getCaseInfo() {
      this.init()
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
      this.endTypeStr = this.getCaseInfo.endType
    },
    // 获取是否立案
    getregister(val) {
      this.register = val
    },
    // 移送
    transfer() {
      const params = {
        caseId: this.caseId
      }
      if (!this.moveType && !this.isMeditorSuccess) {
        this.$message.error('请选择赋强类型')
        return
      }
      params.moveType = this.moveType
      if (!this.register === null && this.isMeditorSuccess) {
        this.$message.error('请选择是否立案')
        return
      }
      params.register = this.register
      afterEnd(params).then(res => {
        if (res.state === 100) {
          this.$message.success(res.message)
          this.$store.dispatch('GetCaseInfo')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
