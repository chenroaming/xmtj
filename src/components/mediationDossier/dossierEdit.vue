<template>
  <div>
    <div class="title">
      <span>卷宗封面</span>
      <span v-if="myResultTypeFlag">
        <el-button v-show="!editCoverFlag" type="primary" class="edit" @click="setEdit">编辑</el-button>
        <el-button v-show="editCoverFlag" type="primary" class="save" @click="saveEdit">保存</el-button>
      </span>
    </div>
    <el-row class="form cover" type="flex">
      <el-col :span="24">
        <el-row type="flex">
          <el-col :span="6">
            <div class="item-title">卷号</div>
          </el-col>
          <el-col :span="18">
            <div v-show="!editCoverFlag" class="item-data">{{ coverData.archiveNo }}</div>
            <div v-show="editCoverFlag" class="item-data">
              <!-- <el-input v-model="tempCoverData.archiveNo" placeholder="请输入内容"></el-input> -->
              <el-select
                v-model="tempCoverData.archiveNo"
                style="width:100%"
                filterable
                remote
                reserve-keyword
                placeholder="卷号"
                :remote-method="getArchiveNoList"
              >
                <el-option
                  v-for="(item,index) in archiveNoList"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <div class="item-title">卷宗类型</div>
          </el-col>
          <el-col :span="18">
            <div v-show="!editCoverFlag" class="item-data">{{ coverData.type }}</div>
            <div v-show="editCoverFlag" class="item-data">
              <el-select v-model="tempCoverData.type" style="width:100%" placeholder="宗卷类型">
                <el-option
                  v-for="(item,index) in dossierTypeAry"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <div class="item-title">立卷人</div>
          </el-col>
          <el-col :span="18">
            <div class="item-data">{{ coverData.creatName }}</div>
            <!-- <div class="item-data" v-show='editCoverFlag'>
                            <el-input v-model="tempCoverData.creatName" placeholder="请输入内容"></el-input>
                        </div> -->
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <div class="item-title">卷名</div>
          </el-col>
          <el-col :span="18">
            <div v-show="!editCoverFlag" class="item-data">{{ coverData.name }}</div>
            <div v-show="editCoverFlag" class="item-data">
              <el-input v-model="tempCoverData.name" placeholder="请输入内容" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item-title">人民解纷员</div>
          </el-col>
          <el-col :span="18">
            <div class="item-data">{{ coverData.mediater }}</div>
            <!-- <div class="item-data" v-show='editCoverFlag'>
                            <el-input v-model="tempCoverData.name" placeholder="请输入内容"></el-input>
                        </div> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item-title">立卷日期</div>
          </el-col>
          <el-col :span="18">
            <div class="item-data">{{ coverData.createDate }}</div>
            <!-- <div class="item-data" v-show='editCoverFlag'>
                            <el-date-picker class="item-data"
                                v-model="tempCoverData.createDate"
                                value-format='yyyy-MM-dd'
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div> -->
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <div class="item-title">年度</div>
          </el-col>
          <el-col :span="18">
            <div v-show="!editCoverFlag" class="item-data">{{ coverData.year }}</div>
            <div v-show="editCoverFlag" class="item-data">
              <el-input v-model="tempCoverData.year" placeholder="请输入内容" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item-title">解纷日期</div>
          </el-col>
          <el-col :span="18">
            <div class="item-data">{{ coverData.mediateTerm }}</div>
            <!-- <div class="item-data" v-show='editCoverFlag'>
                            <el-date-picker class="item-data"
                                v-model="tempCoverData.mediateTerm"
                                value-format='yyyy-MM-dd'
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item-title">保管期限</div>
          </el-col>
          <el-col :span="18">
            <div v-show="!editCoverFlag" class="item-data">{{ coverData.depositTerm }}</div>
            <div v-show="editCoverFlag" class="item-data">
              <el-input v-model="tempCoverData.depositTerm" placeholder="请输入内容" />
            </div>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <div class="item-title">备注</div>
          </el-col>
          <el-col :span="18">
            <!-- <el-tooltip class="item-textarea" v-show='!editCoverFlag' effect="dark" :content="coverData.remain" placement="left-start"> -->
            <div v-show="!editCoverFlag" class="item-data" style="padding:5px 15px">{{ coverData.remain }}</div>
            <!-- </el-tooltip> -->
            <div v-show="editCoverFlag" class="item-title">
              <el-input
                v-model="tempCoverData.remain"
                type="textarea"
                placeholder="请输入内容"
              />
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!-- <el-col :span="2" class="remark">
                <div class="item-title">备注</div>
                <el-tooltip class="item-textarea" v-show='!editCoverFlag' effect="dark" :content="coverData.remain" placement="left-start">
                    <div>{{coverData.remain}}</div>
                </el-tooltip>
                <div class="item-title" v-show='editCoverFlag'>
                    <el-input
                        type="textarea"
                        :autosize="{maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="tempCoverData.remain">
                    </el-input>
                </div>
            </el-col> -->
    </el-row>
    <div class="title" style="line-height:66px">卷宗目录</div>
    <el-row type="flex" style="justify-content: space-between;">
      <!-- 左侧目录 -->
      <el-col class="menu" :span="4">
        <el-row
          v-for="(item,index) in menuList"
          :key="index"
          type="flex"
          class="menu-item"
          :class="{'action' : showAction == item.type}"
          @click.native="setAction(item.type,item.id)"
        >
          <el-col :span="2" />
          <el-col class="menu-title" :span="20">
            <div>{{ item.name }}</div>
          </el-col>
          <el-col class="menu-val" :span="2">
            <div v-if="item.val">{{ item.val }}</div>
          </el-col>
        </el-row>
      </el-col>
      <!-- 中间内容 -->
      <el-col v-loading="loading" class="view-action" :span="19">
        <div class="img-box">
          <!-- <el-tooltip effect="dark" content="通知" placement="top" :hide-after='1500'>
                        <img v-show="!editFlag  && [13].indexOf(showAction) == -1" src="@/assets/icon/tongzhi.png" alt="">
                    </el-tooltip> -->
          <el-tooltip effect="dark" content="删除文书" placement="top" :hide-after="1500">
            <img v-show="!editFlag && [13,16].indexOf(showAction) == -1 && myResultTypeFlag" src="@/assets/icon/del.png" alt="" @click="del">
          </el-tooltip>
          <el-tooltip effect="dark" content="下载文书" placement="top" :hide-after="1500">
            <img v-show="onceDataFlag && !editFlag && [13,16].indexOf(showAction) == -1 && myResultTypeFlag" src="@/assets/icon/down.png" alt="" @click="downBook">
          </el-tooltip>
          <el-tooltip effect="dark" content="新增文书" placement="top" :hide-after="1500">
            <img v-show="isShowAdd && !editFlag && myResultTypeFlag" src="@/assets/icon/edit.png" alt="" @click="editData">
          </el-tooltip>
          <el-tooltip effect="dark" :content="showAction==13 ? '上传文书(仅支持PDF文件)':'生成文书'" placement="top" :hide-after="1500">
            <img v-show="(isShowAdd && editFlag) || ([5,6].indexOf(showAction) != -1 && myResultTypeFlag) || (showAction == 13 && $store.state.user.userInfo.roleType == 4)" src="@/assets/icon/save.png" alt="" @click="createBook">
          </el-tooltip>
          <el-tooltip effect="dark" content="返回" placement="top" :hide-after="1500">
            <img v-show="editFlag" src="@/assets/icon/cancel.png" alt="" @click="backEdit">
          </el-tooltip>
        </div>
        <div class="view-action-btn">
          <!-- <el-button @click.native="backEdit" v-show='editFlag' icon="el-icon-arrow-left" circle></el-button> -->
          <!-- <el-button
                            @click.native="editData"
                            v-show='isShowAdd && !editFlag'
                            type="primary">
                        新增文书
                    </el-button>
                    <el-button
                            @click.native="createBook"
                            v-show='isShowAdd && editFlag'
                            type="primary">
                        生成文书
                    </el-button> -->
        </div>
        <!-- <cardSub ref='cardSub1' v-show="showAction == 16" :showAction='showAction' :coverData='coverData' :editFlag="editFlag"></cardSub>
                <agentBook ref='agentBook' v-show="showAction == 5" :showAction='showAction' :coverData='coverData' :editFlag="editFlag"></agentBook>
                <cardSub ref='cardSub2' v-show="showAction == null" :showAction='showAction' :coverData='coverData' :editFlag="editFlag"></cardSub>
                <mediationRecord ref='mediationRecord1' v-show="showAction == 7" :showAction='showAction' :coverData='coverData' :editFlag="editFlag"></mediationRecord>
                <billOfMaterials ref='billOfMaterials' v-show="showAction == 8" :showAction='showAction' :coverData='coverData' :editFlag="editFlag"></billOfMaterials>
                <mediationRecord ref='mediationRecord2' v-show="showAction == 9" :showAction='showAction' :coverData='coverData' :editFlag="editFlag"></mediationRecord>
                <returnVisit ref='returnVisit' v-show="showAction == 11" :showAction='showAction' :coverData='coverData' :editFlag="editFlag"></returnVisit>
                <judicialBook ref='judicialBook' v-show="showAction == 12" :showAction='showAction' :coverData='coverData' :editFlag="editFlag"></judicialBook> -->
        <input ref="file" type="file" style="display:none;" @change="getFile($event)">
        <bookTable v-show="!editFlag " ref="bookTable" :show-action="showAction" :cover-data="coverData" :edit-flag="editFlag" @isOnce="isOnce" />
        <!-- && showAction != 13 -->
        <div v-show="editFlag">
          <application v-show="showAction == 3" ref="application1" :show-action="actionData" :cover-data="coverData" :edit-flag="editFlag" />
          <registerForm v-show="showAction == 4" ref="registerForm" :show-action="actionData" :cover-data="coverData" :edit-flag="editFlag" />
          <mediationRecord v-show="showAction == 7" ref="mediationRecord1" :show-action="actionData" :cover-data="coverData" :edit-flag="editFlag" />
          <mediationRecord v-show="showAction == 9" ref="mediationRecord2" :show-action="actionData" :cover-data="coverData" :edit-flag="editFlag" />
          <agreement v-show="showAction == 10" ref="agreement" :show-action="actionData" :cover-data="coverData" :edit-flag="editFlag" />
          <returnVisit v-show="showAction == 11" ref="returnVisit" :show-action="actionData" :cover-data="coverData" :edit-flag="editFlag" />
          <judicialBook v-show="showAction == 12" ref="judicialBook" :show-action="actionData" :cover-data="coverData" :edit-flag="editFlag" />
          <situationDescription v-show="showAction == 14" ref="situationDescription" :show-action="actionData" :cover-data="coverData" :edit-flag="editFlag" />
        </div>
        <!-- <ruleBook ref='ruleBook' v-show="showAction == 13" :showAction='showAction' :coverData='coverData'></ruleBook> -->

      </el-col>
      <!-- 文书预览 -->
      <!-- <el-col class="view-action" :span="16" v-show="isShowBool && showAction != 13" v-loading="loading">
                <preview :bookUrl="bookUrl"></preview>
            </el-col> -->
      <!-- 右侧内容 -->
      <!-- <el-col class="operation" :span="3" v-show="!editFlag">
                <p class="operation-bule">
                    <span class=""></span>
                    <span>下载当前</span>
                </p>
                <p class="operation-yellow" @click="editData" v-show="!editFlag">
                    <span class=""></span>
                    <span>编辑</span>
                </p>
                <p class="operation-bule" @click="createBook" v-show="editFlag">
                    <span class=""></span>
                    <span>生成文书</span>
                </p>
                <p class="operation-yellow" @click="delBook" v-show="!editFlag">
                    <span class=""></span>
                    <span>删除选中</span>
                </p>
            </el-col> -->
      <!-- 裁定书 -->
      <!-- <el-col class="view-action" :span="19" v-show="showAction == 13" v-loading="loading">
                <ruleBook ref='ruleBook' v-show="showAction == 13" :showAction='showAction' :coverData='coverData'></ruleBook>
            </el-col> -->
    </el-row>
    <!-- <el-dialog title="文书预览" :visible.sync="isShowBool">
                <iframe :src="bookUrl"></iframe>
        </el-dialog> -->

  </div>
