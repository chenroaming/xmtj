<template>
  <div class="deal-info-wrapper">
    <div class="header">
      <div class="header-item" :class="{'active': process < 2 && flowStatus == 0}">
        分流
      </div>
      <div
        class="header-item"
        :class="{'active': process < 2 && (flowStatus == 1 || flowStatus == 2)}"
      >审核</div>
      <div
        class="header-item"
        :class="{'active': process == 2}"
      >分发</div>
      <div
        class="header-item"
        :class="{'active': process >= 3 && process < 4}"
      >分配</div>
      <div
        class="header-item"
        :class="{'active': process == 4}"
      >化解结果</div>
      <div
        class="header-item"
        :class="{'active': process >= 6}"
      >移送</div>
    </div>
    <div class="title">
      <div class="title-item">
        <div class="text">
          <div
            v-if="process == 1 && flowStatus ==0"
            class="text active"
          >未分流</div>
          <div
            v-if="process == 1 && flowStatus == 2"
            class="text"
          >不分流</div>
          <div
            v-if="process == 1 && flowStatus == 0"
            class="submit-wrapper"
          >
            <img
              src="@/assets/img/submit.png"
              @click="flowCase"
            >
          </div>
          <div
            v-if="process == 1 && flowStatus == 1 || process > 1"
            class="text"
          >已分流({{ getCaseInfo.flowCourt ? getCaseInfo.flowCourt.name : '' }})</div>
        </div>
      </div>
      <div class="title-item">
        <div
          v-if="process == 1 && flowStatus == 0"
          class="text"
        >待审核</div>
        <div
          v-if="process == 1 && (flowStatus == 1 || flowStatus == 2)"
          class="text active"
        >未审核</div>
        <div
          v-if="process == 1 && (flowStatus == 1 || flowStatus == 2) && isCourt"
          class="submit-wrapper"
        >
          <img
            src="@/assets/img/submit.png"
            @click="examine"
          >
        </div>
        <div
          v-if="process > 1 && process !=9"
          class="text"
        >已审核(同意)</div>
        <div
          v-if="process == 0"
          class="text"
        >未审核</div>
        <div
          v-if="process == 9"
          class="text"
        >不受理</div>
      </div>
      <div class="title-item">
        <div
          v-if="process < 2 || process == 9"
          class="text"
        >待分发</div>
        <div
          v-if="process == 2"
          class="text active"
        >未分发</div>
        <div
          v-if="process == 2 && roleType == 1"
          class="submit-wrapper"
          @click="distribute"
        >
          <img src="@/assets/img/submit.png">
        </div>
        <div
          v-if="process > 2 && process !=9"
          class="text"
        >已分发({{ getCaseInfo.court.name }})</div>
      </div>
      <div class="title-item">
        <div
          v-if="process < 3 || process == 9"
          class="text"
        >待分配</div>
        <div
          v-if="process == 3"
          class="text active"
        >未分配</div>
        <div
          v-if="process == 3 && (isCourt || isMeditorCourt)"
          class="submit-wrapper"
        >
          <img
            src="@/assets/img/submit.png"
            @click="distribution"
          >
        </div>
        <div
          v-if="process > 3 && process !=9"
          class="text"
        >已分配({{ getCaseInfo.mediater.name }})</div>
      </div>
      <div class="title-item">
        <div
          v-if="process < 4"
          class="text"
        >待化解</div>
        <div
          v-if="process == 4 || process == 5"
          class="text active"
        >化解</div>
        <div
          v-if="process > 5"
          class="text"
        >{{ isMeditorSuccess ? '化解失败':'化解成功' }}({{ getCaseInfo.endType }})</div>
        <div
          v-if="(process == 4 || process == 5) && (isMeditorCourt || isMeditor)"
          class="submit-wrapper"
        >
          <img
            src="@/assets/img/submit.png"
            @click="closeCase1"
          >
        </div>
      </div>
      <div class="title-item">
        <!-- <div
          v-if="process <=6"
          class="text"
        >待移送</div> -->
        <div
          v-if="process <=6 && !isMeditorSuccess && (register1 === null && !moveType1)"
          class="text"
        >待移送</div>
        <div
          v-if="process >=6 && isMeditorSuccess && register1 === null"
          class="text"
        >未申请立案</div>
        <div
          v-if="process >=6 && isMeditorSuccess && register1 === true"
          class="text"
        >已申请立案</div>
        <div
          v-if="process >=6 && isMeditorSuccess && register1 === false"
          class="text"
        >不申请立案</div>
        <div
          v-if="process >=6 && !isMeditorSuccess && moveType1"
          class="text"
        >已移送({{ moveTypeMap[moveType1] }})</div>
        <div
          v-if="(process >= 6) && (isMeditorCourt || isMeditor) && (register1 === null && !moveType1)"
          class="submit-wrapper"
        >
          <img
            src="@/assets/img/submit.png"
            @click="transfer"
          >
        </div>
      </div>
    </div>
    <div class="content">
      <diversion v-if="process == 1 && flowStatus == 0" ref="diversion" class="form-wrapper" />
      <!-- 审核 -->
      <audit v-if="process == 1 && (flowStatus == 1 || flowStatus == 2) && isCourt" ref="audit" class="form-wrapper" />
      <!-- 分发 -->
      <distribution v-if="process == 2 && isCourt" ref="distribution" class="form-wrapper" />
      <!-- 分配 -->
      <allocation v-if="process == 3 && (isCourt || isMeditorCourt)" ref="allocation" class="form-wrapper" />
      <!-- 结案 -->
      <endCase1 v-if="(process == 4 || process == 5) && (isMeditorCourt || isMeditor)" ref="endCase1" class="form-wrapper" />
      <!-- 立案或者移送 -->
      <transfer v-if="process == 6 && (isCourt || isMeditorCourt) && (register1 === null && !moveType1)" ref="transfer" class="form-wrapper" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import diversion from './components/diversion' // 分流
