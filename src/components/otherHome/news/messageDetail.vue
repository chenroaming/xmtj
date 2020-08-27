<template>
  <div class="message-box">
    <a ref="downLoad" :href="downloadUrl" download="" style="display: none;" />
    <el-row class="header">
      <el-col :span="5">
        {{ detail.sendName }}
      </el-col>
      <el-col :span="6">
        {{ detail.date }}
      </el-col>
      <el-col :span="13" style="text-align: right;">
        <el-button type="text" @click="back">返回列表</el-button>
      </el-col>
    </el-row>
    <el-row class="header">
      接收用户：{{ reciveUser }}
    </el-row>
    <el-row class="header" style="height: auto;">
      <el-row>
        {{ detail.title }}
      </el-row>
      <el-row v-html="detail.content" />
    </el-row>
    <el-row class="header">
      附件：
      <el-tag v-if="!detail.fileUrl" type="warning">暂无</el-tag>
      <el-tag v-if="detail.fileUrl" type="success" style="cursor: pointer;" @click="downLoad">{{ detail.fileUrl }}</el-tag>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MessageDetail',
  props: {
    detail: {
      type: Object,
      default: () => ({
        sendName: '',
        date: '',
        receiveType: '',
        title: '',
        content: '',
        fileUrl: ''
      })
    }
  },
  data() {
    return {
      downloadUrl: ''
    }
  },
  computed: {
    reciveUser() {
      // const arr = []
      const receiveType = this.detail.receiveType.split('')
      // 第一种方法，处理后端给的二进制“密码”，解析成相应的名称
      const typeArr = ['分流中心', '联动单位', '解纷组织', '解纷员']
      return receiveType.map((item, index) => {
        return item === '1' ? typeArr[index] : ''
      }).join(' ')
      // 第二种方法，处理后端给的二进制“密码”，解析成相应的名称
      // const obj = {0:'分流中心',1:'联动单位',2:'调节组织',3:'解纷员'}
      // return receiveType.split('').reduce((acc,item)=>item==='1' ? `${acc} ${obj[item]}` : acc,'').trim()
    }
  },
  mounted() {

  },
  methods: {
    back() {
      this.$emit('show', false)
    },
    downLoad() {
      this.downloadUrl = `${location.origin}${this.detail.fileUrl}`
      this.$refs.downLoad.click()
    }
  }
}
</script>

<style scoped lang = "scss">
  .message-box {
    padding: 25px;
    .header {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #E8ECEF;
    }
  }
</style>
