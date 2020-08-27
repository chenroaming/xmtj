<template>
  <div class="base-wrapper">
    <header1 :title="'基本信息'" :is-edit.sync="isEdit" @save="save" />
    <div class="form-wrapper">
      <div class="label">解纷号</div>
      <div class="text">
        <span>{{ caseInfo.sqCaseNo }}</span>
        <el-image
          :src="qrSrc"
          style="width: 30px;height: 30px;left: 100px;cursor: pointer;"
          @click="showQrCode"
        />
      </div>
      <div class="label">原案号</div>
      <div class="text">
        <span>{{ caseInfo.dCaseNo }}</span>
      </div>
      <div class="label">受理日期</div>
      <div class="text">
        <span v-if="!isEdit">
          {{ caseInfo.acceptanceDate | time }}
        </span>
        <el-date-picker
          v-if="isEdit && role != 3"
          v-model="params.acceptanceTime"
          type="datetime"
          placeholder="选择日期时间"
          @change="selectedAcceptanceTime"
        />
      </div>
      <div class="label">解纷期限</div>
      <div class="text">
        <span>
          {{ caseInfo.mediateTerm | time }}
        </span>
      </div>
      <div class="label">案件来源</div>
      <div class="text">
        <span v-if="!isEdit">
          {{ caseInfo.caseSource }}
        </span>
        <el-select
          v-else
          v-model="params.caseSource"
          placeholder="请选择"
        >
          <el-option
            v-for="item in caseSourceData"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="label">案件类型</div>
      <div class="text">
        <span v-if="!isEdit">{{ caseInfo.applyType }}</span>
        <el-select
          v-if="isEdit"
          v-model="params.applyType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in applyTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="label">纠纷事由</div>
      <div class="text">
        <span v-if="caseInfo.brief && !isEdit">
          {{ caseInfo.brief.name }}
        </span>
        <el-select
          v-if="isEdit"
          v-model="params.briefId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in briefData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="label">纠纷金额（元）</div>
      <div class="text">
        <span v-if="!isEdit">
          {{ caseInfo.applyStandard }}
        </span>
        <el-input
          v-else
          v-model="params.applyStandard"
          placeholder="诉求金额(不涉及填0)"
        />
      </div>
      <div class="label">受理单位</div>
      <div class="text">
        <span v-if="caseInfo.flowCourt">
          {{ caseInfo.flowCourt.name }}
        </span>
      </div>
      <div class="label">解纷机构</div>
      <div class="text">
        <span v-if="caseInfo.court">
          {{ caseInfo.court.name }}
        </span>
      </div>
      <div class="label">解纷员</div>
      <div class="text">
        <span v-if="caseInfo.mediater">
          {{ caseInfo.mediater.name }}
        </span>
      </div>
      <div class="label">案件状态</div>
      <div class="text">
        <span>
          {{ caseStatus }}<span v-if="caseInfo.endType">({{ caseInfo.endType }})</span>
        </span>
      </div>
      <div class="label">解纷时间</div>
      <div class="text">
        <span v-if="!isEdit">{{ caseInfo.mediateTime | time }}</span>
        <el-date-picker
          v-if="isEdit && role != 3"
          v-model="params.mediateTime"
          type="datetime"
          placeholder="选择解纷时间"
        />
      </div>
      <div class="label">解纷方案</div>
      <div class="text">暂无</div>
      <div class="label">分流中心</div>
      <div class="text">
        <span v-if="caseInfo.centerCourt">
          {{ caseInfo.centerCourt.name }}
        </span>
      </div>
      <div class="label">分流机构</div>
      <div class="text">
        <span v-if="caseInfo.flowCourt">
          {{ caseInfo.flowCourt.name }}
        </span>
      </div>
    </div>
    <picBox
      :center-dialog-visible.sync="centerDialogVisible"
      :pic-src="qrSrc"
    />
  </div>
</template>

