<template>
  <div class="evidence-wrapper">
    <header1 :title="'证据信息'" :is-add="true" @add="add" />
    <el-table
      :data="tableData"
      border
      class="tab-wrapper"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="60"
      />
      <el-table-column
        prop="litigantMan"
        label="提供者"
      />
      <el-table-column
        prop="evidenceName"
        label="证据名称"
      />
      <el-table-column
        label="提供时间"
      >
        <template slot-scope="scope">
          {{ scope.row.provideDate | time }}
        </template>
      </el-table-column>
      <el-table-column
        label="附件"
      >
        <template slot-scope="scope">
          <div class="down-wrapper">
            <p v-for="item in scope.row.evidenceAttachments" :key="item.id" style="color: #2d8cf0;" @click="preview(item)">{{ item.name }}</p>
            <span class="down-btn" @click="downFiles(scope.row.evidenceAttachments)">
              <i class="el-icon-download" />
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-permission="[1,2,4,6]"
        label="操作"
      >
        <template slot-scope="scope">
          <div class="opera-btn">
            <img src="@/assets/img/edit.png" @click="edit(scope.row.id)">
            <img src="@/assets/img/del.png" @click="del(scope.row.id)">
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :modal-append-to-body="true"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="提供人" prop="litigantId">
              <el-select v-model="form.litigantId" style="width: 100%;" placeholder="请选择">
                <el-option
                  v-for="item in litigantData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="证据名称" prop="eviName">
              <el-input v-model="form.eviName" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="提供时间" prop="provideDate">
              <el-date-picker
                v-model="form.provideDate"
                style="width: 100%;"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="相关资料上传">
              <el-upload
                class="upload-demo"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                multiple
                action=""
                accept=".jpg,.png,.doc,.docx,.pdf"
                :limit="10"
                :on-exceed="handleExceed"
                :http-request="uploadSectionFile"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，不能超过10份</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="'预览证据'"
      :visible.sync="dialogVisible1"
      :modal-append-to-body="true"
      :append-to-body="true"
      :before-close="beforeClose1"
    >
      <div class="look-wrapper">
        <img
          v-if="isImg"
          :src="lookUrl"
        >
        <iframe
          v-if="!isImg"
          :src="lookUrl"
          width="100%"
          height="100%"
          style="min-height: 500px;"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="downFile(downUrl)">下 载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import header1 from './header'