import audit from './components/audit' // 分流
import distribution from './components/distribution' // 分发
import allocation from './components/allocation' // 分配
import endCase1 from './components/endCase' // 分配
import transfer from './components/transfer' // 分配
export default {
  components: {
    diversion,
    audit,
    distribution,
    allocation,
    endCase1,
    transfer
  },
  props: {
    // lawCaseData: null,
    // menuIndex: null,
    // caseId: null
  },
  data() {
    return {
      moveType1: '',
      register1: null,
      process: '',
      caseNo: '',
      roleType: '', // 角色信息
      caseId: '',
      lawCaseData: {},
      moveTypeMap: {
        1: '司法确认',
        2: '仲裁裁决',
        3: '申请支付令',
        4: '公证赋强'
      },
      flowStatus: null,
      loginCourtId: '', // 登录的机构id
      loginMediaterId: '', // 登陆解纷员的id
      caseCourtId: '', // 案件分流机构id
      meditorCourtId: '', // 案件解纷机构id
      caseMediaterId: '', // 案件解纷员id
      endtypes: ['当事人达成和解', '当事人撤诉'],
      endTypeStr: ''
    }
  },
  computed: {
    ...mapGetters(['getCaseInfo', 'getUserInfo']),
    // 判断当前登记的机构是否为当前的受理机构
    isCourt() {
      return this.loginCourtId == this.caseCourtId
    },
    // 判断当前机构是否为当前的解纷机构
    isMeditorCourt() {
      return this.loginCourtId == this.meditorCourtId
    },
    // 判断当前解纷员是否为案件的解纷员
    isMeditor() {
      return this.loginMediaterId == this.caseMediaterId
    },
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
    this.getLawCaseData()
    this.roleType = this.$store.state.user.userRole
    this.loginCourtId = this.getUserInfo.courtUid
    this.loginMediaterId = this.getUserInfo.mediaterId
  },
  mounted() {},
  methods: {
    // 初始化数据
    init() {
      this.caseId = this.getCaseInfo.id
      this.lawCaseData = JSON.parse(JSON.stringify(this.getCaseInfo))
      this.getLawCaseData()
    },
    // 获取案件信息
    getLawCaseData() {
      if (this.lawCaseData) {
        this.process = this.lawCaseData.process
        this.caseCourtId = this.lawCaseData ? this.lawCaseData.flowCourt ? this.lawCaseData.flowCourt.id : '' : ''
        this.meditorCourtId = this.lawCaseData ? this.lawCaseData.court ? this.lawCaseData.court.id : '' : ''
        this.selectbriefId = this.lawCaseData ? this.lawCaseData.brief ? this.lawCaseData.brief.id : '' : ''
        this.flowStatus = this.lawCaseData.flowStatus
        this.selectCountId = this.lawCaseData.court ? this.lawCaseData.court.id : ''
        this.selectMediaterid = this.lawCaseData.mediater ? this.lawCaseData.mediater.id : ''
        this.caseMediaterId = this.lawCaseData.mediater ? this.lawCaseData.mediater.id : ''
        this.endTypeStr = this.lawCaseData.endType
        this.register1 = this.lawCaseData.register
        this.moveType1 = this.lawCaseData.moveType
      }
    },
    // 审核
    examine() {
      this.$refs.audit.examine()
    },
    // 分发
    distribute() {
      this.$refs.distribution.distribute()
    },
    // 分配
    distribution() {
      this.$refs.allocation.distribution()
    },
    // 结案
    closeCase1() {
      this.$refs.endCase1.endCase()
    },
    // 分流
    flowCase() {
      this.$refs.diversion.flowCase()
    },
    // 移送
    transfer() {
      this.$refs.transfer.transfer()
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
.deal-info-wrapper {
  width: 100%;
  .header {
    background-color: $themeColor;
    color: #fff;
    font-size: 18px;
    height: 55px;
    line-height: 55px;
    display: flex;
    text-align: center;
    font-weight: 400;
    .header-item {
      flex: 1;
      &.active {
        position: relative;
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0px;
          border: 15px solid;
          border-color: transparent transparent white transparent;
          margin-left: -15px;
        }
      }
    }
  }
  .title {
    display: flex;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-left: 1px solid #dddfe1;
    border-right: 1px solid #dddfe1;
    border-bottom: 1px solid #dddfe1;
    .title-item {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.result {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 25%;
        p {
          line-height: 1;
          &:first-child {
            font-size: 16px;
            color: $themeColor;
            font-weight: bold;
          }
          &:last-child {
            font-size: 14px;
            width: 100%;
            color: #abafb3;
            margin-top: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .text {
        display: inline;
        color: #abafb3;
        font-size: 16px;
        font-weight: bold;
        &.active {
          color: $themeColor;
        }
      }
      .back-btn {
        display: inline;
        color: $themeColor;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-left: 15px;
      }
      .submit-wrapper {
        display: inline;
        margin-left: 20px;
        img {
          width: 30px;
          position: relative;
          top: 8px;
          cursor: pointer;
        }
      }
    }
  }
  .content {
    display: flex;
    border: 1px solid #dddfe1;
    border-top: none;
    .form-wrapper {
      width: 400px;
      margin: 40px auto;
      .el-row {
        margin-bottom: 10px;
      }
      .form-btn {
        height: 40px;
        line-height: 40px;
        padding: 0px;
        width: 100%;
        text-align: center;
        text-align: center;
        &.active {
          background-color: #0097FE;
          color: #fff;
          border-color: #0097FE;
        }
      }
      label {
        height: 40px;
        line-height: 40px;
      }
      ::v-deep .el-select{
        width: 100%;
      }
      .btn-wrapper {
        text-align: center;
        ::v-deep .el-button {
          &:nth-child(1) {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
