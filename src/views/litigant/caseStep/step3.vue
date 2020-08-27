<template>
  <div style="width: 100%;">
    <el-row :gutter="20">
      <el-col :span="8">
        <litigantItem
          :litigation-status.sync="form.litigationStatus"
          :applicant="applicant"
          :respondent="respondent"
          @add="Change"
          @edit="edit"
          @done="getLitigant"
        />
      </el-col>
      <el-col :span="16">
        <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="150px">
          <el-row>
            <el-form-item :label="form.litigationStatus === 5 ? '被申请人类型' : '申请人类型'" style="width: 100%;" prop="identityType">
              <el-select v-model="form.identityType" style="width: 100%;" placeholder="请选择" @change="clear">
                <el-option
                  v-for="item in typeArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="name" label="姓名或单位名称">
                <el-input v-model="form.name" placeholder="请输入姓名或单位名称" style="width: 100%;" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="litigantPhone" label="联系电话">
                <el-input v-model="form.litigantPhone" placeholder="请输入号码" style="width: 100%;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            :prop="changeAddType ? 'identityCard2' : 'identityCard'"
            :label="changeLabel"
            style="width: 100%;"
          >
            <el-input v-model="form.identityCard" placeholder="请输入证件号码" style="width: 100%;" />
          </el-form-item>
          <el-form-item
            v-show="!changeIdentityType"
            :prop="!changeAddType && !changeIdentityType ? 'legalManId' : 'legalManId2'"
            label="法人身份证号"
            style="width: 100%;"
          >
            <el-input v-model="form.legalManId" placeholder="请输入证件号码" style="width: 100%;" />
          </el-form-item>
          <el-row v-show="changeIdentityType">
            <el-col :span="8">
              <el-form-item prop="sex" label="性别">
                <el-select v-model="form.sex" style="width: 100%;" placeholder="请选择">
                  <el-option
                    v-for="item in sexArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="age" label="年龄">
                <el-input v-model="form.age" placeholder="请输入年龄" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="nation" label="民族">
                <el-input v-model="form.nation" placeholder="请输入民族" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="address" :label="changeAdLabel" style="width: 100%;">
            <el-input v-model="form.address" placeholder="请输入地址" />
          </el-form-item>
          <el-form-item prop="employer" :label="changeEmLabel" style="width: 100%;">
            <el-input v-model="form.employer" placeholder="请输入工作或职务" />
          </el-form-item>
          <el-row v-show="!changeIdentityType">
            <el-col :span="9">
              <el-form-item prop="legalManName" label="法定代表人姓名" style="width: 100%;">
                <el-input v-model="form.legalManName" placeholder="法定代表人姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item
                :prop="!changeAddType && !changeIdentityType ? 'legalManPhone' : 'legalManPhone2'"
                label="法定代表人手机号码"
                style="width: 100%;"
              >
                <el-input v-model="form.legalManPhone" placeholder="请输入法定代表人手机号码" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="changeIdentityType">
            <el-col :span="12">
              <el-form-item label="身份证正面上传" prop="frontImage">
                <uploadFile
                  ref="frontImage"
                  img-type="frontImage"
                  :is-upload="form.frontImage"
                  @getUrl="getUrl"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证背面上传" prop="backImage">
                <uploadFile
                  ref="backImage"
                  img-type="backImage"
                  :is-upload="form.backImage"
                  @getUrl="getUrl"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="!changeIdentityType">
            <el-col :span="12">
              <el-form-item label="营业执照上传" prop="companyImage">
                <uploadFile
                  ref="companyImage"
                  img-type="companyImage"
                  :is-upload="form.companyImage"
                  @getUrl="getUrl"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align: right;">
            <el-button v-show="!isChange" type="success" :loading="isLoading" @click="submit">保存</el-button>
            <el-button v-show="isChange" type="warning" :loading="isLoading" @click="handleChange">修改</el-button>
            <el-button type="primary" @click="next('before')">上一步</el-button>
            <el-button type="primary" @click="next('next')">下一步</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import litigantItem from '@/components/addCase/litigantItem'
