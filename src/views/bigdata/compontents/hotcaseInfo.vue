<template>
    <div class="wisdom-judgment-wrapper" style="background-color: #030F34!important;">
      <span @click="goBack()" style="position:absolute;top:-60px;left:30px;color:#fff;cursor:pointer;z-index:10"><Icon type="ios-undo-outline" size="24"/>返回</span>
      <div class="selectBox">
        <div>
          <Select v-model="model1" style="width:100px">
              <Option value="2020">2020年</Option>
              <Option value="2019">2019年</Option>
          </Select>
        </div>
        <div>
          <Select v-model="model2" style="width:200px">
              <Option v-for="item in selectLabel" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </div>
      </div>
      <el-row :gutter="20">
          <el-col :span="12">
              <div class="left-wrapper">
                  <hotcaseInfoLeft />
              </div>
          </el-col>
          <el-col :span="12" class="right-wrapper">
            <el-row class="Right1">
                <hotcaseInfoRight1  :title="[model1+'-'+model2+'-'+'收案数']"/>
              </el-row >
              <el-row class="Right2">
                <hotcaseInfoRight2 :title="[model1+'-'+model2+'-'+'收案数同/环比趋势']"/>
              </el-row>
              <el-row class="Right3">
                <hotcaseInfoRight3 :title="[model1+'-'+model2+'-'+'化解成功率趋势']"/>
              </el-row>
          </el-col>
      </el-row>
    </div>
</template>

<script>
import mtitle from './title'
import echarts from 'echarts'
import hotcaseInfoLeft from './hotcaseInfoLeft'
import hotcaseInfoRight1 from './hotcaseInfoRight1'
import hotcaseInfoRight2 from './hotcaseInfoRight2'
import hotcaseInfoRight3 from './hotcaseInfoRight3'
export default {
  components: {
    mtitle,
    hotcaseInfoLeft,
    hotcaseInfoRight1,
    hotcaseInfoRight2,
    hotcaseInfoRight3
  },
  props: {
    
  },
  data() {
    return{
      model1:"2020",
      model2:"房屋租赁合同纠纷",
      selectLabel: ['房屋租赁合同纠纷', '离婚纠纷', '追偿权纠纷', '合同纠纷', '金融借款合同纠纷', '信用卡纠纷', '机动车交通事故责任纠纷', '物业服务合同纠纷', '买卖合同纠纷','民间借贷纠纷'],
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    goBack(){
      this.$store.commit('SET_MENUINDEX', 1)
    },
    
  }
}
</script>

<style scoped lang="scss">
.wisdom-judgment-wrapper{
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-top: 0px;
  padding-left: 30px;
  position: relative;
  .selectBox{
    position: absolute;
    top:-40px;
    right: 10%;
    display: flex;
    justify-content: space-between;
    width: 330px;
    ::v-deep .ivu-select-selection{
      background-color: #03183F;
      border:1px solid #243A58;
      color: #c5c8ce;
    }
    ::v-deep .ivu-select-dropdown{
      background-color: #03183F;
      color: #c5c8ce;
    }
  }
  &>.el-row {
    height: 100%;
    &>.el-col {
      height: 100%;
      .left-wrapper {
          height: 100%;
          width: 100%;
      }
      .right-wrapper {
          height: 100%;
          width: 100%;
      }
      .Right1{
        height: 33%;
      }
      .Right2{
        height: 33%;
      }
      .Right3{
        height: 33%;
      }
    }
    
  }
}
</style>
