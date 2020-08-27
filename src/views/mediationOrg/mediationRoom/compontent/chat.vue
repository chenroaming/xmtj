<template>
  <div class="chat-wrapper">
    <div class="chat-record-wrapper">
      <chatItem
        v-for="(item, index) in chatRecordList"
        :id="'chatItem'+item.time"
        :key="index"
        :direction="direction"
        :content="item"
        :num="index"
        :class="'chatItem'+item.withdraw"
        :case-id="caseId"
        @withdraw="withdraw"
      />
    </div>
    <div class="time-division">
      <div class="time">{{ time }}</div>
      <div class="line" />
    </div>
    <div class="chat-send-wrapper">
      <div class="img-group">
        <img
          src="@/assets/img/chat/icon1.png"
          @click="showFile"
        >
        <img
          src="@/assets/img/chat/icon2.png"
          @click="showVideo"
        >
        <img
          src="@/assets/img/chat/icon3.png"
          @click="uploadImg"
        >
      </div>
      <el-input
        v-model="chatContent"
        class="sy-textarea"
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
      />
      <div class="button-wrapper">
        <el-button @click="send">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { initWebSocket, sendMessage, groupUser } from '@/utils/socket.js'
import { formatDate } from '@/utils/format.js'
import chatItem from './chatItem'
import { findArrayIndexByKey } from '@/utils/tools.js'
export default {
  components: {
    chatItem
  },
  props: {
    caseId: null,
    imgArray: null, // 父组件传来的聊天图片地址
    uploadFileUrl: null // 父组件传来的附件地址
  },
  data() {
    return {
      chatContent: '',
      direction: 'directionLeft',
      loginId: null, // 登陆ID
      chatRecordList: [], // 聊天记录
      chatRecordListUserId: [], // 聊天记录人的ID
      imgArrayData: null, // 接收组件传来的聊天的图片
      loginUserInfo: null, // 登陆人信息
      uploadFileUrlData: null,
      time: formatDate(new Date().getTime())
    }
  },
  watch: {
    imgArray: {
      handler() {
        this.imgArrayData = []
        this.imgArrayData = this.imgArray
        this.imgArrayData.forEach(item => {
          const time = new Date().getTime()
          const params = {
            from: this.loginId,
            group_id: this.caseId,
            createTime: time,
            content: {
              userName: this.loginUserInfo.result.name,
              role: this.loginUserInfo.roleType,
              text: item,
              loginId: this.loginId,
              type: 'img',
              createTime: formatDate(time),
              time,
              messageid: `${this.loginId}${time}`
            }
          }
          sendMessage(params)
        })
      },
      deep: true
    },
    uploadFileUrl() {
      // 附件地址
      this.uploadFileUrlData = []
      this.uploadFileUrlData = this.uploadFileUrl
      this.uploadFileUrlData.forEach(item => {
        const time = new Date().getTime()
        const params = {
          from: this.loginId,
          group_id: this.caseId,
          createTime: time,
          content: {
            userName: this.loginUserInfo.result.name,
            role: this.loginUserInfo.roleType,
            fileName: item.split('/').pop(),
            text: item,
            loginId: this.loginId,
            type: 'file',
            time,
            createTime: formatDate(time),
            messageid: `${this.loginId}${time}`
          }
        }
        sendMessage(params)
      })
    }
  },
  created() {
    this.getLoginId()
    this.initSocket()
    this.loginUserInfo = this.$store.state.user.userInfo
  },
  mounted() {},
  methods: {
    // 接收聊天记录
    getMessage(e) {
      const data = JSON.parse(e.data)
      console.log('-socket的信息--')
      console.log(data)
      if (data.command == 18) {
        // 获取在线人数
        this.$emit('groupUser', data.data.groups[0].users)
      }
      if (data.command === 9) {
        // 有人加入群聊
        this.getGroupUser()
      }
      if (data.command === 10) {
        // 有人退出群聊
        this.getGroupUser()
      }
      if (data.command === 11) {
        const content = JSON.parse(data.data.content)
        const time = new Date().getTime()
        content.time = time
        if (content.type == 'rollback') {
          // 发出测回信息
          const chatRecordListnum = findArrayIndexByKey(
            this.chatRecordList,
            'messageid',
            content.text
          )
          if (chatRecordListnum >= 0) {
            this.$set(
              this.chatRecordList[chatRecordListnum],
              'isWithdraw',
              true
            )
          }
        } else if (content.type == 'words') {
          // 发出禁言消息
        } else {
          this.chatRecordList.push(content)
        }
        this.$nextTick(() => {
          document.getElementById(`chatItem${time}`).scrollIntoView()
        })
      }
    },
    send() {
      const time = new Date().getTime()
      const params = {
        from: this.loginId,
        group_id: this.caseId,
        createTime: time,
        content: {
          userName: this.loginUserInfo.result.name,
          role: this.loginUserInfo.roleType,
          text: this.chatContent,
          loginId: this.loginId,
          type: 'text',
          time: time,
          createTime: formatDate(time),
          messageid: `${this.loginId}${time}`
        }
      }
      sendMessage(params)
      this.chatContent = ''
    },
    // 获取群组在线人数
    getGroupUser() {
      const params = {
        userid: this.loginId
      }
      groupUser(params)
    },
    initSocket() {
      initWebSocket(this.loginId, this.caseId, this.getMessage)
    },
    getLoginId() {
      this.loginId = this.$store.state.user.loginId
    },
    uploadImg() {
      this.$emit('uploadImg')
    },
    // 显示在线视频
    showVideo() {
      const time = new Date().getTime()
      const params = {
        from: this.loginId,
        group_id: this.caseId,
        createTime: time,
        content: {
          userName: this.loginUserInfo.result.name,
          role: this.loginUserInfo.roleType,
          text: '解纷员已开启视频解纷，点击下方视频按钮进入视频解纷',
          loginId: this.loginId,
          type: 'text',
          time: time,
          createTime: formatDate(time),
          messageid: `${this.loginId}${time}`
        }
      }
      sendMessage(params)
      this.$emit('showVideo')
    },
    // 显示附件上传
    showFile() {
      this.$emit('showFile')
    },
    // 撤回
    withdraw(id) {
      const time = new Date().getTime()
      const params = {
        from: this.loginId,
        group_id: this.caseId,
        createTime: time,
        content: {
          userName: this.loginUserInfo.result.name,
          role: this.loginUserInfo.roleType,
          text: id,
          content: '',
          loginId: this.loginId,
          type: 'rollback',
          time: time,
          createTime: formatDate(time),
          messageid: `${this.loginId}${time}`
        }
      }
      sendMessage(params)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.chat-wrapper {
  height: 100%;
  .chat-record-wrapper {
    width: 100%;
    height: 250px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px 30px 0 70px;
  }
  .time-division {
    position: relative;
    height: 16px;
    .time {
      position: absolute;
      z-index: 2;
      background-color: #fff;
      left: 20px;
      color: #414d55;
      padding: 0 5px;
      font-size: 12px;
    }
    .line {
      position: relative;
      top: 10px;
      border-bottom: 1px dashed #dddfe1;
    }
  }
  .chat-send-wrapper {
    width: 100%;
    padding: 20px;
    .img-group {
      & > img {
        cursor: pointer;
        height: 20px;
        margin-right: 15px;
      }
    }
    .el-textarea {
      margin-top: 10px;
      margin-bottom: 10px;
      .el-textarea__inner {
        border: none;
        padding: 0px;
        resize: none;
      }
    }
    .button-wrapper {
      overflow: hidden;
      .el-button {
        float: right;
        background-color: $themeColor;
        color: #fff;
        padding: 12px 30px;
      }
    }
  }
}
</style>
