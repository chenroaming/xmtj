<template>
  <div class="case-list-wrapper">
    <div class="left-wrapper">
      <menuLeft :menu-data="menuData" @selectMenu="selectMenu" />
    </div>
    <div class="right-wrapper">
      <div class="search-item">
        <div class="search-wrapper">
          <el-select v-model="searchParams.caseSource" placeholder="案件来源">
            <el-option
              v-for="item in caseSourceData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="searchParams.applyType" placeholder="案件类型">
            <el-option
              v-for="item in applyTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="searchParams.dCaseNo" type="text" placeholder="案号" />
          <el-input v-model="searchParams.litigantName" type="text" placeholder="申请人/被申请人" />
          <el-select v-model="searchParams.briefId" placeholder="纠纷事由">
            <el-option
              v-for="item in briefData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-date-picker
            v-model="searchTime"
            type="daterange"
            range-separator="/"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <div class="search-btn-wrapper">
            <!-- <el-button>批量</el-button> -->
            <el-button @click="getCaseList">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
        </div>
      </div>
      <div v-if="showMenu" class="menu-wrapper">
        <ul>
          <li :class="{'active': menu1 == 2}" @click="selectMenu1(2)">待审核</li>
          <li :class="{'active': menu1 == 3}" @click="selectMenu1(3)">待分发</li>
          <li :class="{'active': menu1 == 4}" @click="selectMenu1(4)">待分配</li>
        </ul>
      </div>
      <div class="list-wrapper-wrapper">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          class="table"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="num"
            label="序号"
            width="50"
          />
          <el-table-column
            prop="caseSource"
            label="案件来源"
          />
          <el-table-column
            prop="applyType"
            label="案件类型"
          />
          <el-table-column
            prop="dCaseNo"
            label="网登号"
          />
          <el-table-column
            prop="address"
            label="申请人/被申请人"
          >
            <template slot-scope="scope">
              <p>申请人:{{ scope.row.applicant }}</p>
              <p>被申请人:{{ scope.row.respondent }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="briefName"
            label="纠纷事由"
          />
          <el-table-column
            prop="applyStandard"
            label="纠纷金额(元)"
          />
          <el-table-column
            prop="address"
            label="操作"
          >
            <template slot-scope="scope">
              <div class="opera-btn">
                <!-- <a @click="getDetail(scope.row.id)">详情</a><span>|</span><a @click="shunt(scope.row.id)">分流</a> -->
                <a @click="getDetail(scope.row.id)">详情</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-wrapper">
        <el-pagination
          background
          :page-size="searchParams.pageSize"
          :pager-count="5"
          layout="sizes, prev, pager, next"
          :page-sizes="[5, 20, 50, 100]"
          :total="listCastTotal"
          @size-change="handleSizeChange"
          @prev-click="caseListPrev"
          @next-click="caseListNext"
          @current-change="caseListPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu/menuLeft.vue'
import { listCase } from '@/api/case/index.js'
import { brief } from '@/api/common/common.js'
import { formatDate } from '@/utils/format.js'
export default {
  components: {
    menuLeft
  },
  props: {

  },
  data() {
    return {
      showMenu: false,
      menu1: 2,
      menuData: [
        { name: '全部案件' },
        { name: '待分流' },
        { name: '待审查' },
        { name: '待办理' },
        { name: '已办理' }
      ],
      caseSourceData: [
        {
          value: '法院委派',
          label: '法院委派'
        },
        {
          value: '当事人申请',
          label: '当事人申请'
        }
      ],
      applyTypeData: [
        {
          value: '解纷',
          label: '解纷'
        },
        {
          value: '仲裁',
          label: '仲裁'
        },
        {
          value: '行政复议',
          label: '行政复议'
        },
        {
          value: '行政裁决',
          label: '行政裁决'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      value: '',
      tableData: [],
      searchParams: {
        pageSize: 20,
        pageNum: 1
      },
      loading: true,
      listCastTotal: 0, // 案件列表总数
      briefData: [],
      searchTime: '',
      process: null,
      flowStatus: null
    }
  },
  created() {
    this.getCaseList()
    this.getBrief()
  },
  mounted() {

  },
  methods: {
    // 获取案由
    getBrief() {
      // 把pageSize设大用于做select的数据
      brief({ pageSize: 1000 }).then(res => {
        this.briefData = JSON.parse(JSON.stringify(res.briefPage.content))
      })
    },
    // 获取案件列表信息
    getCaseList() {
      if (this.searchTime && this.searchTime.length > 0) {
        this.searchParams.startTime = formatDate(
          new Date(this.searchTime[0]).getTime(),
          'YYYY-MM-DD'
        )
        this.searchParams.endTime = formatDate(
          new Date(this.searchTime[1]).getTime(),
          'YYYY-MM-DD'
        )
      } else {
        this.searchParams.startTime = ''
        this.searchParams.endTime = ''
      }
      this.searchParams.process = this.process
      listCase(this.searchParams).then(res => {
        this.loading = false
        if (res.state === 100) {
          // this.tableData = res.data.content
          // this.tableData.applicant = res.litigants[1]
          // this.tableData.respondent = res.litigants[2]
          this.listCastTotal = res.data.total
          this.tableData = res.data.content.map((item, index) => {
            item.num = index + 1
            item.applicant = res.litigants[index][1]
            item.respondent = res.litigants[index][2]
            return item
          })
          console.log(this.tableData)
        }
      })
    },
    // 重置
    reset() {
      this.searchParams = {
        pageSize: 20,
        pageNum: 1
      }
      this.getCaseList()
    },
    // 跳转详情
    getDetail(id) {
      this.$store.commit('SET_CASEID', id)
      this.$router.push('/case')
    },
    // 分流
    shunt(id) {},
    // 改变一页显示多少条
    handleSizeChange(e) {
      this.searchParams.pageSize = e
      this.searchParams.pageNum = 1
      this.getCaseList()
    },
    // 上一页
    caseListPrev(index) {
      console.log('----上一页---------')
      this.searchParams.pageNum = index
      this.getCaseList()
    },
    // 下一页
    caseListNext(index) {
      this.searchParams.pageNum = index
      this.getCaseList()
    },
    // 选择第几页
    caseListPage(index) {
      this.searchParams.pageNum = index
      this.getCaseList()
    },
    selectMenu(index) {
      const map = {
        0: { // 全部案件
          process: null
        },
        1: { // 待分流
          process: 1
        },
        2: { // 待审查
          process: 2
        },
        3: { // 待办理
          process: 5
        },
        4: { // 已办理
          process: 7
        }
      }
      if (index == 2) {
        this.showMenu = true
      } else {
        this.showMenu = false
      }
      this.process = map[index].process
      this.getCaseList()
    },
    selectMenu1(index) {
      this.menu1 = index
      this.process = index
      this.getCaseList()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.case-list-wrapper {
  display: flex;
  &>.left-wrapper {
    width: 100px;
  }
  &>.right-wrapper {
    width: calc(100% - 100px);
    min-height: 300px;
    background-color: #fff;
    box-shadow: 0 3px 6px rgba(0,0,0,.16);
    .search-wrapper {
      padding: 20px 30px;
      padding-right: 300px;
      padding-bottom: 10px;
      border-bottom: 5px solid #F2F5FA;
      position: relative;
      ::v-deep .el-select {
        margin-right: 12px;
      }
      ::v-deep .el-input {
        margin-right: 12px;
        margin-bottom: 10px;
      }
      ::v-deep .el-date-editor .el-range-separator {
        width: auto;
        line-height: 24px;
      }
      .search-btn-wrapper {
        position: absolute;
        right: 30px;
        top: 20px;
        ::v-deep .el-button {
          height: 30px;
          line-height: 30px;
          padding: 0 20px;
          &:nth-child(1) {
            background-color: #F9BC01;
            color: #FFf;
          }
          &:nth-child(2) {
            background-color: #007AFF;
            color: #FFf;
          }
          &:nth-child(3) {
            border-color: #007AFF;
            color: #007AFF;
          }
        }
      }
    }
    .list-wrapper-wrapper {
      padding: 30px;
    }
    .opera-btn {
      color: #007AFF;
      font-weight: bold;
      a {
        text-decoration:underline;
      }
      span {
        display: inline-block;
        margin-left: 5px;
        margin-right: 5px;
      }
    }
    ::v-deep .el-table thead {
      color: #2c2c2c;
      font-weight: 600;
      font-size: 15px;
      tr th {
        &::last-child {
          color: #007AFF;
        }
      }
    }
    .page-wrapper {
      text-align: right;
      padding: 20px 30px;
      border-top: 5px solid #F2F5FA;
    }
    .menu-wrapper {
      ul {
        display: flex;
        padding: 0px 30px;
        li {
          &.active {
            color: #007aff;
            border-bottom: 5px solid #007aff;
          }
          padding: 20px 0;
          margin-right: 20px;
        }
      }
      border-bottom: 5px solid #F2F5FA;
    }
  }
}
</style>
