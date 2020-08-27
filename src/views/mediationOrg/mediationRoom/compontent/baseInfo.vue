<template>
  <div class="base-info-wrapper">
    <!-- 搜索 -->
    <!-- <div class="search-wrapper">
      <el-input
        placeholder="请输入内容"
        v-model="input4"
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-search"
        ></i>
      </el-input>
    </div> -->
    <!-- 基本信息 -->
    <div
      class="base-info-content"
      style="margin-top: 10px;"
    >
      <div class="header">基本信息</div>
      <div class="item">
        <div class="content">
          <div class="content-left">
            <span>事由</span>
          </div>
          <div class="content-right">
            <span v-if="caseData && caseData.brief">{{ caseData.brief.name }}</span>
          </div>
        </div>
        <el-slider
          v-model="sliderNum"
          class="sy-el-slider color1"
          disabled
        />
      </div>
      <div class="item">
        <div class="content">
          <div class="content-left">
            <span>解纷方式</span>
          </div>
          <div class="content-right">
            <span>远程解纷</span>
          </div>
        </div>
        <el-slider
          v-model="sliderNum1"
          class="sy-el-slider color2"
          disabled
        />
      </div>
      <div class="item">
        <div class="content">
          <div class="content-left">
            <span>解纷员</span>
          </div>
          <div class="content-right">
            <span v-if="caseData && caseData.mediater">{{ caseData.mediater.name }}</span>
            <!-- <i class="el-icon-arrow-down"></i> -->
          </div>
        </div>
        <el-slider
          v-model="sliderNum"
          class="sy-el-slider color3"
          disabled
        />
      </div>
      <!-- <div class="item">
        <div class="content">
          <div class="content-left">
            <span>记录员</span>
          </div>
          <div class="content-right">
            <span>XXXX</span>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
        <el-slider
          v-model="sliderNum"
          class="sy-el-slider color4"
          disabled
        ></el-slider>
        <div class="content-data">
          <div class="content-data-item">
            <i class="el-icon-check"></i>
            <span>xxxx</span>
          </div>
          <div class="content-data-item">
            <i class="el-icon-check"></i>
            <span>xxxx</span>
          </div>
        </div>
      </div> -->
      <div class="item">
        <div class="content">
          <div class="content-left">
            <span>证据列表</span>
          </div>
          <div class="content-right">
            <!-- <img
              v-if="evidencesData && evidencesData.length > 0"
              width="20px"
              style="margin-top: 15px;cursor: pointer;"
              src="@/assets/img/add.png"
              @click="addVideoEvi"
            > -->
          </div>
        </div>
        <el-slider
          v-model="sliderNum"
          class="sy-el-slider color5"
          disabled
        />
        <div
          v-if="evidencesData && evidencesData.length > 0"
          class="evidence-wrapper"
        >
          <div
            v-for="(item,index) in evidencesData"
            :key="item.id"
            class="evidence-wrapper-item"
            @click="getEvid(item.id)"
          >
            <div class="item-left">
              <i
                v-if="evidencesId == item.id"
                class="el-icon-check"
              />
            </div>
            <div class="item-center">
              <div class="num">序号{{ index+1 }}</div>
              <div class="name">{{ item.evidenceName }}</div>
              <!-- <div class="source">证据来源：{{ item.source }}</div> -->
            </div>
            <!-- <div class="item-right">
              <i
                class="el-icon-delete"
                @click="delEvi(item.id)"
              ></i>
            </div> -->
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="content-left">
            <span>解纷结果</span>
          </div>
          <div class="content-right">
            <span />
          </div>
        </div>
        <el-slider
          v-model="sliderNum"
          class="sy-el-slider color2"
          disabled
        />
      </div>
      <div class="item">
        <div class="content">
          <div class="content-left">
            <span>当事人</span>
          </div>
          <div class="content-right">
            <span />
          </div>
        </div>
        <el-slider
          v-model="sliderNum"
          class="sy-el-slider color2"
          disabled
        />
        <div class="item-center">
          <div v-for="(item, index) in litigantData" :key="index" class="litigant-item">
            <div class="num">{{ item.label }}</div>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { delEvi } from '@/api/case/index.js'
