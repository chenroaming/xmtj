<template>
  <div>
    <input
      ref="selectFile"
      type="file"
      style="display: none;"
      @change="handleChange"
    >
    <el-button size="mini" type="primary" @click="submit">点击上传</el-button>
    <el-tag
      v-for="item in fileList"
      :key="item.name"
      type="success"
      style="cursor: pointer;"
      @click="enlarge"
    >
      {{ item.name }}
      <span>
        <i class="el-icon-close" style="cursor: pointer;" @click.prevent="delFile" />
      </span>
    </el-tag>
    <el-tag
      v-if="fileList.length < 1 && handleIsUpload"
      style="cursor: pointer;"
      type="success"
      @click="enlarge"
    >{{ handleIsUpload }}</el-tag>
    <el-dialog
      title="预览图片"
      append-to-body
      :visible.sync="dialogTableVisible"
    >
      <div class="picBox">
        <el-image
          ref="picBox"
          :src="picUrl"
          :preview-src-list="srcList"
          class="enlarge"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadFrontImage } from '@/api/litigant/litigant'
export default {
  name: 'UploadFile',
  props: {
    imgType: {
      type: String,
      default: ''
    },
    isUpload: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      fileList: [],
      picUrl: ''
    }
  },
  computed: {
    handleIsUpload() {
      return this.isUpload && this.isUpload.split('/').pop()
    },
    srcList() {
      return [this.picUrl]
    }
  },
  mounted() {

  },
  methods: {
    handleChange(e) {
      if (e.target.files.length < 1) return
      const fileList = Object.values(e.target.files)
      const formData = new FormData()
      for (const item of fileList) {
        formData.append('file', item)
      }
      uploadFrontImage(formData).then(({ state, url, message }) => {
        if (state === 100) {
          this.$message.success(message)
          this.fileList = fileList
          this.picUrl = url
          this.$emit('getUrl', url, this.imgType)
        }
      })
    },
    submit() {
      this.$refs.selectFile.click()
    },
    clearFiles() {
      this.fileList = []
      return true
    },
    delFile() {
      this.fileList = []
      this.$emit('getUrl', '', this.imgType)
    },
    enlarge() {
      this.isUpload && (this.picUrl = this.isUpload)
      this.dialogTableVisible = true
    }
  }
}
</script>

<style scoped lang = "scss">
  .picBox {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
