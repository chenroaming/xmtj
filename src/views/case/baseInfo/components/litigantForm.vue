<template>
  <el-form id="form1" ref="form" :model="form" label-width="150px">
    <el-row>
      <el-col :span="20">
        <el-form-item label="申请人类型" prop="identityType" :rules="[{ required: true, message: '请选择申请人类型', trigger: 'blur' }]">
          <el-select v-model="form.identityType" placeholder="请选择" @change="selectType">
            <el-option
              v-for="item in identypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 自然人 -->
    <div v-if="form.identityType == 1">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
            <el-input v-model="form.name" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="民族">
            <el-input v-model="form.nation" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="年龄">
            <el-input v-model="form.age" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 为申请人时身份证号必填 -->
      <el-row v-if="caseStatus == 1">
        <el-col :span="20">
          <el-form-item label="证件号码" prop="identityCard" :rules="[{ required: true, message: '请输入证件号码', trigger: 'blur' },{ required: true, trigger: 'blur', validator: validateIDCard }]">
            <el-input v-model="form.identityCard" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 为被申请人的时候身份证号不是必填的 -->
      <el-row v-if="caseStatus == 2">
        <el-col :span="20">
          <el-form-item label="证件号码" prop="identityCard">
            <el-input v-model="form.identityCard" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item
            label="手机号码"
            prop="litigantPhone"
            :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{ required: true, trigger: 'blur', validator: validatePhone }]"
          >
            <el-input v-model="form.litigantPhone" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="住址" prop="address" :rules="[{ required: true, message: '请输入住址', trigger: 'blur' }]">
            <el-input v-model="form.address" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="工作单位或职务">
            <el-input v-model="form.employer" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <!-- 法人 -->
    <div v-if="form.identityType == 2">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="公司名" prop="name" :rules="[{ required: true, message: '请输入公司名', trigger: 'blur' }]">
            <el-input v-model="form.name" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="统一信用代码" prop="identityCard" :rules="[{ required: true, message: '请输入统一信用代码', trigger: 'blur' }]">
            <el-input v-model="form.identityCard" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="公司固定电话">
            <el-input v-model="form.litigantPhone" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="公司注册地址" prop="address" :rules="[{ required: true, message: '请输入公司注册地址', trigger: 'blur' }]">
            <el-input v-model="form.address" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="法定代表人姓名" prop="legalManName" :rules="[{ required: true, message: '请输入法定代表人姓名', trigger: 'blur' }]">
            <el-input v-model="form.legalManName" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 法人为申请人的时候需要验证手机号和身份证号 -->
      <el-row v-if="caseStatus == 1" :gutter="20">
        <el-col :span="20">
          <el-form-item label="法定代表人手机号" prop="legalManPhone" :rules="[{ required: true, message: '请输入法定代表人手机号', trigger: 'blur' },{ required: true, trigger: 'blur', validator: validatePhone }]">
            <el-input v-model="form.legalManPhone" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="caseStatus == 1" :gutter="20">
        <el-col :span="20">
          <el-form-item label="法定代表人身份证" prop="legalManId" :rules="[{ required: true, message: '请输入法定代表人身份证', trigger: 'blur' },{ required: true, trigger: 'blur', validator: validateIDCard }]">
            <el-input v-model="form.legalManId" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 法人为被申请人的时候不需要验证手机号和身份证号 -->
      <el-row v-if="caseStatus == 2" :gutter="20">
        <el-col :span="20">
          <el-form-item label="法定代表人手机号" prop="legalManPhone">
            <el-input v-model="form.legalManPhone" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="caseStatus == 2" :gutter="20">
        <el-col :span="20">
          <el-form-item label="法定代表人身份证" prop="legalManId">
            <el-input v-model="form.legalManId" type="text" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <el-row v-if="form.identityType == 1">
      <el-col :span="20">
        <el-form-item label="身份证正面照片">
          <uploadFile
            ref="frontImage"
            img-type="frontImage"
            :is-upload="form.frontImage"
            @getUrl="getUrl"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="form.identityType == 1">
      <el-col :span="20">
        <el-form-item label="身份证反面照片">
          <uploadFile
            ref="backImage"
            img-type="backImage"
            :is-upload="form.backImage"
            @getUrl="getUrl"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="form.identityType == 2">
      <el-col :span="20">
        <el-form-item label="公司营业执照">
          <uploadFile
            ref="companyImage"
            img-type="companyImage"
            :is-upload="form.companyImage"
            @getUrl="getUrl"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { IDENTITYMAP, SERVICEURL } from '@/utils/constVal.js'
