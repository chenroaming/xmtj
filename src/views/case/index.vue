<template>
  <div class="case-wrapper">
    <div class="header">
      <div class="case-no">案件:{{ caseInfo.dCaseNo }}</div>
      <div class="men-wrapper">
        <ul>
          <li v-for="(item, index) in menuData" :key="index" :class="{'active': menuType == index}" @click="selectType(index)">{{ item }}</li>
        </ul>
      </div>
      <div class="back" @click="back">返回</div>
    </div>
    <div class="content-wrapper">
      <baseInfo v-if="menuType == 0" />
      <handInfo v-if="menuType == 1" />
      <electronicFile v-if="menuType == 2" />
      <log v-if="menuType == 3" />
    </div>
  </div>
</template>

<script>
import baseInfo from './baseInfo/index'
import handInfo from './handInfo/index'
import electronicFile from './electronicFile/index'
import log from './log/index'
export default {
  components: {
    baseInfo,
    handInfo,
    electronicFile,
    log
  },
  props: {

  },
  data() {
    return {
      caseInfo: {},
      menuType: 0,
      menuData: ['基本信息', '办理信息', '电子卷宗', '案件日志']
    }
  },
  async created() {
    if (this.$store.state.user.userRole == 3) { // 当事人只能查看案件详情
      this.menuData = ['基本信息']
    }
    this.$store.dispatch('GetCaseInfo').then(res => {
      this.caseInfo = res
    })
  },
  mounted() {

  },
  methods: {
    selectType(index) {
      this.menuType = index
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.case-wrapper {
  background-color: #fff;
  box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
  .header {
    height: 70px;
    position: relative;
    padding: 0 200px;
    text-align: center;
    border-bottom: 5px solid #F2F5FA;
    .case-no {
      position: absolute;
      top: 0px;
      left: 30px;
      height: 70px;
      line-height: 70px;
      color: #2C2C2C;
      font-weight: bold;
    }
    .men-wrapper {
      ul {
        display: inline-flex;
        li {
          &.active {
            color: #007AFF;
            border-bottom: 3px solid #007AFF;
            padding-bottom: 20px;
          }
          padding: 27px 0px;
          margin-right: 40px;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
    .back {
      position: absolute;
      top: 0px;
      right: 30px;
      height: 70px;
      line-height: 70px;
      cursor: pointer;
      font-size: 14px;
    }
  }
  .content-wrapper {
    width: 100%;
    min-height: 400px;
    padding: 20px 30px;
  }
}
</style>
