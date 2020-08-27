<template>
  <div class="add-case-wrapper">
    <div class="evidence-wrapper">
      <el-button type="primary" @click="addEvi">新增证据</el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>
    </div>
    <div class="btn-wrapper">
      <el-button @click="next(2)">上一步</el-button>
      <el-button type="primary" @click="save()">保存</el-button>
    </div>
    <el-dialog
      title="新增证据"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="提供者" required>
          <el-select v-model="form.light" placeholder="请选择">
            <el-option
              v-for="item in selectData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="证据名称" prop="name" required>
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="提供时间" prop="time" required>
          <el-date-picker
            v-model="form.time"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="附件" required>
          <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple
            :http-request="uploadSectionFile"
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      dialogVisible: false,
      form: {},
      fileList: [], // 上传的文件
      selectData: [],
      rules: {
        name: [
          { required: true, message: '请输入证据名称', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择提供时间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    next(index) {
      this.$emit('next', index)
    },
    // 关闭模态框
    handleClose() {
      this.dialogVisible = false
    },
    // 添加证据
    addEvi() {
      this.dialogVisible = true
    },
    // 预览文件
    handlePreview() {
    },
    // 移除文件
    handleRemove() {

    },
    // 超出个数后触发
    handleExceed() {

    },
    // 自定义上传事件
    uploadSectionFile(e) {
      // console.log(e)
      // this.fileList = []
      // var fileObj = e.file
      // var form = new FormData()
      // // 文件对象
      // form.append('file', fileObj)
      // uploadMediateFiles(form).then(res => {
      //   if (res.state === 100) {
      //     const obj = {
      //       name: res.name,
      //       url: res.url
      //     }
      //     this.fileList.push(obj)
      //   }
      // })
    },
    // 保存
    save() {

    }
  }
}
</script>

<style scoped lang="scss">
.evidence-wrapper {
  width: 100%;
  text-align: center;
 ::v-deep.el-table th > .cell {
    text-align: center;
	}
	::v-deep.el-table .cell {
    text-align: center;
	}
}
::v-deep .el-dialog__body {
  padding: 30px 50px;
}
::v-deep .el-select {
  width: 100%;
}
</style>
