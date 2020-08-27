<template>
  <div class="main-wrapper">
    <div>
      <dossierEdit
        ref="dossierEdit"
        :show-action="showAction"
        :menu-list="menuList"
        @setAction="setAction"
      />
    </div>
  </div>
</template>

<script>
import { listMediateTable, listDirType } from '@/api/dossier/dossier.js'
import { formatDate } from '@/lib/date'
import dossierEdit from '@/components/mediationDossier/dossierEdit' // 解纷宗卷
export default {
  components: {
    dossierEdit
  },
  data() {
    return {
      loading: false,
      loadingTable: false,
      searchVal: '',
      showAction: 0, // 当前目录
      menuList: [], // 目录
      pageNum: 1,
      pageSize: 5,
      totalSize: 1, // 数据总数
      search: {
        dossierName: '', // 筛选卷名
        time: [], // 筛选时间
        type: '', // 筛选类型
        index: ''
      },
      tableData: []// 表格数据
    }
  },
  computed: {
    // 卷宗类型
    dossierType() {
      return this.$store.getters.getBriefList
    },
    // 登录角色的身份权限
    myResultTypeFlag() {
      return this.$store.state.user.userInfo.roleType != 4
    }
  },
  watch: {
    searchVal(index) {
      if (!isNaN(index)) {
        this.$refs.dossierEdit.init(this.tableData[index])
      }
    }
  },
  mounted() {
    this.$store.dispatch('getBriefData')
    this.$store.dispatch('getCourtList')
    // 目录
    listDirType().then(res => {
      this.menuList = [...res.data]
    })
    this.searchDossier(1)
  },
  methods: {
    // 返回列表页
    backShowAction() {
      this.showAction = 0
      console.log('返回列表页')
      this.searchDossier(1)
    },
    // 重置
    claearData() {
      this.searchVal = ''
      this.search = {
        dossierName: '', // 筛选卷名
        time: [], // 筛选时间
        type: '', // 筛选类型
        index: ''
      }
    },
    // 搜索
    searchDossier(page) {
      this.pageNum = page || 1
      this.loadingTable = true
      this.showAction = 0
      this.$refs.dossierTable && this.$refs.dossierTable.setPageNum(page)
      listMediateTable({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sqCaseNo: this.search.dossierName,
        createDateStart: this.search.time[0],
        type: this.search.type,
        createDateEnd: this.search.time[1]
      }).then(res => {
        this.setList(res)
        this.loadingTable = false
        this.totalSize = res.data.totalPages
      })
    },
    // 下拉框搜索
    selectSearch(val) {
      this.loading = true
      listMediateTable({
        pageNum: 1,
        pageSize: 15,
        sqCaseNo: val,
        createDateStart: this.search.time[0],
        type: this.search.type,
        createDateEnd: this.search.time[1]
      }).then(res => {
        this.setList(res)
        this.loading = false
      })
    },
    // 处理表格
    setList(res) {
      const data = res.data.content
      for (const i in data) {
        data[i].createDate = data[i].createDate ? formatDate(new Date(data[i].createDate), 'yyyy-MM-dd') : ''// 立卷时间
        data[i].caseId = res.data.lawCaseInfo[i].caseId// 案件ID
        data[i].mediateTerm = res.data.lawCaseInfo[i].mediateTime ? formatDate(new Date(res.data.lawCaseInfo[i].mediateTime), 'yyyy-MM-dd') : ''// 解纷时间
        data[i].creatName = data[i].admin.name// 立卷人
        data[i].mediater = res.data.lawCaseInfo[i].mediater// 立卷人
        data[i].passengerTransportation = data[i].court.name// 受理机构
        data[i].urls = res.data.lawCaseInfo[i].urls// 下载
      }
      this.tableData = data
      this.totalSize = res.data.totalPages
    },
    // 新增宗卷
    addDossier() {
      this.claearData()
      const data = {
        id: '',
        caseId: '',
        archiveNo: '',
        name: '',
        type: '',
        year: '',
        mediateTerm: '',
        passengerTransportation: '',
        createDate: formatDate(new Date(), 'yyyy-MM-dd'),
        creatName: '',
        remain: '',
        mediater: ''
      }
      this.setAction(1, data)
      this.$refs.dossierEdit.setEdit()
      this.selectSearch()
    },
    // 更改活动内容
    setAction(type, ...arg) {
      console.log(type, arg)
      switch (type) {
        case 1:
          if (arg.length) {
            this.selectSearch()
            this.$refs.dossierEdit.init(arg[0])
          }
          break

        default:
          break
      }
      this.showAction = type
    }

  }
}
</script>

<style scoped lang="scss">
    @import '~@/styles/variables.scss';
    .page {
        position: relative;
        padding: 25px 30px;
        background: #fff;
    }
    .back-btn {
        position: absolute;
        right: 70px;
        padding: 9px;
        font-size: 20px;
        // color: $subMenuActiveText;
        cursor: pointer;
    }
    .mb-30 {
        margin-bottom: 30px;
    }
    .dossier-name {
        width: 170px;
        height: 40px;
        font-size: 14px;
    }
    .dossier-name-search {
        padding: 0 12px;
        line-height: 40px;
        color: $themeColor;
        font-size: 14px;
        cursor: pointer;
    }

    .dossier-time {

        width: 230px;
        height: 40px;
    }
    .dossier-type {
        margin-left: 25px;
        width: 150px;
        height: 40px;
    }
    ::v-deep .dossier-type .el-input__inner{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .search-btn {
        padding: 0px;
        height: 35px;
        line-height: 35px;
        width: 90px;
        margin-left: 20px;
    }
    .add {
        background-color: #81F0FF;
        border-color: #81F0FF;
        color: #fff;
    }
    .clear {
        background-color: #00c3ff;
        border-color: #00c3ff;
        color: #fff;
    }
    .search {
        background-color: $themeColor;
        border-color: $themeColor;
        color: #fff;
    }
</style>
