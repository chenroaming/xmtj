<template>
  <el-col :span="12">
    <div class="card">
      <div class="title1">总览</div>
      <div class="choice-box">
        <span :class="{isChoice:nowSelect === 'week'}" @click="selectDate('week')">本周</span>
        <span :class="{isChoice:nowSelect === 'month'}" @click="selectDate('month')">本月</span>
        <span :class="{isChoice:nowSelect === 'year'}" @click="selectDate('year')">本年</span>
      </div>
      <ve-line :data="chartData" :settings="chartSettings" />
    </div>
  </el-col>
</template>

<script>
import { searchLine } from '@/api/otherHome/otherHome'
export default {
  name: 'TotalCount',
  data() {
    this.chartSettings = {
      area: true
    }
    return {
      chartData: {
        columns: ['日期', '收案数', '结案数'],
        rows: []
      },
      nowSelect: 'week'
    }
  },
  computed: {

  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      const data = {
        search: this.nowSelect
      }
      searchLine(data).then(({ state, data: { xAxis, series: [fir, sec] }}) => {
        if (state === 100) {
          const rows = xAxis.map((item, index) => {
            return {
              '日期': item,
              '收案数': fir.data[index],
              '结案数': sec.data[index]
            }
          })
          this.chartData.rows = rows
        }
      })
    },
    selectDate(word) {
      this.nowSelect = word
      this.search()
    }
  }
}
</script>

<style scoped lang = "scss">
  .card {
    padding: 15px;
    width: 100%;
    height: 535px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.16);
    .title1 {
      width: 70%;
      display: inline-block;
      height: 25px;
      font-size: 20px;
      font-family: Segoe UI, Segoe UI-Bold;
      font-weight: 700;
      color: #000000;
      line-height: 26px;
    }
    .choice-box {
      display: inline-block;
      width: 30%;
      span{
        display: inline-block;
        width: 25%;
        height: 31px;
        font-size: 20px;
        font-family: Segoe UI, Segoe UI-Regular;
        font-weight: 400;
        line-height: 26px;
        text-align: center;
        margin-left: 5%;
        cursor: pointer;
      }
    }
  }
  .isChoice {
    color: #38456b;
    border-bottom: 2px solid #1e87f0;
  }
</style>
