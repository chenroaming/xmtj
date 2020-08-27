<template>
  <div class="mediation-room-wrapper">
    <div class="content">
      <div class="content-left">
        <baseInfo
          ref="baseInfo"
          :law-case-data="lawCaseData"
          @addVideoEvi="addVideoEvi"
          @geteVidencesId="geteVidencesId"
        />
      </div>
      <div class="content-right">
        <div>
          <caseDescribe
            :law-case-data="lawCaseData"
            :group-user-data="groupUserData"
            @back="back"
            @turnRecord="turnRecord"
          />
          <chat
            v-show="!isVideo"
            :case-id="caseId"
            :img-array="imgArrayData"
            :upload-file-url="uploadFileUrl"
            @uploadImg="uploadImg"
            @showVideo="showVideo"
            @getRoomToken="getRoomToken"
            @showFile="showFile"
            @groupUser="groupUser"
          />
          <videoMediation
            v-if="isVideo"
            :room-token="roomToken"
            :case-id="caseId"
            @hideVideo="hideVideo"
          />
        </div>
        <uploadFile
          v-if="isUploadFile"
          @backFile="backFile"
          @submitFile="submitFile"
        />
        <transition
          v-if="isUploadEvi"
          name="fade"
        >
          <uploadEvidence
            @back="backEvi"
            @submitImg="submitImg"
          />
        </transition>
        <transition
          v-if="isRecordView"
          name="fade"
        >
          <recordView
            :href="href"
            :case-id="caseId"
            @hideRecordView="hideRecordView"
          />
        </transition>
        <uploadVideoEvie
          v-if="isShowVideoEvi"
          :evi-id="eviId"
          @backVideoEvi="backVideoEvi"
        />
      </div>
    </div>
    <modal
      :title="'解纷室>解纷结果'"
      :modal-visible="modalVisible"
      @submitModal="submitModal"
      @changeModalVisible="changeModalVisible"
    >
      <div class="btn-wrapper">
        <el-button
          class="normal"
          :class="{'active': mediateResult == 1}"
          @click="selectMediateResult(1)"
        >解纷成功</el-button>
        <el-button
          class="normal"
          :class="{'active': mediateResult == 2}"
          @click="selectMediateResult(2)"
        >待继续解纷</el-button>
        <el-button
          class="normal"
          :class="{'active': mediateResult == 3}"
          @click="selectMediateResult(3)"
        >解纷失败</el-button>
      </div>
      <div
        v-if="mediateResult == 3"
        class="textarea-wrapper"
      >
        <el-select v-model="refuseCode" placeholder="请选择">
          <el-option
            v-for="item in refuseCodeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- <label>备注:</label> -->
        <el-input
          v-if="refuseCode == '其他(请备注说明)'"
          v-model="mediateResultReason"
          style="margin-top: 10px;"
          type="textarea"
          placeholder="请输入相关内容..."
        />
      </div>
    </modal>
  </div>
</template>