import { findArrayIndexByKey } from '@/utils/tools.js'
export default {
  components: {},
  props: {
    lawCaseData: null // 案件信息
  },
  data() {
    return {
      input4: '',
      sliderNum: 89,
      sliderNum1: 35,
      caseData: null, // 接收案件信息
      evidencesData: null,
      evidencesId: '', // 证据信息
      litigantData: [] // 当事人信息
    }
  },
  watch: {
    lawCaseData: {
      handler() {
        this.getCaseData()
      }
    }
  },
  created() {
    this.getCaseData()
  },
  mounted() {},
  methods: {
    // 获取案件信息
    getCaseData() {
      if (!this.lawCaseData) {
        return
      }
      this.caseData = JSON.parse(JSON.stringify(this.lawCaseData))
      this.getEvidencesData()
      this.getLitigant()
    },
    // 获取证据信息
    getEvidencesData() {
      this.evidencesData = []
      if (this.caseData.litigants && this.caseData.litigants.length > 0) {
        this.caseData.litigants.forEach(item => {
          if (item.evidences && item.evidences.length > 0) {
            item.evidences.forEach(item1 => {
              this.evidencesData.push(item1)
            })
          }
        })
      }
    },
    // 获取当事人信息
    getLitigant() {
      this.litigantData = []
      console.log()
      if (this.caseData.litigants && this.caseData.litigants.length > 0) {
        this.caseData.litigants.forEach(item => {
          const obj = {
            label: item.litigationStatus.name,
            name: item.litigantName
          }
          this.litigantData.push(obj)
        })
      }
    },
    // 删除证据
    delEvi(id) {
      const index = findArrayIndexByKey(this.evidencesData, 'id', id)
      this.$confirm('是否确认删除')
        .then(() => {
          delEvi({ eviId: id }).then(res => {
            if (res.state === 100) {
              this.$message({
                showClose: true,
                message: res.message,
                type: 'success'
              })
              this.evidencesData.splice(index, 1)
            }
          })
        })
        .catch(() => {})
    },
    // 添加视频证据的时候
    addVideoEvi() {
      this.$emit('addVideoEvi', this.evidencesId)
    },
    // 选择证据获取证据ID
    getEvid(id) {
      if (id == this.evidencesId) {
        this.evidencesId = ''
      } else {
        this.evidencesId = id
      }
      this.$emit('geteVidencesId', id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.base-info-wrapper {
  background-color: #fafbfb;
  height: 100%;
  .search-wrapper {
    padding: 30px;
  }
  .base-info-content {
    .header {
      font-size: 12px;
      color: #828d99;
      padding-left: 30px;
      margin-bottom: 12px;
    }
    .item {
      .content {
        padding: 0 30px;
        display: flex;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        justify-content: space-between;
        .content-left {
          & > span {
            font-size: 20px;
            color: #304156;
          }
        }
        .content-right {
          & > span {
            font-size: 13px;
            color: #828d99;
          }
          & > .el-icon-arrow-down {
            color: #475f7b;
            font-weight: bold;
            margin-left: 10px;
          }
        }
      }
      .content-data {
        .content-data-item {
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #f0f1f2;
          padding-left: 30px;
          &:last-child {
            border-bottom: none;
          }
          .el-icon-check {
            color: $themeColor;
            font-size: 18px;
            margin-right: 15px;
            position: relative;
            top: 1px;
            font-weight: bold;
          }
          & > span {
            font-size: 18px;
            color: #304156;
          }
        }
      }
      .evidence-wrapper {
        max-height: 450px;
        overflow: auto;
        .evidence-wrapper-item {
          display: flex;
          justify-content: space-between;
          padding: 15px 30px;
          border-bottom: 1px solid #f0f1f2;
          cursor: pointer;
          &:last-child {
            border-bottom: none;
          }
          .item-left,
          .item-right {
            width: 40px;
            display: flex;
            align-items: center;
            & > i {
              font-size: 18px;
              cursor: pointer;
            }
            .el-icon-check {
              color: $themeColor;
              font-size: 18px;
              font-weight: bold;
            }
          }
          .item-right {
            justify-content: flex-end;
          }
          .item-center {
            flex: 1;
            .num {
              font-size: 13px;
              color: #828d99;
            }
            .name {
              font-size: 18px;
              color: #304156;
            }
            .source {
              font-size: 13px;
              color: #007fd4;
            }
          }
        }
      }
      .litigant-item {
        padding: 10px 30px;
        display: flex;
        justify-content: space-between;
        .num {
          color: #304156;
        }
        .name {
          color: #828d99;
        }
      }
    }
  }
}
</style>
