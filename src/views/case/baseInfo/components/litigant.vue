<template>
  <div class="litigant-wrapper">
    <header1 :title="'当事人信息'" :is-add="true" @add="add" />
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
        prop="caseStatus"
        label="案件地位"
      />
      <el-table-column
        prop="litigantType"
        label="当事人类型"
      />
      <el-table-column
        prop="name"
        label="姓名或单位名称"
      />
      <el-table-column
        prop="phone"
        label="联系电话"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <div class="opera-btn">
            <img src="@/assets/img/edit.png" @click="edit(scope.row.id, scope.row.type, scope.row.litigantId)">
            <img v-permission="[1,2,4,6]" src="@/assets/img/del.png" @click="del(scope.row.id, scope.row.type)">
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
      <el-form v-show="isAdd" ref="form" :model="form" label-width="150px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="案件地位">
              <el-select v-model="caseStatus" placeholder="请选择">
                <el-option
                  v-for="item in caseStatusData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <litigantForm v-if="caseStatus == 1 || caseStatus == 2" ref="litigantForm" :case-status="caseStatus" :litigant-id="litigantId" @saveSuccess="saveSuccess" />
      <agentForm v-if="caseStatus == 3" ref="agentForm" :lawyer-id="litigantId" :law-parent-id="lawParentId" @saveSuccess="saveSuccess" />
      <span slot="footer" v-permission="[1,2,4,6]" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span></el-dialog>
  </div>
</template>

<script>
import header1 from './header'
import { mapGetters } from 'vuex'
import { AGENTTYPEMAP } from '@/utils/constVal.js'
import litigantForm from './litigantForm.vue'
import agentForm from './agentForm.vue'
import { deleteLitigant, delLawyer } from '@/api/case/index'
export default {
  components: {
    header1,
    litigantForm,
    agentForm
  },
  props: {

  },
  data() {
    return {
      tableData: [],
      lawCaseData: {},
      dialogVisible: false,
      dialogTitle: '添加当事人',
      form: {},
      caseStatusData: [
        {
          value: '1',
          label: '申请人'
        },
        {
          value: '2',
          label: '被申请人'
        },
        {
          value: '3',
          label: '代理人'
        }
      ],
      caseStatus: null,
      litigantId: null,
      isAdd: true, // 是否是添加
      lawParentId: null,
      process: null,
      role: this.$store.state.user.userRole
    }
  },
  computed: {
    ...mapGetters(['getCaseInfo'])
  },
  watch: {
    getCaseInfo() {
      this.init()
    }
  },
  created() {
    console.log(this.$store.state.cases.caseInfo)
  },
  mounted() {

  },
  methods: {
    init() {
      this.tableData = []
      this.lawCaseData = JSON.parse(JSON.stringify(this.getCaseInfo))
      this.process = this.lawCaseData.process
      this.lawCaseData.litigants.forEach((item, index) => {
        const obj = {
          caseStatus: item.litigationStatus.name,
          litigantType: item.identityType == 1 ? '自然人' : '法人',
          name: item.litigantName,
          phone: item.litigantPhone,
          address: item.address,
          id: item.id,
          type: 1
        }
        if (item.lawyer && item.lawyer.length >= 0) {
          item.lawyer.forEach(item1 => {
            if (item1.enable) {
              const obj = {
                caseStatus: '代理人',
                litigantType: AGENTTYPEMAP[item1.agentType],
                name: item1.agentName,
                phone: item1.agentMobile,
                address: item1.address,
                id: item1.id,
                type: 2,
                litigantId: item.id
              }
              this.tableData.push(obj)
            }
          })
        }
        this.tableData.push(obj)
      })
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false
    },
    // 添加
    add() {
      this.dialogVisible = true
      this.litigantId = null
      this.caseStatus = null
      this.dialogTitle = '添加当事人'
      this.isAdd = true
      this.lawParentId = null
    },
    // 提交事件
    submit() {
      if (this.caseStatus == 3) {
        this.$refs.agentForm.save()
      } else {
        this.$refs.litigantForm.save()
      }
    },
    // 保存成功
    saveSuccess() {
      this.dialogVisible = false
      this.$store.dispatch('GetCaseInfo')
    },
    // 删除当事人
    del(id, type) {
      this.$confirm('是否确认删除')
        .then(_ => {
          if (type === 1) { // 为申请人和被申请人
            this.$Message.loading({
              content: '正在删除，请稍后...',
              duration: 0
            })
            deleteLitigant({ litigantId: id }).then(res => {
              this.$Message.destroy()
              if (res.state === 100) {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: 'success'
                })
                this.$store.dispatch('GetCaseInfo')
              }
            })
          } else { // 为代理人
            this.$Message.loading({
              content: '正在删除，请稍后...',
              duration: 0
            })
            delLawyer({ lawyerId: id }).then(res => {
              this.$Message.destroy()
              if (res.state === 100) {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: 'success'
                })
                this.$store.dispatch('GetCaseInfo')
              }
            })
          }
        })
        .catch(_ => {})
    },
    // 编辑当事人
    edit(id, type, lawParentId) {
      if (type == 1) { // 当事人
        this.litigantId = id
        this.caseStatus = '1'
        this.dialogVisible = true
        this.dialogTitle = '修改当事人'
        this.isAdd = false
      } else {
        this.litigantId = id
        this.caseStatus = '3'
        this.dialogVisible = true
        this.dialogTitle = '修改代理人'
        this.isAdd = false
        this.lawParentId = lawParentId
      }
    }
  }
}
</script>

<style scoped lang="scss">
.litigant-wrapper {
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
::v-deep .el-select {
  width: 100%;
}
</style>