import uploadFile from '@/components/addCase/uploadFile'
import rules from '@/utils/rules'
import { addLitigant, detailsCase, editLitigant, addCompanyLit } from '@/api/litigant/litigant'
export default {
  name: 'Step3',
  components: {
    litigantItem, uploadFile
  },
  mixins: [rules],
  data() {
    return {
      isLoading: false,
      typeArr: [{ value: 1, label: '自然人' }, { value: 2, label: '法人' }],
      sexArr: [{ value: 0, label: '男' }, { value: 1, label: '女' }],
      form: {
        lawCaseId: '',
        name: '',
        identityType: '',
        litigantPhone: '', // 自然人电话
        litigantTelPhone: '', // 法人公司电话
        identityCard: '',
        sex: '',
        age: '',
        nation: '',
        address: '',
        employer: '',
        frontImage: '',
        backImage: '',
        litigationStatus: 4,
        legalManName: '', // 法人代表人姓名
        legalManPhone: '', // 法人公司电话
        legalManId: '', // 法定代表人身份证号码
        companyImage: '' // 公司营业执照
      },
      fileList: [],
      applicant: [],
      respondent: [],
      isChange: false
    }
  },
  computed: {
    changeLabel() {
      return this.form.identityType === 1 ? '身份证号码' : '统一信用代码'
    },
    changeAdLabel() {
      return this.form.identityType === 1 ? '地址' : '公司注册地址'
    },
    changeEmLabel() {
      return this.form.identityType === 1 ? '工作单位或职务' : '公司经营地址'
    },
    changeAddType() {
      return this.form.litigationStatus === 5
    },
    changeIdentityType() {
      return this.form.identityType === 1
    }
  },
  mounted() {
    this.form.lawCaseId = this.$store.getters.getLawCaseId || window.localStorage.getItem('lawCaseId')
    this.$emit('update:step', 1)
    this.getLitigant()
  },
  methods: {
    getUrl(e, imgType) {
      if (imgType === 'frontImage') {
        this.form.frontImage = e
      } else if (imgType === 'backImage') {
        this.form.backImage = e
      } else if (imgType === 'companyImage') {
        this.form.companyImage = e
      }
    },
    next(word) {
      if (word === 'next') {
        if (this.applicant.length > 0 && this.respondent.length > 0) {
          this.$router.push({ name: 'step4' })
          return true
        }
        this.$message.warning('请添加申请人和被申请人！')
      } else {
        if (this.$store.state.user.userRole == 3) {
          this.$router.push({ name: 'step1' })
        } else {
          this.$router.push({ name: 'step' })
        }
      }
    },
    getLitigant() {
      const data = {
        lawCaseId: this.form.lawCaseId || window.localStorage.getItem('lawCaseId')
      }
      detailsCase(data).then(({ state, lawCase: { litigants }}) => {
        if (state === 100) {
          this.applicant = litigants.filter(item => item.litigationStatus.id === '4')
          this.respondent = litigants.filter(item => item.litigationStatus.id === '5')
        }
      })
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return false
        this.isLoading = true
        this.form.lawCaseId = window.localStorage.getItem('lawCaseId')
        if (this.changeIdentityType) {
          addLitigant(this.form).then(({ state, message }) => { // 添加自然人
            if (state === 100) {
              this.$message.success(message)
              this.getLitigant()
              this.clear()
            }
          }).finally(() => {
            this.isLoading = false
          })
        } else {
          addCompanyLit(this.form).then(({ state, message }) => { // 添加法人
            if (state === 100) {
              this.$message.success(message)
              this.getLitigant()
              this.clear()
            }
          }).finally(() => {
            this.isLoading = false
          })
        }
      })
    },
    handleChange() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return false
        this.isLoading = true
        editLitigant(this.form).then(({ state, message }) => {
          state === 100 && this.$message.success(message) && this.getLitigant()
        }).finally(() => {
          this.isLoading = false
        })
      })
    },
    Change() {
      this.isChange = false
      this.clear()
    },
    edit(item) {
      this.clear()
      this.isChange = true
      this.form = {
        ...item,
        litigantId: item.id,
        name: item.litigantName,
        litigationStatus: Number(item.litigationStatus.id),
        sex: item.litigantSex
      }
    },
    clear() {
      this.$refs['form'].resetFields()
      this.$refs.frontImage.clearFiles() && this.$refs.backImage.clearFiles() && this.$refs.companyImage.clearFiles()
      this.form.identityType = e
      this.form.identityCard = ''
      this.form.legalManId = ''
      this.form.legalManPhone = ''
    }
  }
}
</script>
<style lang = "scss">
  .el-form-item {
    margin-bottom: 18px;
  }
</style>
<style scoped lang = "scss">

</style>
