<template>
  <div class="wisdom-judgment-wrapper">
    <!-- <div class="selectBox">
      <Select v-model="data1" style="width:100px">
        <Option value="专业领域" selected="true">专业领域</Option>
        <Option value="专业领域二">专业领域二</Option>
      </Select>
    </div> -->
    <mtitle :title="title" />
    <div class="content">
      <dv-scroll-board :config="config" style="width:100%;height:100%" />
    </div>
  </div>
</template>

<script>
import mtitle from './title'
import echarts from 'echarts'
export default {
  components: {
    mtitle
  },
  props: {
    myData: {
      type: Array,
      default: []
    },
    columnWidth: {
      type: Array,
      default: 300
    },
    title: ''
  },
  data() {
    return {
      // title: ['解纷组织排行榜'],
      data1: '专业领域',
      config: {
        data: this.myData,
        // [
        //     ['1.福建联合信实律师事务所律师解纷工作室', '解纷数量1000+', '解纷员数量: 10+'],
        //     ['2.福建旭丰律师事务所律师解纷工作室', '解纷数量1000+', '解纷员数量: 10+'],
        //     ['3.福建英合律师事务所律师解纷工作室', '解纷数量1000+', '解纷员数量: 10+'],
        //     ['4.福建世礼律师事务所律师解纷工作室', '解纷数量1000+', '解纷员数量: 10+'],
        //     ['5.福建联合信实律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],
        //     ['6.福建旭丰律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],
        //     ['7.福建英合律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],
        //     ['8.福建世礼律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],
        //     ['9.福建英合律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],
        //     ['10.福建世礼律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],
        //     ['1.福建联合信实律师事务所律师解纷工作室', '解纷数量1000+', '解纷员数量: 10+'],
        //     ['2.福建旭丰律师事务所律师解纷工作室', '解纷数量1000+', '解纷员数量: 10+'],
        //     ['3.福建英合律师事务所律师解纷工作室', '解纷数量1000+', '解纷员数量: 10+'],
        //     ['4.福建世礼律师事务所律师解纷工作室', '解纷数量1000+', '解纷员数量: 10+'],
        //     ['5.福建联合信实律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],
        //     ['6.福建旭丰律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],
        //     ['7.福建英合律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],
        //     ['8.福建世礼律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],
        //     ['9.福建英合律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],
        //     ['10.福建世礼律师事务所律师解纷工作室', '年解纷数: 1000+', '解纷员数量: 10+'],

        // ],
        oddRowBGC: '#1D4F74',
        evenRowBGC: '#1D4F74',
        rowNum: '11.5', // 表行数
        columnWidth: this.columnWidth // 可以配置每一列的宽度，默认情况下每一列宽度相等。
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.wisdom-judgment-wrapper {
  height: 100%;
  position: relative;
  .selectBox{
    position: absolute;
    top:0;
    right: 20px;
    display: flex;
    justify-content: space-between;
    ::v-deep .ivu-select-selection{
      background-color: #03183F;
      border:1px solid #243A58;
      color: #c5c8ce;
      // background-image: url("../../../assets/bigData/xm/selectbg.png");
    }
    //  ::v-deep .ivu-select{
    //   // background-color: #03335F;
    //   // border:1px solid #243A58;
    //   color: #c5c8ce;
    //   background-image: url("../../../assets/bigData/xm/selectbg.png");
    // }
    ::v-deep .ivu-select-dropdown{
      background-color: #03335F;
      color: #c5c8ce;
    }
  }
  .content {
    height: calc(100% - 50px);
    background-color: #03183F;
    ::v-deep .row-item{
        margin:5px 10px 5px 10px;
        color:#05e1fe;
        background-image: linear-gradient(to right, #1D4F74 , #02183F);
    }

  }
}
</style>