<script>
import { exitGroup } from '@/utils/socket.js'
import { detailCase } from '@/api/case/index.js'
import { closeRoom } from '@/api/rtcRoom/rtcRoom.js'
import {
  downloadMessage,
  updateCaseResult,
  outRecord
} from '@/api/mediater/mediater.js'
import baseInfo from './compontent/baseInfo'
import chat from './compontent/chat'
import caseDescribe from './compontent/caseDescribe'
import uploadEvidence from './compontent/uploadEvidence'
import recordView from './compontent/recordView.vue'
import videoMediation from './compontent/videoMediation'
import uploadFile from './compontent/uploadFile'
import modal from '@/components/modal/modal.vue'
import uploadVideoEvie from './compontent/uploadVideoEvie'
export default {
  components: {
    baseInfo,
    caseDescribe,
    chat,
    uploadEvidence,
    recordView,
    videoMediation,
    uploadFile,
    modal,
    uploadVideoEvie
  },
  props: {
    caseId: null // 案件ID
  },
  data() {
    return {
      lawCaseData: null, // 案件数据
      isUploadEvi: false, // 是否是上传证据的状态
      isRecordView: false, // 是否预览笔录
      imgArrayData: null, // 接收组件传过来的上传的图片
      isVideo: false, // 是否在线聊天还是在线视频
      href: null, // 文件预览地址
      roomToken: null,
      isUploadFile: false,
      uploadFileUrl: [], // 上传附件的地址
      groupUserData: null,
      mediateResult: 1,
      mediateResultReason: '',
      modalVisible: false,
      eviId: '', // 证据ID
      isShowVideoEvi: false,
      refuseCode: '',
      refuseCodeData: [
        {
          value: '联系不到当事人',
          label: '联系不到当事人'
        },
        {
          value: '当事人撤回解纷请求',
          label: '当事人撤回解纷请求'
        },
        {
          value: '当事人明确表示不接受解纷',
          label: '当事人明确表示不接受解纷'
        },
        {
          value: '双方分歧较大且难以达成解纷协议',
          label: '双方分歧较大且难以达成解纷协议'
        },
        {
          value: '其他(请备注说明)',
          label: '其他(请备注说明)'
        }
      ]
    }
  },
  watch: {
    caseId() {
      this.getCaseDetail()
    }
  },
  created() {
    this.getCaseDetail()
  },
  mounted() {},
  methods: {
    // 获取案件详情
    getCaseDetail() {
      if (!this.caseId) {
        return
      }
      detailCase({ lawCaseId: this.caseId }).then(res => {
        this.lawCaseData = res.lawCase
      })
    },
    // 返回列表页
    back() {
      this.modalVisible = true
    },
    // 显示模态框
    showModal() {
      this.modalVisible = true
    },
    // 关闭模态框
    changeModalVisible() {
      this.modalVisible = false
    },
    // 上传证据的返回
    backEvi() {
      this.isUploadEvi = false
    },
    // 点击下载笔录弹出预览界面
    turnRecord() {
      downloadMessage({ roomId: this.caseId }).then(res => {
        this.href = res.url
        this.isRecordView = true
      })
    },
    // 隐藏笔录预览部分
    hideRecordView() {
      this.isRecordView = false
    },
    // 点击弹出图片上传组件
    uploadImg() {
      this.isUploadEvi = true
    },
    // 接收上传图片组件上传的图片地址
    submitImg(imgArray) {
      this.imgArrayData = []
      this.imgArrayData = imgArray
      this.isUploadEvi = false
    },
    // 隐藏在线视频
    hideVideo() {
      this.isVideo = false
    },
    // 显示在线视频
    showVideo() {
      this.isVideo = true
    },
    // 获取roomToken
    getRoomToken(token) {
      this.roomToken = token
    },
    // 隐藏添加附件
    backFile() {
      this.isUploadFile = false
    },
    submitFile(url) {
      this.isUploadFile = false
      this.uploadFileUrl = url
    },
    showFile() {
      this.isUploadFile = true
    },
    // 显示组群信息
    groupUser(data) {
      this.groupUserData = data
    },
    // 选择解纷结果
    selectMediateResult(index) {
      this.mediateResult = index
    },
    // 提交解纷结果
    submitModal() {
      const params = {
        caseId: this.caseId
      }
      let recordResult = 1 // 解纷结果 1 待定 2 结束
      if (this.mediateResult == 1) {
        params.process = 6 // 解纷成功
        recordResult = 2
        params.endType = 1
      } else if (this.mediateResult == 2) {
        params.process = 4 // 继续解纷
        recordResult = 1
      } else if (this.mediateResult == 3) {
        params.process = 6
        params.refuseCode = this.refuseCode
        params.endType = 2
        if (params.refuseCode == '其他(请备注说明)') {
          params.result = this.mediateResultReason
          if (!params.result) {
            this.$message({
              showClose: true,
              message: '备注不能为空',
              type: 'error'
            })
            return
          }
        }
        recordResult = 3
      }
      outRecord({
        id: this.$store.state.mediater.mediaterId,
        recordResult
      }).then(res => {
        console.log(res)
      })
      closeRoom()
      updateCaseResult(params).then(res => {
        if (res.state == 100) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          const params1 = {
            userid: this.$store.state.user.loginId
          }
          // intoTalkRoom({ caseId: this.caseId, type: 1 })
          exitGroup(params1)
          this.$emit('back')
        }
      })
    },
    // 点击弹出上传视频证据部分
    addVideoEvi(eviId) {
      this.eviId = eviId
      this.isShowVideoEvi = true
    },
    // 隐藏视频编辑部分
    backVideoEvi() {
      this.isShowVideoEvi = false
      this.$refs.baseInfo.getEvid('')
    },
    // 选择证据获取证据Id的值
    geteVidencesId(eviId) {
      if (this.eviId == eviId) {
        this.eviId = ''
        this.isShowVideoEvi = false
      } else {
        this.eviId = eviId
        this.isShowVideoEvi = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.mediation-room-wrapper {
  .header {
    .text {
      color: #fff;
      font-weight: bold;
    }
    padding-bottom: 30px;
  }
  .content {
    width: 100%;
    background-color: #fff;
    display: flex;
    .content-left {
      width: 320px;
    }
    .content-right {
      flex: 1;
      position: relative;
      .bg-blur {
        filter: blur(5px);
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.my-modal {
  .btn-wrapper {
    margin: 0px;
    .normal {
      border-color: #fafafa;
      background-color: #f0f1f2;
      padding: 10px 15px;
      width: auto;
      color: #131026;
      &.active {
        color: #fff;
        background-color: $themeColor;
      }
    }
  }
  .textarea-wrapper {
    margin-top: 15px;
    label {
      display: block;
      font-size: 14px;
      color: #464a53;
      margin-bottom: 15px;
    }
    :v-deep .el-textarea__inner {
      background-color: #fafafa;
      border-color: #f0f1f2;
      resize: none;
      &::-webkit-input-placeholder {
        color: $themeColor;
      }
    }
  }
}
</style>
