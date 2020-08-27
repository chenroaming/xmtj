<template>
  <div class="main">
    <el-row :gutter="20">
      <card v-for="item in cardArr" :key="item.name" :data="item" />
    </el-row>
    <el-row :gutter="20">
      <totalCount />
      <things />
      <notice />
    </el-row>
    <el-row :gutter="20">
      <caseType />
      <hotCase />
    </el-row>
  </div>
</template>

<script>
import card from '@/components/otherHome/index/card'
import totalCount from '@/components/otherHome/index/totalCount'
import things from '@/components/otherHome/index/things'
import notice from '@/components/otherHome/index/notice'
import caseType from '@/components/otherHome/index/caseType'
import hotCase from '@/components/otherHome/index/hotCase'
import { searchUnit } from '@/api/otherHome/otherHome'
export default {
  name: 'OtherHomeIndex',
  components: {
    card, totalCount, things, notice, caseType, hotCase
  },
  data() {
    return {
      cardArr: []
    }
  },
  computed: {

  },
  mounted() {
    searchUnit().then(({ state, data: { fen, lian, man, tiao }}) => {
      this.cardArr = [{ name: '分流中心', count: `${fen}家` },
        { name: '联动单位', count: `${lian}家` },
        { name: '解纷组织', count: `${tiao}个` },
        { name: '解纷员', count: `${man}人` }]
    })
    this.$emit('update:nowChoice', '首页')
  },
  methods: {

  }
}
</script>

<style lang = "scss">
  .main {
    .el-row {
      margin-bottom: 20px;
    }
  }
</style>

<style scoped lang = "scss">
  .card{
    width: 100%;
    height: 163px;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 0px 13px 0px rgba(54,184,163,0.15);
    padding: 15px;
    p{
      width: 88px;
      height: 60%;
      opacity: 0.5;
      font-size: 22px;
      font-family: Segoe UI, Segoe UI-Bold;
      font-weight: 700;
      text-align: left;
      color: #36b8a3;
      line-height: 30px;
    }
    .count {
      display: inline-block;
      width: 80%;
      height: 40%;
      font-size: 40px;
      font-family: Segoe UI, Segoe UI-Regular;
      font-weight: 400;
      color: #00183b;
      line-height: 40px;
    }
    .pic-box {
      width: 20%;
      height: 40%;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      img{
        width: 35px;
        height: 39px;
      }
    }
  }
</style>
