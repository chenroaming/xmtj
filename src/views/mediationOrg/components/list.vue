<template>
  <div class="mediate-wrapper">
    <div class="wrapper">
      <div class="search-wrapper">
        <div class="search-item">
          <div class="search-content">
            <el-input
              v-model="listCaseParams.dCaseNo"
              placeholder="请输入案号"
              class="search-input"
              @keyup.enter.native="search"
            >
              <div
                slot="suffix"
                class="search-icon-text"
                @click="search"
              >
                <span>搜索</span>
              </div>
            </el-input>
            <el-date-picker
              v-model="searchTime"
              class="search-time"
              type="daterange"
              range-separator="/"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="search"
            />
            <el-select
              v-model="listCaseParams.briefId"
              placeholder="请选择案由"
              @change="search"
            >
              <el-option
                v-for="(item, index) in briefData"
                :key="index"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
            <div class="search-btn-wrapper">
              <el-button class="search" @click="search">搜索</el-button>
              <el-button class="reset" @click="reset">重置</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="listCaseData"
          tooltip-effect="dark"
          style="width: 100%"
          class="my-table-1"
        >
          <el-table-column
            label="序号"
            prop="num"
            width="80"
          />
          <el-table-column
            label="案号"
            width="200"
          >
            <template slot-scope="scope">
              <span style="cursor: pointer;">{{ scope.row.sqCaseNo }}</span>
              <!-- <span style="cursor: pointer;" @click="toCaseDetail(scope.row.id)">{{ scope.row.sqCaseNo }}</span> -->
            </template>
          </el-table-column>
          <el-table-column
            label="申请人/被申请人"
          >
            <template slot-scope="scope">
              <p>申请人:{{ scope.row.applicant }}</p>
              <p>被申请人:{{ scope.row.respondent }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="briefName"
            label="事由"
          />
          <el-table-column
            prop=""
            label="解纷类型"
            width="160"
          >
            <template slot-scope="scope">
              <div class="type-wrapper">
                <div
                  class="item"
                  :class="{'active': scope.row.mediateType == 1}"
                  @click="getMediateType(scope.row.num, 1)"
                >远程解纷</div>
                <div
                  class="item"
                  :class="{'active': scope.row.mediateType == 2}"
                  @click="getMediateType(scope.row.num, 2)"
                >现场解纷</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="解纷时间">
            <template slot-scope="scope">
              <span>{{ scope.row.mediateTime | timeDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mediater"
            label="解纷员"
          />
          <el-table-column
            prop=""
            label="解纷室状态"
          >
            <template slot-scope="scope">
              <div class="btn-wrapper">
                <!-- <div class="btn-wrapper-left">
                  <span class="icon icon-yellow"></span>
                  <span class="text">测试解纷</span>
                </div> -->
                <div
                  v-if="scope.row.mediateType == 1"
                  class="btn-wrapper-right"
                  @click="toMediationRoom(scope.row.id, scope.row.sqCaseNo)"
                >
                  <span class="icon icon-blue" />
                  <span class="text">进入解纷</span>
                </div>
                <div
                  v-if="scope.row.mediateType == 2"
                  class="scheduled-wrapper"
                >
                  <div class="scheduled-btn">未安排</div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-wrapper">
        <el-pagination
          background
          :page-size="listCaseParams.pageSize"
          :pager-count="5"
          layout="prev, pager, next"
          :total="listCastTotal"
          @prev-click="caseListPrev"
          @next-click="caseListNext"
          @current-change="caseListPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { listCase, intoTalkRoom, brief } from '@/api/case/index.js'
import { inRecord, verifyHasCard } from '@/api/mediater/mediater.js'
import { intoRoom } from '@/api/rtcRoom/rtcRoom.js'
import { formatDate } from '@/utils/format.js'
export default {
  components: {
  },
  props: {},
  data() {
    return {
      listCaseParams: {
        pageNum: 1,
        pageSize: 10,
        examine: null, // 是否审核
        mediate: null, // 是否解纷
        process: '6',
        dCaseNo: '',
        briefId: ''
      }, // 案件列表搜索条件
      searchTime: '',
      value1: '',
      yearSelectData: [
        {
          value: '1',
          label: '123'
        }
      ],
      listCaseData: [], // 案件列表数据
      listCastTotal: 0, // 案件列表总数
      loading: true,
      caseId: null, // 案件ID
      briefData: [] // 案由信息
    }
  },
  created() {
    this.getCaseListData()
    this.getBrief()
  },
  methods: {
    search() {
      this.searchCardList()
    },
    add() {
      if (this.isCaseCenter == 1) {
        this.$emit('add')
      } else {
        this.caseId = ''
      }
    },
    // 获取案件列表
    getCaseListData() {
      this.loading = true
      console.log(this.listCaseParams.time)
      if (this.searchTime && this.searchTime.length > 0) {
        this.listCaseParams.startTime = formatDate(
          new Date(this.searchTime[0]).getTime(),
          'YYYY-MM-DD'
        )
        this.listCaseParams.endTime = formatDate(
          new Date(this.searchTime[1]).getTime(),
          'YYYY-MM-DD'
        )
      } else {
        this.listCaseParams.startTime = ''
        this.listCaseParams.endTime = ''
      }
      listCase(this.listCaseParams).then(res => {
        this.listCastTotal = res.data.total
        this.listCaseData = res.data.content.map((item, index) => {
          item.num = index + 1
          item.mediateType = 1
          item.applicant = res.litigants[index][1]
          item.respondent = res.litigants[index][2]
          return item
        })
        this.loading = false
      })
    },
    // 搜索案件列表
    searchCardList() {
      this.getCaseListData()
    },
    // 上一页
    caseListPrev(index) {
      console.log('----上一页---------')
      this.listCaseParams.pageNum = index
      this.searchCardList()
    },
    // 下一页
    caseListNext(index) {
      this.listCaseParams.pageNum = index
      this.searchCardList()
    },
    // 选择第几页
    caseListPage(index) {
      this.listCaseParams.pageNum = index
      this.searchCardList()
    },
    // 跳转到解纷室
    async toMediationRoom(id, sqCaseNo) {
      verifyHasCard({ lawCaseId: id }).then(async res => {
        if (res.state == 100) {
          await intoTalkRoom({ caseId: id, type: 0 })
          await inRecord({ lawid: id, name: sqCaseNo }).then(res => {
            if (res.state == 100) {
              this.$store.commit('SET_MEDIATERID', res.data.id)
              this.$store.commit('SET_MEDIATERIDINFO', res.data)
            }
          })
          this.intoRoom(id)
          this.$emit('toMediationRoom', id)
        }
      })
    },

    async intoRoom(id) {
      let token = ''
      await intoRoom({ caseId: id, permission: 'admin' }).then(res => {
        // this.$emit('getRoomToken')
        token = res.result
      })
      this.$store.commit('SET_ROOMTOKEN', token)
    },
    getBrief() {
      brief({ pageSize: 100 }).then(res => {
        const start = [
          {
            name: '所有案由',
            id: ''
          }
        ]
        this.briefData = [...start, ...res.briefPage.content]
      })
    },
    // 重置
    reset() {
      this.listCaseParams.dCaseNo = ''
      this.searchTime = ''
      this.listCaseParams.briefId = ''
      this.search()
    },
    // 选择解纷方式
    getMediateType(index, num) {
      this.listCaseData[index - 1].mediateType = num
    }
    // 跳转到案件详情
    // toCaseDetail(id) {
    //   this.$router.push({
    //     path: '/home/caseCenter',
    //     query: {
    //       id: id
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
.mediate-wrapper {
  .header {
    height: 80px;
    line-height: 80px;
    font-size: 20px;
    padding-left: 30px;
    border-bottom: 1px solid rgba(221, 223, 225, 0.55);
  }
}
.tab-box {
  margin-top: 30px;
}
.table-wrapper {
  margin-top: 3px;
  padding: 20px 30px;
}
.search-wrapper {
  padding: 20px 30px;
  padding-right: 300px;
  padding-bottom: 10px;
  position: relative;
  border-bottom: 5px solid #F2F5FA;
  .search-btn-wrapper {
    position: absolute;
    right: 30px;
    top: 20px;
    .search {
      background-color: #007AFF;
      color: #FFf;
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
    }
    .reset {
      border-color: #007AFF;
      color: #007AFF;
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
    }
  }
  .search-input {
    margin-bottom: 15px;
    .el-input__inner {
      max-width: 230px;
      width: 230px;
    }
    .search-icon-text {
      padding: 0 5px;
      cursor: pointer;
      span {
        font-size: 12px;
        color: $themeColor;
      }
    }
  }
  .search-time {
    max-width: 300px;
    margin-right: 20px;
    .el-range-separator {
      line-height: 24px;
    }
  }
}
.my-table-1 {
  text-align: center;
  margin-top: 10px;
  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
    .btn-wrapper-left,
    .btn-wrapper-right {
      flex: 1;
      cursor: pointer;
      .text {
        font-size: 12px;
        color: #464a53;
      }
      .icon {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 5px;
        &.icon-yellow {
          background-color: #fec500;
          box-shadow: 0px 3px 6px rgba(254, 197, 0, 1);
        }
        &.icon-blue {
          background-color: #2475fe;
          box-shadow: 0px 3px 6px rgba(36, 117, 254, 1);
        }
      }
    }
    .scheduled-wrapper {
      .scheduled-btn {
        background-color: #dddfe1;
        padding: 0 20px;
        border-radius: 15px;
        height: 30px;
        line-height: 30px;
        margin-top: 15px;
        color: #464a53;
        font-size: 12px;
      }
    }
  }
  &.el-table {
    .type-wrapper {
      line-height: 25px;
      display: flex;
      .item {
        flex: 1;
        width: 70px;
        height: 25px;
        line-height: 25px;
        background-color: #fff;
        border: 1px solid #dddfe1;
        cursor: pointer;
        &.active {
          background-color: #73d500;
          color: #fff;
          border: none;
        }
      }
    }
    td,
    th {
      text-align: center;
      border-bottom: 0px;
      padding: 0;
      padding-bottom: 15px;
      font-size: 14px;
      color: #131026;
    }
    td {
      .cell {
        background-color: #f7f8fa;
        min-height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          line-height: normal;
        }
      }
    }
    tr {
      td {
        &:first-child {
          .cell {
            border-radius: 10px 0 0 10px;
          }
        }
        &:last-child {
          .cell {
            border-radius: 0 10px 10px 0;
          }
        }
      }
      &.el-table__row {
        &:hover {
          td {
            background-color: white;
          }
        }
      }
    }
    th {
      color: #131026;
      font-size: 14px;
    }
    .el-button {
      padding: 0px 10px;
      line-height: 30px;
      border-radius: 15px;
      font-size: 12px;
      color: #fff;
      border: none;
      &.test {
        background-color: #fec500;
      }
      &.begin {
        background-color: #2475fe;
      }
      &.being {
        background-color: #23eaa4;
      }
      &.unscheduled {
        background-color: #dddfe1;
      }
    }
  }
}
.page-wrapper {
  overflow: hidden;
  padding: 20px 30px;
  border-top: 5px solid #F2F5FA;
  margin-top: 10px;
  .el-pagination {
    float: right;
    border: 1px solid rgba(224, 227, 233, 1);
    border-radius: 5px;
  }
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background-color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: $themeColor;
  }
}
.table-dropdown {
  &.el-dropdown-menu {
    position: relative;
  }
}
.btn-wrapper .el-button {
  margin-top: 0px !important;
}
</style>
