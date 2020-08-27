<template>
  <div class="wisdom-judgment-wrapper">
    <mtitle :title="title" />
    <div class="content">
      <div class="contentBox">
        <h1 class="title">组织资源数量</h1>
        <div class="numBox">
          <!-- <span>2</span>
              <span>3</span>
              <span style="border:none;background:none">,</span>
              <span>4</span>
              <span>5</span>
              <span>6</span> -->
          <span v-for="(item,key) in tiao" :key="key">{{ item }}</span>
        </div>
      </div>
      <div class="contentBox">
        <h1 class="title">解纷人员</h1>
        <div class="numBox">
          <!-- <span>2</span>
              <span>3</span>
              <span style="border:none;background:none">,</span>
              <span>4</span>
              <span>5</span>
              <span>6</span> -->
          <span v-for="(item,key) in man" :key="key">{{ item }}</span>
        </div>
      </div>
      <div class="contentBox">
        <h1 class="title">解纷人员平均年办案数</h1>
        <div class="numBox">
          <!-- <span>2</span>
              <span>3</span>
              <span style="border:none;background:none">,</span>
              <span>4</span>
              <span>5</span>
              <span>6</span> -->
          <span v-for="(item,key) in num" :key="key">{{ item }}</span>
        </div>
      </div>
      <div class="contentBox">
        <h1 class="title">成讼数</h1>
        <div class="numBox">
          <!-- <span>2</span>
              <span>3</span>
              <span style="border:none;background:none">,</span>
              <span>4</span>
              <span>5</span>
              <span>6</span> -->
          <span v-for="(item,key) in num2" :key="key">{{ item }}</span>
        </div>
      </div>
      <div class="contentBox">
        <h1 class="title">化解成功率</h1>
        <div class="numBox">
          <!-- <span>2</span>
              <span>3</span>
              <span style="border:none;background:none">,</span>
              <span>4</span>
              <span>5</span>
              <span>6</span> -->
          <span v-for="(item,key) in num3" :key="key">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mtitle from './title'
import echarts from 'echarts'
import { searchUnit } from '../../../api/common/resolvingDisputes.js'
export default {
  components: {
    mtitle
  },
  props: {
  },
  data() {
    return {
      title: [' '],
      tiao: '',
      man: '',
      num: '60',
      num2: '2217',
      num3: '85.16%'
    }
  },
  created() {

  },
  mounted() {
    searchUnit().then(res => {
      console.log(res)
      if (res.state == 100) {
        this.tiao = res.data.tiao.toString()
        this.man = res.data.man.toString()
        console.log(this.tiao, this.man)
      }
    })
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.wisdom-judgment-wrapper {
  height: 100%;
  .content {
    height: calc(100% - 50px);
    background-color: #03183F;
    .contentBox{
        height: 20%;
        padding: 20px 80px 20px 80px;
        text-align: center;
        .title{
            font-size: 20px;
            color: #fff;
            height: 10%;
            background-image: url('../../../assets/bigData/xm/titlebg.png');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position-y: bottom;
        }
        .numBox{
            font-size: 26px;
            color: #05e1fe;
            height: 90%;
            display: flex;
            justify-content:center;
            align-items:center;
            span{
                padding: 10px;
                margin: 50px 15px 15px 15px;
                display: inline-block;
                border:1px solid #3B74C6;
                background-color: rgba(59, 116, 198,0.2);
            }
        }
    }
  }
}
</style>
