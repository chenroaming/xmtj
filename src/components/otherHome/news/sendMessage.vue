<template>
  <div class="message-box">
    <el-row class="header">
      <el-input v-model="form.title" style="width: 500px;" placeholder="公告标题" />
    </el-row>
    <el-row class="header">
      <el-select v-model="form.receiveType2" style="width: 500px;" multiple placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-row>
    <el-row class="header">
      <el-date-picker
        v-model="form.sendDate"
        style="width: 500px;"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期时间"
      />
    </el-row>
    <el-row class="header" style="height: 350px;">
      <div id="wangeditor">
        <div ref="editorElem" style="text-align:left;" />
      </div>
    </el-row>
    <el-row class="header" style="margin-top: 10px;">
      <el-button type="success" size="mini" :loading="isLoading" @click="send">发送</el-button>
      <el-button type="primary" size="mini" @click="back">返回</el-button>
      <uploadFile ref="uploadFile" style="display: inline-block;margin-left: 10px;" @getUrl="getUrl" />
    </el-row>
  </div>
</template>

<script>
import uploadFile from '@/components/addCase/uploadFile'
import { addAffiche } from '@/api/otherHome/otherHome'
import E from 'wangeditor'
export default {
  name: 'SendMessage',
  components: {
    uploadFile
  },
  data() {
    return {
      isLoading: false,
      form: {
        title: '',
        content: '',
        receiveType: '',
        receiveType2: [],
        sendDate: '',
        fileUrl: ''
      },
      editor: null,
      options: [
        {
          value: '1000',
          label: '分流中心'
        },
        {
          value: '0100',
          label: '联动单位'
        },
        {
          value: '0010',
          label: '解纷组织'
        },
        {
          value: '0001',
          label: '解纷员'
        }
      ]
    }
  },
  computed: {

  },
  mounted() {
    this.editor = new E(this.$refs.editorElem)
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.form.content = html
    }
    this.editor.customConfig.menus = [
      // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    this.editor.create() // 创建富文本实例
  },
  methods: {
    back() {
      this.$emit('backList')
    },
    send() {
      this.isLoading = true
      const str = this.options.map(item => 0) // 根据长度组合初始数组
      this.form.receiveType = str
        .map((item, index) => {
          return this.form.receiveType2
            .map(item => item.indexOf('1')) // 取出当前选择的数据中'1'所在的下标
            .includes(index) ? 1 : 0 // 重组处理形成新的二进制格式数据
        }).join('')
      addAffiche(this.form).then(res => {
        if (res.state === 100) {
          this.$message.success(res.message)
          this.$emit('backList')
        }
      }).finally(() => {
        this.isLoading = false
      })
    },
    getUrl(url) {
      this.form.fileUrl = url
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
    }
  }
</style>