<script>
import { PROCESSMAP } from '@/utils/constVal.js'
import { brief } from '@/api/common/common.js'
import { qrCodeForCaseLog } from '@/api/case'
import { updateCase } from '@/api/case/index.js'
import { formatDate } from '@/utils/format.js'
import { monthDay } from '@/utils/tools.js'
import header1 from './header'
import picBox from './picBox'
export default {
  components: {
    header1,
    picBox
  },
  props: {

  },
  data() {
    return {
      isEdit: false,
      caseInfo: {},
      processMap: PROCESSMAP,
      params: {},
      qrSrc: '',
      caseSourceData: [
        // 案件来源
        {
          value: '法院委派',
          label: '法院委派'
        },
        {
          value: '当事人申请',
          label: '当事人申请'
        }
      ],
      applyTypeData: [
        {
          value: '调解',
          label: '调解'
        },
        {
          value: '仲裁',
          label: '仲裁'
        },
        {
          value: '行政复议',
          label: '行政复议'
        },
        {
          value: '行政裁决',
          label: '行政裁决'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      briefData: [],
      lawCaseData: {},
      role: this.$store.state.user.userRole,
      endTypes: ['当事人达成和解', '当事人撤诉'],
      centerDialogVisible: false
    }
  },
  computed: {
    getCaseInfo() {
      return this.$store.state.cases.caseInfo
    },
    caseStatus() {
      let str = ''
      if (this.caseInfo.process == '6') {
        if (this.endTypes.indexOf(this.caseInfo.endType) == -1) {
          str = '化解失败'
        } else {
          str = '化解成功'
        }
      } else {
        str = this.processMap[this.caseInfo.process]
      }
      return str
    }
  },
  watch: {
    getCaseInfo() {
      this.caseInfo = this.$store.state.cases.caseInfo
      this.init()
      this.getQrCode()
    }
  },
  created() {
    this.getBrief()
  },
  mounted() {

  },
  methods: {
    // 初始化数据
    init() {
      this.lawCaseData = JSON.parse(JSON.stringify(this.caseInfo))
      if (!this.lawCaseData) {
        return
      }
      this.params = {
        caseId: this.lawCaseData.id, // 案件id （无值为新增，有为修改）
        dCaseNo: this.lawCaseData.dCaseNo, // 登字号
        sqCaseNo: this.lawCaseData.sqCaseNo, // 解纷号
        briefId: this.lawCaseData.brief ? this.lawCaseData.brief.id : '', // 案由id
        // isAboutProperty: this.lawCaseData.aboutProperty, //是否涉及财产 ture/false
        applyStandard: this.lawCaseData.applyStandard, // 申请标的
        caseSource: this.lawCaseData.caseSource, // 纠纷来源
        mediateCourtName: this.lawCaseData.court
          ? this.lawCaseData.court.name
          : '',
        mediateCourtId: this.lawCaseData.court ? this.lawCaseData.court.id : '', // 受理/解纷机构id
        mediaterId: this.lawCaseData.mediater
          ? this.lawCaseData.mediater.id
          : '', // 解纷人员id
        mediaterName: this.lawCaseData.mediater
          ? this.lawCaseData.mediater.name
          : '',
        mediateTime: formatDate(this.lawCaseData.mediateTime), // 审核登记日期
        mediateTerm: formatDate(this.lawCaseData.mediateTerm), // 解纷限期
        acceptanceTime: formatDate(this.lawCaseData.acceptanceDate), // 受理日期
        process: this.lawCaseData.process, // 案件进度
        mediateRequest: this.lawCaseData.mediateRequest, // 诉讼请求
        applyType: this.lawCaseData.applyType // 诉讼请求
      }
      // this.$set(this.params, 'briefId', )
      console.log('params')
      console.log(this.params)
    },
    // 获取案由
    getBrief() {
      // 把pageSize设大用于做select的数据
      brief({ pageSize: 1000 }).then(res => {
        this.briefData = JSON.parse(JSON.stringify(res.briefPage.content))
      })
    },
    // 保存
    save() {
      console.log(this.params)
      if (!this.params.caseSource) {
        this.$message({
          showClose: true,
          message: '案件来源不能为空',
          type: 'error'
        })
        return
      }
      if (!this.params.acceptanceTime && this.role != 3) {
        this.$message({
          showClose: true,
          message: '受理日期不能为空',
          type: 'error'
        })
        return
      }
      if (this.params.registerDate) {
        this.params.registerDate = formatDate(
          new Date(this.params.registerDate).getTime()
        )
      }
      if (this.params.acceptanceTime) {
        this.params.acceptanceTime = formatDate(
          new Date(this.params.acceptanceTime).getTime()
        )
      }
      if (this.params.mediateTerm) {
        this.params.mediateTerm = formatDate(
          new Date(this.params.mediateTerm).getTime()
        )
      }
      if (this.params.mediateTime) {
        this.params.mediateTime = formatDate(
          new Date(this.params.mediateTime).getTime()
        )
      }
      delete this.params.mediaterName
      delete this.params.mediateCourtName
      delete this.params.registerCourt
      updateCase(this.params).then(res => {
        if (res.state === 100) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          // this.getCaseDetail()
          this.isEdit = false
          this.$store.dispatch('GetCaseInfo')
        }
      })
    },
    /**
     * 获取解纷期限 受理时间的基础上加一个月
     */
    getMediateTerm() {
      if (!this.params.acceptanceTime) {
        this.$set(this.params, 'mediateTerm', '')
        return
      }
      const days = monthDay()
      const acceptanceTimeStr = new Date(this.params.acceptanceTime).getTime()
      const mediateTermStr = acceptanceTimeStr + days * 86400000
      this.$set(this.caseInfo, 'mediateTerm', formatDate(new Date(mediateTermStr).getTime()))
    },
    /**
     * 选择受理时间后触发
     */
    selectedAcceptanceTime() {
      this.getMediateTerm()
    },
    getQrCode() {
      qrCodeForCaseLog(this.lawCaseData.id).then(res => {
        res.state === 100 && (this.qrSrc = `https://xmtj.olcourt.cn/${res.path}`)
      })
    },
    showQrCode() {
      this.centerDialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.form-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 200px 1fr);
  border: 1px solid #EDEDED;
  border-bottom: none;
  border-right: none;
  margin-top: 10px;
  &>div {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #EDEDED;
    border-right: 1px solid #EDEDED;
  }
  .label {
    background-color: #FAFBFB;
  }
  ::v-deep .el-input{
    width: 200px;
  }
}
</style>