import { validPhone, validIDCard } from '@/utils/validate'
import { addLitigant, selectLitigant, editLitigant, addCompanyLit, editCompanyLit, uploadImg } from '@/api/case/index.js'
import { mapGetters } from 'vuex'
import uploadFile from '@/components/addCase/uploadFile'
export default {
  components: {
    uploadFile
  },
  props: {
    litigantId: {
      type: String,
      default: null
    },
    // 案件地位
    caseStatus: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      identypeData: [],
      form: {
        identityType: 1
      },
      sexOptions: [
        {
          value: 0,
          label: '男'
        },
        {
          value: 1,
          label: '女'
        }
      ],
      fileList: []
    }
  },
  computed: {
    ...mapGetters(['getCaseInfo'])
  },
  watch: {
    litigantId() {
      this.getLitigantDetail()
    },
    caseStatus() {
    }
  },
  created() {
    this.getIdentypeData()
    this.getLitigantDetail()
  },
  mounted() {

  },
  methods: {
    // 验证身份证号
    validateIDCard(rule, value, callback) {
      if (!validIDCard(value)) {
        callback(new Error('身份证格式不正确'))
      } else {
        callback()
      }
    },
    // 验证手机号
    validatePhone(rule, value, callback) {
      if (!validPhone(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    },
    getUrl(e, imgType) {
      if (imgType === 'frontImage') {
        this.form.frontImage = e
      } else if (imgType === 'backImage') {
        this.form.backImage = e
      } else if (imgType === 'companyImage') {
        this.form.companyImage = e
      }
    },
    getIdentypeData() {
      for (const key in IDENTITYMAP) {
        this.identypeData.push({
          value: parseInt(key),
          label: IDENTITYMAP[key]
        })
      }
    },
    // 保存
    save() {
      const params = JSON.parse(JSON.stringify(this.form))
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.litigantId) { // 假如没有当事人id为添加事件
            params.lawCaseId = this.getCaseInfo.id
            params.litigationStatus = this.caseStatus == 1 ? 4 : 5
            if (params.identityType == 1) { // 自然人
              if (this.fileList && this.fileList.length > 0) {
                params.frontImage = this.fileList[0].url
                params.backImage = this.fileList[1].url
              }
              addLitigant(params).then(res => {
                if (res.state === 100) {
                  this.$message({
                    showClose: true,
                    message: res.message,
                    type: 'success'
                  })
                  this.$emit('saveSuccess')
                }
              })
            } else { // 法人
              if (this.fileList && this.fileList.length > 0) {
                params.companyImage = this.fileList[1].url
              }
              addCompanyLit(params).then(res => {
                if (res.state === 100) {
                  this.$message({
                    showClose: true,
                    message: res.message,
                    type: 'success'
                  })
                  this.$emit('saveSuccess')
                }
              })
            }
          } else {
            if (params.identityType == 1) { // 自然人
              console.log(this.fileList)
              if (this.fileList && this.fileList.length > 0) {
                params.frontImage = this.fileList[0].url || null
                params.backImage = this.fileList[1] ? this.fileList[1].url : null
              }
              editLitigant(params).then(res => {
                if (res.state === 100) {
                  this.$message({
                    showClose: true,
                    message: res.message,
                    type: 'success'
                  })
                  this.$emit('saveSuccess')
                }
              })
            } else {
              if (this.fileList && this.fileList.length > 0) {
                params.companyImage = this.fileList[0].url
              }
              editCompanyLit(params).then(res => {
                if (res.state === 100) {
                  this.$message({
                    showClose: true,
                    message: res.message,
                    type: 'success'
                  })
                  this.$emit('saveSuccess')
                }
              })
            }
          }
        } else {
          this.$message.error('请完善表单信息')
        }
      })
    },
    // 查询当事人详情
    getLitigantDetail() {
      if (!this.litigantId) {
        return
      }
      this.fileList = []
      selectLitigant({ litigantId: this.litigantId }).then(res => {
        if (res.state === 100) {
          const data = res.litigant
          if (data.identityType == 1) {
            this.form = {
              identityType: data.identityType,
              name: data.litigantName,
              nation: data.nation,
              sex: data.litigantSex,
              age: data.age,
              identityCard: data.identityCard,
              litigantPhone: data.litigantPhone,
              address: data.address,
              employer: data.employer,
              litigantId: this.litigantId,
              frontImage: data.frontImage,
              backImage: data.backImage
            }
            if (data.frontImage) {
              const url = data.frontImage.split('/')
              const obj = {
                name: url[url.length - 1],
                url: data.frontImage
              }
              this.fileList.push(obj)
            }
            if (data.backImage) {
              const url = data.backImage.split('/')
              const obj = {
                name: url[url.length - 1],
                url: data.backImage
              }
              this.fileList.push(obj)
            }
          } else {
            this.form = {
              identityType: data.identityType,
              name: data.litigantName,
              identityCard: data.identityCard,
              litigantPhone: data.litigantPhone,
              address: data.address,
              legalManName: data.legalManName,
              legalManPhone: data.legalManPhone,
              legalManId: data.legalManId,
              litigantId: this.litigantId
            }
            if (data.companyImage) {
              const url = data.companyImage.split('/')
              const obj = {
                name: url[url.length - 1],
                url: data.companyImage
              }
              this.fileList.push(obj)
            }
          }
        }
      })
    },
    // 选择类型
    selectType(index) {
      const items = document.getElementById('form1').querySelectorAll('.el-form-item')
      this.$nextTick(() => { // 清空留下来的验证的信息
        items.forEach(item => {
          item.classList.remove('is-error')
        })
        const paras = document.getElementsByClassName('el-form-item__error')
        paras.forEach(item => {
          if (item != null) {
            item.parentNode.removeChild(item)
          }
        })
        paras.forEach(item => {
          if (item != null) {
            item.parentNode.removeChild(item)
          }
        })
      })
      if (index == 1) {
        this.form.identityType = 1
      } else {
        this.form.identityType = 2
      }
    },
    // 预览
    handlePreview(e) {
      this.visible = true
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
        message: `文件最多不能超过${this.form.identityType == 1 ? 2 : 1}个`,
        type: 'error'
      })
    },
    // 自定义上传事件
    uploadSectionFile(e, index) {
      console.log(e)
      console.log(index)
      const action = e.action
      var fileObj = e.file
      var form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      this.$Message.loading({
        content: '正在上传，请稍后...',
        duration: 0
      })
      uploadImg(form).then(res => {
        this.$Message.destroy()
        if (res.state === 100) {
          const url = res.url.split('/')
          const obj = {
            name: url[url.length - 1],
            url: res.url
          }
          if (action == 1) { // 自然人身份证正面照片
            this.frontImage = []
            this.frontImage.push(obj)
          } else if (action == 2) { // 自然人身份证反面照片
            this.backImage = []
            this.backImage.push(obj)
          }
          console.log(this.frontImage)
          console.log(this.backImage)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
