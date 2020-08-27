// 授权委托书
<template>
  <div style="padding:20px">
    <div>
      <div v-show="editFlag" class="operation">
        <p style="background:rgb(36,117,252)" @click="setForm('add')">+</p>
        <p style="background:rgb(254,197,3)" @click="setForm('del')">-</p>
      </div>
      <legalPersonForm
        :form-data="data"
        :edit-flag="editFlag"
      />
      <appliationForm
        :form-data="data"
        :index="0"
        :type="'respondentInfo'"
        :none-btn="true"
        :edit-flag="editFlag"
      />
      <!-- <appliationForm
                    :formData="data"
                    :index='0'
                    :type="'respondentInfo'"
                    :noneBtn="true"
                    :editFlag="editFlag">
            </appliationForm> -->
      <div class="about">
        <p class="about-title">纠纷简要情况：</p>
        <div class="situation">
          现委托
          <span v-show="!editFlag" style="color:blue">{{ mediator ? mediator : 'XXX' }}</span>
          <el-input v-show="editFlag" v-model="mediator" style="width:100px;height:30px" placeholder="请输入" size="small" clearable />
          在我单位与
          <span v-show="!editFlag" style="color:blue">{{ mediator ? mediator : 'XXX' }}</span>
          <el-input v-show="editFlag" v-model="mediator" style="width:100px;height:30px" placeholder="请输入" size="small" clearable />
          的纠纷中，作为我单位的委托代理人参加人民解纷，委托权限如下：
        </div>
      </div>
      <div class="check-box">
        <el-checkbox-group v-model="checkList">
          <div><el-checkbox :disabled="!editFlag" label="代为申请解纷或者要求终止解纷" /></div>
          <div><el-checkbox :disabled="!editFlag" label="代为收集、提供证据" /></div>
          <div><el-checkbox :disabled="!editFlag" label="代为选择或者接受人民解纷员" /></div>
          <div><el-checkbox :disabled="!editFlag" label="代为承认、变更和放弃解纷请求" /></div>
          <div><el-checkbox :disabled="!editFlag" label="代为参加解纷，签署调查记录、解纷记录、权利义务告知书、人民解纷协议书等法律文书" /></div>
          <div><el-checkbox :disabled="!editFlag" label="代为领取相关法律文书等" /></div>
          <div><el-checkbox :disabled="!editFlag" label="其他委托事项：" /></div>
        </el-checkbox-group>
      </div>
      <div v-show="isOther(checkList)" class="about">
        <div v-show="!editFlag" class="situation">{{ briefSituation }}</div>
        <el-input
          v-show="editFlag"
          v-model="briefSituation"
          class="situation"
          type="textarea"
          autosize
          placeholder="请输入内容"
        />
      </div>
    </div>
  </div>
</template>

<script>
import appliationForm from '@/components/mediationDossier/appliationForm'// 个人表单
import legalPersonForm from '@/components/mediationDossier/legalPersonForm'// 法人表单
export default {
  name: 'AgentBook',
  components: {
    appliationForm,
    legalPersonForm
  },
  props: ['showAction', 'coverData', 'ceshi', 'editFlag'],
  data() {
    return {
      list: [],
      data: { lawyer: [], litigantName: '', nation: '', sex: '', years: '', identityCard: '', phone: '', address: '', employer: '', type: 0 },
      mediator: '',
      checkList: [],
      briefSituation: ''
    }
  },
  methods: {
    // 初始化
    init() {
      this.applicantInfo = [{ lawyer: [], litigantName: '', nation: '', sex: '', years: '', identityCard: '', phone: '', address: '', employer: '', type: 0 }]
      this.respondentInfo = [{ lawyer: [], litigantName: '', nation: '', sex: '', years: '', identityCard: '', phone: '', address: '', employer: '', type: 0 }]
      this.mediator = ''
      this.briefSituation = ''
      return new Promise((resolve, reject) => {
        if (this.coverData.caseId) {
          resolve(true)
        } else {
          resolve(true)
        }
      })
    },
    //
    isOther(checkList) {
      return checkList.indexOf('其他委托事项：') != -1
    }
  }
}
</script>

<style lang="scss" scoped>
    .operation {
        position: relative;
        display: flex;
        margin-bottom: 24px;
    }
    .operation p{
        margin-right: 25px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 30px;
        color: #fff;
        cursor: pointer;
    }
    .about {
        margin-top: 31px;
        .about-title {
            margin-bottom: 25px;
        }
        .situation {
            padding: 20px 40px;
            line-height: 45px;
            background:rgba(250,250,250,1);
            border:1px solid rgba(240,241,242,1);
        }
        ::v-deep .situation .el-textarea__inner,
        ::v-deep .el-input__inner {
            background: rgba(250,250,250,1);
        }
    }
    ::v-deep .check-box {
        div {
            margin: 10px 0;
            .el-checkbox {
                display: flex;
                width: 100%;
                .el-checkbox__input {
                    padding-top: 3px;
                }
                .el-checkbox__label {
                    width: 100%;
                    white-space:normal;
                }
            }
        }
    }
</style>
