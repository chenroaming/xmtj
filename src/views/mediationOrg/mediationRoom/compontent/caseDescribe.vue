<template>
  <div class="case-describe-wrapper">
    <!-- <div class="header">
      <span class="header-text-icon circle-text"><span>标题</span></span>
      <span
        class="text"
        v-if="caseData"
      >{{caseData.dCaseNo}} XXXXXXXXXX解纷</span>
    </div> -->
    <div class="title">
      <div
        v-if="caseData"
        class="text"
        style="margin-right: 5px;"
      >{{ caseData.sqCaseNo }}</div>
      <!-- <i class="el-icon-caret-top"></i> -->
      <!-- <el-button
        round
        @click="turnRecord"
      >转成笔录</el-button> -->
    </div>
    <div class="content">
      <p>地点：互联网解纷室</p>
      <p>记录:</p>
      <p
        v-for="(item, index) in chatRecord"
        :key="index"
        class="record-item"
      >
        <span v-if="item.type != 'file' && item.type != 'img'">{{ item.name }}:{{ item.text }}</span>
        <span v-if="item.type == 'file' || item.type == 'img'" class="a-click" @click="lookFile(item.text)">{{ item.name }}:{{ getFileName(item.text) }}</span>
      </p>
      <p
        v-if="!chatRecord || chatRecord.length < 1"
        class="no-record"
      >
        暂无记录
      </p>
    </div>
    <participant
      :group-user-data="groupUserData"
      :case-id="caseId"
    />
    <div
      class="back"
      @click="back"
    >
      <i class="el-icon-arrow-left" />
    </div>
  </div>
</template>

<script>
import { getHistory } from '@/api/case/index.js'
import participant from './participant'
import {
  BASEIMGURL,
  SERVICEURL,
  OFFICE365RUL,
  OFFICE365ID
} from '@/utils/constVal.js'
export default {
  components: {
    participant
  },
  props: {
    lawCaseData: null, // 获取案件信息
    groupUserData: null
  },
  data() {
    return {
      caseData: null, // 接收案件数据
      caseId: '',
      chatRecord: []
    }
  },
  computed: {
    getFileName() {
      return url => {
        return url.split('/').pop()
      }
    }
  },
  watch: {
    lawCaseData: {
      handler() {
        this.getCaseData()
      },
      deep: true
    }
  },
  created() {
    this.getCaseData()
  },
  mounted() {},
  methods: {
    // 获取案件信息
    getCaseData() {
      if (!this.lawCaseData) {
        return
      }
      this.caseData = JSON.parse(JSON.stringify(this.lawCaseData))
      this.caseId = this.caseData.id
      this.getHistory()
    },
    back() {
      this.$emit('back')
    },
    turnRecord() {
      this.$emit('turnRecord')
    },
    // 获取历史记录
    getHistory() {
      const params = {
        groupId: this.caseId,
        startTime: this.$store.state.mediater.mediaterInfo.startTime,
        endTime: this.$store.state.mediater.mediaterInfo.endTime
      }
      if (!this.$store.state.mediater.mediaterInfo.endTime) {
        return
      }
      getHistory(params).then(res => {
        this.chatRecord = []
        if (res.state == 100) {
          if (res.data && res.data.length > 0) {
            res.data.forEach(item => {
              const info = JSON.parse(item.messageContent)
              const obj = {
                name: info.userName,
                text: info.text,
                type: info.type
              }
              this.chatRecord.push(obj)
            })
          }
        }
      })
    },
    // 查看记录文件
    lookFile(url) {
      // this.modalVisible = true
      let lookUrl = ''
      if (this.isImg(url)) {
        lookUrl = `${BASEIMGURL}/${url}`
      } else {
        lookUrl = `${OFFICE365RUL}?i=${OFFICE365ID}&ssl=1&furl=${SERVICEURL}/${url}`
      }
      window.open(lookUrl)
    },
    // 判断为图片还是文件
    isImg(url) {
      let flag = false
      if (
        url.indexOf('doc') > -1 ||
        url.indexOf('docx') > -1 ||
        url.indexOf('pdf') > -1
      ) {
        flag = false
      } else {
        flag = true
      }
      return flag
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.case-describe-wrapper {
  position: relative;
  padding: 30px;
  padding-left: 90px;
  border-bottom: 1px solid #f0f1f2;
  .back {
    cursor: pointer;
    position: absolute;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: white;
    background-color: $themeColor;
    border-radius: 50%;
    top: 30px;
    right: 30px;
    i {
      font-size: 20px;
      position: relative;
      top: 2px;
    }
  }
  .header {
    height: 24px;
    line-height: 24px;
    margin-bottom: 10px;
    .header-text-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      font-size: 12px;
      background-color: $themeColor;
      span {
        display: block;
        font-size: 10px;
        transform: scale(0.8);
      }
    }
    .text {
      font-weight: 400;
      font-size: 13px;
      color: #192a46;
    }
  }
  .title {
    height: 42px;
    line-height: 42px;
    margin-bottom: 10px;
    .text {
      display: inline-block;
      font-size: 32px;
    }
    .el-icon-caret-top {
      vertical-align: super;
      margin: 0 15px;
    }
    .el-button {
      vertical-align: super;
      background-color: #23eaa4;
      border: none;
      color: #fff;
    }
  }
  .content {
    max-height: 150px;
    overflow-y: auto;
    .no-record {
      font-size: 12px;
      margin-left: 10px;
    }
    & > p {
      font-size: 15px;
      color: #192a46;
      line-height: 24px;
      font-weight: 400;
      word-break: break-all;
    }
    .a-click {
      cursor: pointer;
    }
  }
}
</style>
