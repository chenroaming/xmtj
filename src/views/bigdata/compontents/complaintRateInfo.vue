<template>
    <div class="wisdom-judgment-wrapper">
      <span @click="goBack()" style="position:absolute;top:-60px;left:30px;color:#fff;cursor:pointer;z-index:10"><Icon type="ios-undo-outline" size="24"/>返回</span>
      <el-row :gutter="20" class="one-wrapper">
        <h1 style="color:#fff;position:absolute;left:20px;font-size:24px">2019年厦门万人成讼率157.12，同比增加<img   style="height: 26px;position: relative;top: 6px;left:5px;right:5px" src="../../../assets/bigData/xm/red.png" alt=""> 14.52%</h1>
          <div class="time-wrapper myTimeBox" >
             <el-date-picker
              v-model="value1"
              type="monthrange"
              range-separator="-"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              :clearable="false"
              >
            </el-date-picker>
          </div>
      </el-row>
      <el-row :gutter="20" class="two-wrapper">
          <el-col :span="8">
              <div class="left-wrapper">
                  <complaintRateInfoOne title='思明区' renkou="102.3万" anjianshu='24860' cengshu="243.01" tongbi="19.36" state="1"/>
              </div>
          </el-col>
          <el-col :span="8">
              <div class="center-wrapper">
                  <complaintRateInfoOne title='湖里区' renkou="102.6万" anjianshu='16436' cengshu="160.19" tongbi="48.80" state="1" />
              </div>
          </el-col>
          <el-col :span="8">
              <div class="right-wrapper">
                  <complaintRateInfoOne title='海沧区' renkou="41.6万" anjianshu='5038' cengshu="121.11" tongbi="7.65"  state="1" />
              </div>
          </el-col>
      </el-row>
      <el-row :gutter="20" class="three-wrapper">
          <el-col :span="8">
              <div class="left-wrapper">
                  <complaintRateInfoOne  title='集美区' renkou="74.8万" anjianshu='7936' cengshu="106.10"  tongbi="11.59" state="1"/>
              </div>
          </el-col>
          <el-col :span="8">
              <div class="center-wrapper">
                  <complaintRateInfoOne title='同安区' renkou="66.3万" anjianshu='6520' cengshu="98.34" tongbi="0.31" state="1"/>
              </div>
          </el-col>
          <el-col :span="8">
              <div class="right-wrapper">
                  <complaintRateInfoOne title='翔安区' renkou="41.4万" anjianshu='4843' cengshu="116.98" tongbi="7.56"  state="0"/>
              </div>
          </el-col>
      </el-row>
    </div>
</template>

<script>
import mtitle from './title'
import echarts from 'echarts'
import complaintRateInfoOne from './complaintRateInfoOne'
export default {
  components: {
    mtitle,
    complaintRateInfoOne
  },
  props: {
  },
  data() {
    return{
      value1: '',
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

.myTimeBox{
  .triangle{
    position: absolute;
    top: 10px;
    right: 85px;
    z-index: 10;
  }
  ::v-deep .el-picker-panel {
    background-color: #03183F!important;
  }
  ::v-deep .el-date-editor {
    width: 190px!important;
    margin-left:40px!important;
    height: 30px;
    margin-top:5px;
    border:1px solid #243A58;
    background-color: #03183F;
    color: #fff!important;
   .el-range__icon{
      line-height: 25px;
    }
    .el-range__close-icon{
      display: none;
    }
    input{
      background-color: #03183F;
      color: #fff!important;
    }
    span{
      color: #fff;
      display: contents;
      // background-color: #03183F;
    }
  }
  
  
  .el-range-editor.is-active, .el-range-editor.is-active:hover{
    border:none;
  }
}
.wisdom-judgment-wrapper{
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-top: 0px;
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
  .one-wrapper{
    height: 10%;
    padding-bottom: 20px!important;
    .time-wrapper{
      height: 100%;
      float: right;
      width: 300px;
      padding-right: 30px!important;
     
      // background-image: url('../../../assets/bigData/xm/timebg.png');
      // background-repeat: no-repeat;
    }
  }
  .two-wrapper{
    height: 45%;
    background-color: #020D32;
  }
  .three-wrapper{
    height: 45%;
    background-color: #020D32;
  }
  &>.el-row {
    width: 100%;
    padding-bottom:40px;
    &>.el-col {
      height: 100%;
      .left-wrapper {
          height: 100%;
          width: 100%;
      }
      .center-wrapper {
          height: 100%;
          width: 100%;
      }
      .right-wrapper {
          height: 100%;
          width: 100%;
      }
    }
    
  }
}
</style>
