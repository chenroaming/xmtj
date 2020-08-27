<template>
  <el-dialog
    :close-on-click-modal="false"
    width="500px"
    :title="titleText"
    append-to-body
    :visible.sync="dialogFormVisible"
  >
    <el-form ref="form" :model="form" :rules="eviRules">
      <el-form-item label="提供人" prop="litigantId" :label-width="formLabelWidth">
        <el-select v-model="form.litigantId" style="width: 100%;" placeholder="请选择当事人">
          <el-option v-for="(item,index) in litigantList" :key="index" :label="item.litigantName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="证据名称" prop="eviName" :label-width="formLabelWidth">
        <el-input v-model="form.eviName" />
      </el-form-item>
      <el-form-item label="提供时间" prop="provideDate" :label-width="formLabelWidth">
        <!-- <el-input v-model="form.provideDate" /> -->
        <el-date-picker
          v-model="form.provideDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <!-- <el-form-item label="证明对象" prop="objectOfProof" :label-width="formLabelWidth">
        <el-input v-model="form.objectOfProof" />
      </el-form-item>
      <el-form-item label="份数" prop="count" :label-width="formLabelWidth">
        <el-input v-model="form.count" />
      </el-form-item>
      <el-form-item label="证据来源" prop="source" :label-width="formLabelWidth">
        <el-input v-model="form.source" />
      </el-form-item> -->
      <el-form-item label="证据文件" :label-width="formLabelWidth">
        <el-upload
          ref="upload"
          action="/api/court/evidence/uploadProof.jhtml"
          :on-success="handleSuccess"
          accept=".jpg,,png,.doc,.docx,.pdf"
          :limit="10"
          name="file"
          :on-remove="remove"
          :on-exceed="exceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip">证据份数不超过10份</span>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" :loading="isLoading" @click="upEvi">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import rules from '@/utils/rules'
import { addOrUpdateEvi } from '@/api/litigant/litigant'
export default {
  name: 'AddEvi',
  mixins: [rules],
  props: {
    litigantList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      isLoading: false,
      dialogFormVisible: false,
      formLabelWidth: '100px',
      fileUrl: [],
      form: {
        litigantId: '',
        eviId: '',
        eviName: '',
        provideDate: '',
        // objectOfProof: '',
        // count: '',
        // source: '',
        urls: ''
      },
      fileList: []
    }
  },
  computed: {
    titleText() {
      return '新增证据'
    }
  },
  watch: {
    dialogFormVisible(cur, old) {
      !cur && this.reset()
      !cur && this.$refs.upload.clearFiles()
    }
  },
  mounted() {

  },
  methods: {
    show() {
      this.dialogFormVisible = true
    },
    reset() {
      this.form = {
        litigantId: '',
        eviId: '',
        eviName: '',
        provideDate: '',
        urls: ''
      }
      this.fileUrl = []
      this.fileList = []
      this.$refs['from'].resetFields()
    },
    upEvi() {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.isLoading = true
        this.form.urls = this.fileUrl.join(',')
        this.form.count = Number(this.form.count)
        addOrUpdateEvi(this.form).then(res => {
          if (res.state === 100) {
            this.$message.success(res.message)
            this.dialogFormVisible = false
            this.$refs.upload.clearFiles()
            this.$emit('done')
          }
        }).finally(() => {
          this.isLoading = false
        })
      })
    },
    handleSuccess(response, file, fileList) {
      this.fileUrl.push(response.url)
      this.fileList = fileList
    },
    exceed() {
      this.$message.warning('最多上传10个文件！')
    },
    edit(item) {
      this.dialogFormVisible = true
      this.form = {
        litigantId: item.litigantId,
        eviId: item.id,
        provideDate: item.provideDate,
        eviName: item.evidenceName
      }
      this.fileList = []
      if (item.evidenceAttachments && item.evidenceAttachments.length > 0) {
        item.evidenceAttachments.forEach(item1 => {
          this.fileList.push({
            name: item1.name,
            url: item1.url
          })
          this.fileUrl.push(item1.url)
        })
      }
    },
    // 移除
    remove(e) {
      const index = this.fileList.findIndex(item => item.uid == e.uid)
      this.fileList.splice(index, 1)
      this.fileUrl.splice(index, 1)
    }
  }
}
</script>

<style scoped lang = "scss">

</style>
