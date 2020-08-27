<template>
  <div class="">
    <div class="header">
      <span :class="{isChoice:nowChoice === 'notice'}" @click="getNotice('notice')">
        公告中心
      </span>
      <span :class="{isChoice:nowChoice === 'message'}" @click="getNotice('message')">
        系统消息
      </span>
    </div>
    <div class="body">
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="button-box">
            <el-button type="primary" @click="send = true;">新建</el-button>
          </div>
          <el-row style="margin-top: 20px;">
            <el-col :span="12">未读</el-col>
            <el-col :span="12" style="text-align: right;">{{ count.notRead }}</el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="12">已读</el-col>
            <el-col :span="12" style="text-align: right;">{{ count.hasRead }}</el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="12">全部</el-col>
            <el-col :span="12" style="text-align: right;">{{ allRead }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="18" :offset="2" style="border-left: 1px solid #E8ECEF;min-height: calc(100vh - 240px);height: auto;">
          <message-box v-if="!showDetail && !send" :count.sync="count" @show="show" />
          <messageDetail v-if="showDetail && !send" :detail="detail" @show="show" />
          <sendMessage v-if="send" @backList="backList" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import messageBox from '@/components/otherHome/news/messageBox'
import messageDetail from '@/components/otherHome/news/messageDetail'
import sendMessage from '@/components/otherHome/news/sendMessage'
export default {
  name: 'News',
  components: {
    messageBox, messageDetail, sendMessage
  },
  data() {
    return {
      nowChoice: 'notice',
      count: {
        hasRead: 5,
        notRead: 25
      },
      detail: {
        sendName: '',
        date: '',
        receiveType: '0001',
        title: '',
        content: '',
        file: ''
      },
      showDetail: false,
      send: false
    }
  },
  computed: {
    allRead() {
      return Number(this.count.hasRead) + Number(this.count.notRead)
    }
  },
  mounted() {
    this.$emit('update:nowChoice', '资讯管理')
  },
  methods: {
    show(status, item) {
      this.detail = {
        ...item
      }
      this.showDetail = status
    },
    getNotice(msg) {
      this.nowChoice = msg
    },
    backList() {
      this.showDetail = false
      this.send = false
    }
  }
}
</script>

<style lang="scss">
  .el-col-12 {
    color: #4D4F5C;
  }
</style>

<style scoped lang = "scss">
  .header {
    height: 60px;
    border-bottom: 5px solid #f2f5fa;
    span{
      width: 100px;
      height: 60px;
      line-height: 60px;
      display: inline-block;
      text-align: center;
      cursor: pointer;
    }
  }
  .body {
    margin-bottom: 50px;
  }
  .button-box {
    height: 100px;
    line-height: 100px;
    text-align: center;
    border-bottom: 1px solid #f1f1f3;
  }
  .isChoice {
    border-bottom: 5px solid #007AFF;
  }
</style>
