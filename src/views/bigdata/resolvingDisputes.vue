<template>
  <div class="resolving-disputes-wrapper">
    <span style="position:absolute;top:-60px;left:30px;color:#fff;cursor:pointer;z-index:10" @click="goBack()"><Icon type="ios-undo-outline" size="24" />返回</span>
    <div class="selectBox">
      <Select v-model="thisTime" style="width:100px">
        <Option value="2020">2020年</Option>
        <Option value="2019">2019年</Option>
      </Select>
    </div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="left-wrapper">
          <resolvingDisputesLeft />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="center-wrapper">
          <div class="center-wrapper-top">
            <resolvingDisputesCenter1 />
          </div>
          <div class="center-wrapper-bottom">
            <resolvingDisputesCenter2 :title="['解纷组织排行榜']" :my-data="myData1" :column-width="['300']" />
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="local1-wrapper">
        <div class="right-wrapper">
          <div class="right-wrapper-top">
            <resolvingDisputesRight1 />
          </div>
          <div class="right-wrapper-bottom">
            <resolvingDisputesCenter2 :title="['解纷人员排行榜']" :my-data="myData2" :column-width="['150','200']" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import resolvingDisputesLeft from './compontents/resolvingDisputesLeft'
import resolvingDisputesCenter1 from './compontents/resolvingDisputesCenter1'
import resolvingDisputesCenter2 from './compontents/resolvingDisputesCenter2'
import resolvingDisputesRight1 from './compontents/resolvingDisputesRight1'
export default {
  components: {
    resolvingDisputesLeft,
    resolvingDisputesCenter1,
    resolvingDisputesCenter2,
    resolvingDisputesRight1
  },
  props: {

  },
  data() {
    return {
      thisTime: '2020',
      //  myData1:[
      //             ['1.福建天衡联合律师事务所律师调解工作室', '调解员数量: 25'],
      //             ['2.福建旭丰律师事务所律师调解工作室', '调解数量1000+', '调解员数量: 21'],
      //             ['3.福建英合律师事务所律师调解工作室', '年调解数: 1000+', '调解员数量: 20'],
      //             ['4.福建瀛坤律师事务所律师调解工作室', '年调解数: 1000+', '调解员数量: 17'],
      //             ['5.福建联合信实律师事务所律师调解工作室', '调解数量1000+', '调解员数量: 17'],
      //             ['6.厦门证券期货基金业协会纠纷调解委员会', '年调解数: 1000+', '调解员数量:15'],
      //             ['7.上海段和段（厦门）律师事务所律师调解工作室', '年调解数: 1000+', '调解员数量: 11'],
      //             ['8.厦门市医患纠纷调解委员会', '年调解数: 1000+', '调解员数量: 10'],
      //             ['9.福建均融律师事务所律师调解工作室', '调解数量1000+', '调解员数量: 9'],
      //             ['10.福建世礼律师事务所律师调解工作室', '年调解数: 1000+', '调解员数量: 6'],
      //         ],
      myData1: [
        ['1.厦门市中级人民法院诉调对接中心', '解纷员数量: 4', '调解数量: 1185'],
        ['2.集美区调解点', '解纷员数量: 3', '调解数量: 159'],
        ['3.上海段和段（厦门）律师事务所', '解纷员数量: 2', '调解数量: 135'],
        ['4.厦门市物业管理协会', '解纷员数量: 1', '调解数量: 126'],
        ['5.福建旭丰律师调解工作室', '解纷员数量: 2', '调解数量: 117'],
        ['6.北京盈科（厦门）律师事务所', '解纷员数量: 1', '调解数量: 115'],

        ['7.福建联合信实律师调解工作室', '解纷员数量: 1', '调解数量: 111'],

        ['8.福建世礼律师调解工作室', '解纷员数量: 1', '调解数量: 106'],
        ['9.厦门市思明区工商业联合会', '解纷员数量: 1', '调解数量: 81'],
        ['10.翔安调解点', '解纷员数量: 3', '调解数量: 72']
      ],
      myData2: [
        ['1.齐国英', '调解数量: 1169', '成功率：47.1343%'],
        ['2.吴月玲', '调解数量: 1145', '成功率：2.6201%'],
        ['3.陈慧玲', '调解数量: 1068', '成功率：45.6929%'],
        ['4.刘爱国', '调解数量: 1030', '成功率：53.301%'],
        ['5.黄琳娜', '调解数量: 1029', '成功率：57.9203%'],
        ['6.吴灿煌', '调解数量: 987', '成功率：6.4843%'],
        ['7.陈亮', '调解数量: 838', '成功率：63.2458%'],
        ['8.李江明', '调解数量: 638', '成功率：1.7241%'],
        ['9.李金志', '调解数量: 594', '成功率：49.6633%'],
        ['10.陈妹芬', '调解数量: 403', '成功率：52.3573%']

      ]
    }
  },
  created() {

  },
  mounted() {
    var now = new Date()
    var year = now.getFullYear() // 得到年份
    var month = now.getMonth() // 得到月份
    this.value1 = [now.getFullYear() + '-' + (now.getMonth()), now.getFullYear() + '-' + (now.getMonth() + 1)]
  },
  methods: {
    goBack() {
      this.$store.commit('SET_MENUINDEX', 0)
    }

  }
}
</script>

<style scoped lang="scss">
.resolving-disputes-wrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-top: 0px;
  padding-left: 30px;
  position: relative;
  .selectBox{
    position: absolute;
    top:-40px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    width: 100px;
    ::v-deep .ivu-select-selection{
      background-color: #03183F;
      border:1px solid #243A58;
      color: #c5c8ce;
    }
    ::v-deep .ivu-select-dropdown{
      background-color: #03335F;
      color: #c5c8ce;
    }
  }
  &>.el-row {
    height: 100%;
    &>.el-col {
      height: 100%;
    }
  }
  .left-wrapper {
    height: 100%;
    width: 100%;
  }
  .center-wrapper {
    height: 100%;
    width: 100%;
    .center-wrapper-top{
        height: 40%;
        width: 100%;
    }
    .center-wrapper-bottom{
        height: 60%;
        width: 100%;
    }
  }
  .right-wrapper {
    height: 100%;
    width: 100%;
    .right-wrapper-top{
        height: 40%;
        width: 100%;
    }
    .right-wrapper-bottom{
        height: 60%;
        width: 100%;
    }
  }

}
</style>