</template>

<script>
import {
  addMediateFile,
  createPetitionFile,
  //   listDirType,
  //   detailDirType,
  createRegisterFile,
  createEntrustFile,
  createNotifyFile,
  createExamineFile,
  createMediateRecord,
  createReturnVisit,
  createProtocolFile,
  createTableExplain,
  createJudicialFile,
  uploadCivilRuling,
  saveCivilRuling,
  listSqCaseNo,
  getTableByCaseId
} from '@/api/dossier/dossier.js'
import { formatDate } from '@/lib/date'
import application from '@/components/mediationDossier/application'// 申请人
import registerForm from '@/components/mediationDossier/registerForm'// 登记表
// import cardSub from '@/components/mediationDossier/cardSub'// 身份证明材料复印件
// import agentBook from '@/components/mediationDossier/agentBook'// 授权委托书
// import preview from '@/components/mediationDossier/preview'// 文书预览
import mediationRecord from '@/components/mediationDossier/mediationRecord'// 人民解纷调查记录
// import billOfMaterials from '@/components/mediationDossier/billOfMaterials'// 证据材料
import returnVisit from '@/components/mediationDossier/returnVisit'// 回访记录
import judicialBook from '@/components/mediationDossier/judicialBook'// 司法确认申请书
// import ruleBook from '@/components/mediationDossier/ruleBook'// 司法裁定书
import bookTable from '@/components/mediationDossier/bookTable'// 文书列表
import agreement from '@/components/mediationDossier/agreement'// 解纷协议书
import situationDescription from '@/components/mediationDossier/situationDescription'// 卷宗情况说明
export default {
  name: 'DossierEdit',
  components: {
    application,
    registerForm,
    // cardSub,
    // agentBook,
    // preview,
    mediationRecord,
    // billOfMaterials,
    returnVisit,
    judicialBook,
    // ruleBook,
    bookTable,
    agreement,
    situationDescription
  },
  props: ['showAction', 'menuList'],
  data() {
    return {
      archiveNoList: [],
      archiveNoList_type: [],
      onceDataFlag: false,
      bookUrl: '',
      loading: false,
      editCoverFlag: false, // 编辑封面
      editFlag: '', // 编辑内容
      actionData: {
        type: '',
        id: ''
      },
      coverData: {
        id: '',
        caseId: '',
        archiveNo: '',
        name: '',
        type: '',
        year: '',
        mediateTerm: '',
        passengerTransportation: '',
        createDate: '',
        creatName: '',
        remain: '',
        mediater: ''
      },
      tempCoverData: {}
    }
  },
  computed: {
    // 卷宗类型
    dossierTypeAry() {
      return this.$store.getters.getBriefList
    },
    // 新增文书
    isShowAdd() {
      const temp = [3, 4, 7, 9, 10, 11, 12, 14]
      return temp.indexOf(this.showAction) != -1
    },
    // 登录角色的身份权限
    myResultTypeFlag() {
      return this.$store.state.user.userInfo.roleType != 4
    }
  },
  watch: {
    'tempCoverData.archiveNo': {
      handler(newName, oldName) {
        console.log('**************', newName)
        if (this.archiveNoList.length) {
          console.log(1111)
          for (const i in this.archiveNoList) {
            if (this.archiveNoList[i] == newName) {
              this.tempCoverData.type = this.archiveNoList_type[i]
              console.log(this.tempCoverData)
            }
          }
        }
      },
      deep: true
    }
  },
  created() {
    this.getTableByCaseId()
  },
  methods: {
    // 初始化
    init(coverData) {
      console.log(this.$route.name, '******************************')
      this.editCoverFlag = false
      this.coverData = coverData
      this.setAction(1, 1)
    },
    // 添加卷号输入模糊搜索
    getArchiveNoList(val) {
      this.tempCoverData.archiveNo = val
      console.log(this.tempCoverData.archiveNo)
      listSqCaseNo({
        sqCaseNo: val,
        pageSize: 15,
        pageNum: 1
      }).then(res => {
        this.archiveNoList = res.sqCaseNos
        this.archiveNoList_type = res.briefs
      })
    },
    // 编辑封面
    setEdit() {
      this.editCoverFlag = true
      if (this.editCoverFlag) {
        this.tempCoverData = { ...this.coverData }
      }
    },
    // 单文书Flag
    isOnce(type) {
      this.onceDataFlag = type
    },
    // 文书删除
    del() {
      this.$refs.bookTable.delDatal(this.onceDataFlag)
    },
    // 单文书下载
    downBook() {
      this.$refs.bookTable.plaintiffDown()
    },
    // 返回编辑
    backEdit() {
      this.editFlag = false
    },
    // 保存封面
    saveEdit() {
      this.coverData = { ...this.tempCoverData }
      console.log(this.coverData)
      addMediateFile({
        id: this.coverData.id,
        type: this.coverData.type,
        name: this.coverData.name,
        archiveNo: this.coverData.archiveNo,
        remain: this.coverData.remain,
        depositTerm: this.coverData.depositTerm,
        year: this.coverData.year
      }).then(res => {
        if (res.state == 100) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.coverData.id = res.tableId
          this.coverData.caseId = res.caseId
          this.editCoverFlag = false
        }
      })
    },
    // 设置活动内容
    setAction(type, id) {
      console.log(process)
      console.log(process.env)
      console.log('活动目录', type, this.loading)
      if (this.loading) return
      this.actionData = {
        type: type, // 不变
        id: id
      }
      this.editFlag = false
      this.loading = true
      this.$emit('setAction', type * 1)
      setTimeout(async() => {
        await this.$refs.bookTable.init(id, type)
        if (type == 13) {
          // this.$refs.ruleBook.init(this.actionData.id)
        }
        this.loading = false
      }, 0)
    },
    // 新增文书
    async editData() {
      if (!this.coverData.id) {
        return this.$message.error('请先填写并保存卷宗封面')
      }
      this.loading = true
      switch (this.actionData.type * 1) {
        case 3:
          await this.$refs.application1.init()
          break
        case 4:
          await this.$refs.registerForm.init()
          break
        case 7:
          await this.$refs.mediationRecord1.init()
          break
        case 9:
          await this.$refs.mediationRecord2.init()
          break
        case 10:
          await this.$refs.agreement.init()
          break
        case 11:
          await this.$refs.returnVisit.init()
          break
        case 12:
          await this.$refs.judicialBook.init()
          break
        case 14:
          await this.$refs.situationDescription.init()
          break
        default:
          break
      }
      this.loading = false
      this.editFlag = true
    },
    // 上传文件
    getFile(e) {
      const file = e.target.files[0]
      if (!file) return
      console.log(file)
      const testAry = file.name.split('.')
      if (testAry[testAry.length - 1] != 'pdf') {
        this.$message.error('仅支持上传PDF文件')
        return
      }
      const param = new FormData() // 创建form对象
      param.append('file', file) // 通过append向form对象添加数据
      uploadCivilRuling(param).then(res => {
        if (res.state === 100) {
          this.$refs.file.value = ''
          console.log(this.coverData)
          saveCivilRuling({
            caseId: this.$route.name == 'mediationDossier' ? this.coverData.caseId : this.coverData._id,
            url: res.url
          }).then(rs => {
            if (rs.state === 100) {
              this.$message({
                showClose: true,
                message: '上传成功',
                type: 'success'
              })
              this.$refs.bookTable.init()
            }
          })
        }
      })
    },
    // 生成文书
    createBook() {
      if (!this.coverData.caseId) return this.$message.error('请先填写并保存卷宗封面')
      if (this.showAction == 13) return this.$refs.file.dispatchEvent(new MouseEvent('click'))
      const crearApi = []
      crearApi[3] = { api: createPetitionFile, refs: 'application1' } // 申请书
      crearApi[4] = { api: createRegisterFile, refs: 'registerForm' } // 登记表
      crearApi[5] = { api: createEntrustFile } // 授权委托书
      crearApi[6] = { api: createNotifyFile } // 权力义务告知书
      crearApi[7] = { api: createExamineFile, refs: 'mediationRecord1' } // 调查记录
      crearApi[9] = { api: createMediateRecord, refs: 'mediationRecord2' } // 解纷记录
      crearApi[10] = { api: createProtocolFile, refs: 'agreement' } // 协议书
      crearApi[11] = { api: createReturnVisit, refs: 'returnVisit' } // 回访记录
      crearApi[12] = { api: createJudicialFile, refs: 'judicialBook' } // 回访记录
      crearApi[14] = { api: createTableExplain, refs: 'situationDescription' } // 卷宗情况说明
      let data = {}
      switch (this.showAction * 1) {
        case 3:
          data = {
            face: this.$refs.application1.briefSituation,
            mediateRequest: this.$refs.application1.applicationItem
          }
          break
        case 4:
          data = {
            // timeStr: this.$refs.registerForm.selectTime,
            // asideStr: this.$refs.registerForm.mediator,
            // briefId: this.coverData.id,
            // caseSource: this.$refs.registerForm.source,
            face: this.$refs.registerForm.briefSituation
          }
          break
        case 7:
          data = {
            examineTime: this.$refs.mediationRecord1.formData.selectTime,
            examinePlace: this.$refs.mediationRecord1.formData.address,
            participant: this.$refs.mediationRecord1.formData.joinMan,
            beExamineNames: this.$refs.mediationRecord1.formData.beMan,
            record: this.$refs.mediationRecord1.formData.briefSituation
          }
          break
        case 9:
          data = {
            mediateTime: this.$refs.mediationRecord2.formData.selectTime,
            mediateCourt: this.$refs.mediationRecord2.formData.address,
            participant: this.$refs.mediationRecord2.formData.joinMan,
            mediateResult: this.$refs.mediationRecord2.formData.results,
            record: this.$refs.mediationRecord2.formData.briefSituation
          }
          break
        case 10:
          data = {
            fact: this.$refs.agreement.formData.briefSituation,
            agreement: this.$refs.agreement.formData.agreement,
            method: this.$refs.agreement.formData.method,
            countStr: this.$refs.agreement.formData.asideStrNum
          }
          break
        case 11:
          data = {
            // protocolNo: this.$refs.returnVisit.formData.id,
            returnCause: this.$refs.returnVisit.formData.cause,
            returnTime: this.$refs.returnVisit.formData.selectTime,
            returnInfo: this.$refs.returnVisit.formData.briefSituation,
            litigantNames: this.$refs.returnVisit.formData.people
          }
          break
        case 12:
          data = {
            agreement: this.$refs.judicialBook.formData.agreement,
            method: this.$refs.judicialBook.formData.method,
            courtId: this.$refs.judicialBook.formData.asideStrCourt,
            asideStr: `本协议一式${this.$refs.judicialBook.formData.asideStrNum}份`,
            appendix: this.$refs.judicialBook.formData.appendix
          }
          console.log(data)
          if (this.$refs.judicialBook.formData.asideStrNum == '' || this.$refs.judicialBook.formData.asideStrCourt == '') {
            return this.$message.error('请检查信息完整性')
          }
          break
        case 14:
          data = {
            explain: this.$refs.situationDescription.briefSituation
          }
          break
        default:
          break
      }
      data.caseId = this.coverData.caseId
      for (const i in data) {
        if (data[i] == '') {
          console.log(data, i)
          return this.$message.error('请检查信息完整性')
        }
      }
      const item = crearApi[this.showAction]
      item.api(data).then(res => {
        if (res.state == 100) {
          this.$message({
            message: '文书生成成功',
            type: 'success'
          })
          // this.$refs[item.refs].init(this.actionData.id, this.actionData.type)
          this.backEdit()
          this.$refs.bookTable.init()
        }
      })
    },
    getTableByCaseId() {
      getTableByCaseId({ caseId: this.$store.state.cases.caseId }).then(res => {
        if (res.state === 100) {
          const data = res.table
          const obj = {
            archiveNo: data.archiveNo,
            createDate: data.createDate ? formatDate(new Date(data.createDate), 'yyyy-MM-dd') : '', // 立卷时间
            caseId: this.$store.state.cases.caseId,
            mediateTerm: res.mediaterTime ? formatDate(new Date(res.mediaterTime), 'yyyy-MM-dd') : '', // 解纷时间
            creatName: data.admin.name, // 立卷人
            mediater: res.mediater.name,
            passengerTransportation: data.court.name,
            type: data.type,
            name: data.name,
            depositTerm: data.depositTerm ? formatDate(new Date(data.depositTerm), 'yyyy-MM-dd') : '',
            remain: data.remain,
            id: data.id

          }
          this.init(obj)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .title {
        display: flex;
        font-size: 16px;
        color: #007AFF;
        font-weight: bold;
        ::v-deep .el-button {
        height: 30px;
        line-height: 30px;
        padding-top: 0px;
        padding-bottom: 0px;
        margin-left: 10px;
        &.edit {
          background-color: #1890FF;
        }
        &.save {
          background-color: #F4AA5A;
          border-color: #F4AA5A;
        }
      }
        span {
            line-height: 30px;
            color: #007AFF;
            font-weight: bold;
            img {
                margin-left: 15px;
                cursor: pointer;
            }
        }
    }
    .icon-edit {
        margin-left: 25px;
        color: #FF8A48;
        cursor: pointer;
    }
    .icon-claim {
        margin-left: 17px;
        color: rgb(36,117,254);
        cursor: pointer;
    }
    .form {
        margin-top: 33px;
        border: 1px solid #E7E8E8;
        border-bottom: none;
    }
    ::v-deep .cover .el-input__inner{
        border: none;
        height: 38px;
    }
    .item-title {
        width: 100%;
        min-height: 60px;
        height: 100%;
        border-bottom: 1px solid #E7E8E8;
        border-right: 1px solid #E7E8E8;
        line-height: 60px;
        font-weight: bold;
        text-align: center;
    }
    .item-textarea {
        width: 100%;
        // height:80px;
        word-wrap:break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    ::v-deep .cover .el-textarea__inner {
        min-height: 40px !important;
        border: none;
    }
    .item-data {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #E7E8E8;
        line-height: 60px;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #707070;
    }
    .remark {
        text-align: center;
        background-color: #f3f3f3;
    }
    .menu {
        padding: 44px 0;
        background: #FAFBFB;
        box-shadow:15px 0 15px -15px rgba(0, 0, 0, 0.16),
             -15px 0 15px -15px rgba(0, 0, 0, 0.16);
    }
    .menu-item {
        cursor: pointer;
    }
    .menu-title {
        padding: 10px 0;
    }
    .menu-val {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .menu-val div {
        width: 20px;
        height: 20px;
        color: #fff;
        background: #23EAA4;
        text-align: center;
    }
    .action {
        background: rgb(200,230,254);
    }
    .view-action {
        // padding: 30px 0;
        background: #fff;
        box-shadow:15px 0 15px -15px rgba(0, 0, 0, 0.16),
             -15px 0 15px -15px rgba(0, 0, 0, 0.16);
    }
    .operation {
        position: relative;
        padding-top: 30px;
    }
    .operation p {
        margin-bottom: 25px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
    }
    .operation-bule {
        border: 1px solid #0093FF;
        color: #0093FF;
    }
    .operation-yellow {
        border: 1px solid #FEC500;
        color: #FEC500;
    }
    .view-action-btn {
        padding: 10px;
    }
    .img-box img{
        margin-left: 20px;
        cursor: pointer;
    }
</style>