import {
  BASEIMGURL,
  SERVICEURL,
  OFFICE365RUL,
  OFFICE365ID
} from '@/utils/constVal.js'
import { formatDate } from '@/utils/format.js'
import { evidenceList, uploadProof, addOrUpdateEvi, detailEviById, delEvi } from '@/api/case/index.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    header1
  },
  props: {

  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogTitle: '新增证据',
      eviName: '',
      litigantData: [],
      litigantId: '',
      form: {
        provideDate: formatDate(new Date().getTime())
      },
      fileList: [],
      rules: {
        litigantId: [
          { required: true, message: '请选择提供人', trigger: 'blur' }
        ],
        eviName: [
          { required: true, message: '请输入证据名称', trigger: 'blur' }
        ],
        provideDate: [
          { required: true, message: '请选择提供时间', trigger: 'blur' }
        ]
      },
      eviId: null,
      dialogVisible1: false,
      lookUrl: '',
      downUrl: '',
      isImg: true,
      process: null,
      role: this.$store.state.user.userRole
    }
  },
  computed: {
    ...mapGetters(['getCaseInfo'])
  },
  watch: {
    getCaseInfo() {
      this.process = this.getCaseInfo.process
      this.getEvidence()
      this.getlitigantData()
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 查看证据信息
    getEvidence() {
      evidenceList({ lawCaseId: this.getCaseInfo.id }).then(res => {
        if (res.state === 100) {
          this.tableData = res.evidences
          console.log(this.tableData)
        }
      })
    },
    // 添加证据
    add() {
      this.eviId = null
      this.dialogTitle = '新增证据'
      this.form = {}
      this.fileList = []
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    // 获取提供人数据
    getlitigantData() {
      this.litigantData = []
      const data = JSON.parse(JSON.stringify(this.getCaseInfo))
      if (data.litigants && data.litigants.length >= 0) {
        data.litigants.forEach(item => {
          const obj = {
            id: item.id,
            name: item.litigantName
          }
          this.litigantData.push(obj)
        })
      }
    },
    submit() {
      console.log(this.fileList)
      const url = []
      if (this.fileList && this.fileList.length >= 0) {
        this.fileList.forEach(item => {
          url.push(item.url)
        })
      } else {
        this.$message({
          showClose: true,
          message: `请上传附件`,
          type: 'error'
        })
      }
      const params = {
        eviId: this.eviId,
        litigantId: this.form.litigantId,
        eviName: this.form.eviName,
        urls: url.join(','),
        provideDate: formatDate(
          new Date(this.form.provideDate).getTime())
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          addOrUpdateEvi(params).then(res => {
            if (res.state === 100) {
              this.$message({
                showClose: true,
                message: res.message,
                type: 'success'
              })
              this.dialogVisible = false
              this.$store.dispatch('GetCaseInfo')
            }
          })
        }
      })
    },
    // 预览
    handlePreview(e) {
      this.visible = true
      this.downUrl = e.url
      this.lookUrl = `${SERVICEURL}${e.url}`
      window.open(this.lookUrl)
    },
    // 移除文件
    handleRemove(e) {
      const index = this.fileList.findIndex(item => item.uid == e.uid)
      this.fileList.splice(index, 1)
      console.log(this.fileList)
    },
    // 文件超出个数触发
    handleExceed() {
      this.$message({
        showClose: true,
        message: `文件最多不能超过10个`,
        type: 'error'
      })
    },
    // 自定义上传事件
    uploadSectionFile(e) {
      console.log(e)
      var fileObj = e.file
      var form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      this.$Message.loading({
        content: '正在上传，请稍后...',
        duration: 0
      })
      uploadProof(form).then(res => {
        this.$Message.destroy()
        if (res.state === 100) {
          const url = res.url.split('/')
          const obj = {
            name: url[url.length - 1],
            url: res.url
          }
          this.fileList.push(obj)
        }
      })
    },
    // 查看证据详情
    getEviDetail(id) {
      this.fileList = []
      detailEviById({ eviId: id }).then(res => {
        if (res.state === 100) {
          this.$set(this.form, 'litigantId', res.evi.litigantId)
          this.$set(this.form, 'eviName', res.evi.evidenceName)
          this.$set(this.form, 'provideDate', formatDate(res.evi.provideDate))
          if (res.evi.evidenceAttachments && res.evi.evidenceAttachments.length >= 0) {
            res.evi.evidenceAttachments.forEach(item => {
              const obj = {
                name: item.name,
                url: item.url
              }
              this.fileList.push(obj)
            })
          }
          console.log(this.form)
          this.dialogVisible = true
        }
      })
    },
    // 删除证据
    del(id) {
      this.$confirm('是否确认删除')
        .then(_ => {
          delEvi({ eviId: id }).then(res => {
            if (res.state === 100) {
              this.$message({
                showClose: true,
                message: res.message,
                type: 'success'
              })
              this.$store.dispatch('GetCaseInfo')
            }
          })
        }).catch(() => {

        })
    },
    // 查看详情
    edit(id) {
      this.eviId = id
      this.getEviDetail(id)
    },
    // 预览
    preview(item) {
      let url = ''
      const file = item.url
      this.downUrl = item.url
      this.isImg1(file)
      if (this.isImg) {
        url = `${BASEIMGURL}/${file}`
      } else {
        if (this.isPdf(file)) {
          url = `${SERVICEURL}/${file}`
        } else {
          url = `${OFFICE365RUL}?i=${OFFICE365ID}&ssl=1&furl=${SERVICEURL}/${file}`
        }
      }
      this.lookUrl = url
      this.dialogVisible1 = true
    },
    // 判断是否为图片
    isImg1(url) {
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
      this.isImg = flag
    },
    isPdf(url) { // 判断文件是否为pdf
      let flag = false
      if (
        url.indexOf('pdf') > -1
      ) {
        flag = true
      } else {
        flag = false
      }
      return flag
    },
    // 下载证据
    download() {
      this.downFile(this.downUrl)
    },
    beforeClose1() {
      this.dialogVisible1 = false
    },
    // 批量下载文件
    downFiles(files) {
      console.log(files)
      if (files && files.length >= 0) {
        files.forEach(item => {
          this.downFile(item.url)
        })
      }
    },
    downFile(url) {
      const a = document.createElement('a')
      a.download = ''
      a.href = `/${url}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
}
</script>

<style scoped lang="scss">
.evidence-wrapper {
  margin-top: 10px;
  ::v-deep .el-table td,.el-table th {
    text-align: center;
  }
  ::v-deep .cell {
    text-align: center;
  }
  .tab-wrapper {
    margin-top: 10px;
  }
  .down-btn {
    display: inline-flex;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    background-color: #7FCBFE;
    width: 30px;
    height: 30px;
    color: #fff;
    margin-left: 5px;
  }
  .down-wrapper {
    position: relative;
    padding-right: 50px;
    min-height: 30px;
    .down-btn {
      position: absolute;
      top: 0px;
      right: 0px;
      display: inline-flex;
      border-radius: 5px;
      justify-content: center;
      align-items: center;
      background-color: #7FCBFE;
      width: 30px;
      height: 30px;
      color: #fff;
      margin-left: 5px;
    }
  }
  .opera-btn {
    img {
      width: 30px;
      height: 30px;
      cursor: pointer;
      &:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
}
.look-wrapper {
  width: 100%;
  max-height: 600px;
  overflow: auto;
  text-align: center;
}
.look-wrapper img {
  min-width: 200px;
  max-width: 500px;
}
</style>
