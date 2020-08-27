<template>
  <el-col :span="6">
    <div class="card">
      <div class="title1">
        公告
      </div>
      <div class="showMore">
        <el-button type="text" @click="showMore">查看更多</el-button>
      </div>
      <div class="notice-box">
        <div v-for="item in caseList" :key="item.name" class="notice-item">
          <p>{{ item.title }}</p>
          <span>{{ item.sendName }}</span>
          <span>{{ item.date }}</span>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
import { listAffiche } from '@/api/otherHome/otherHome'
export default {
  name: 'Notice',
  data() {
    return {
      caseList: [
        { title: '某某案由本月新收案数1111111111111111111', sendName: '厦门中级人民法院', date: '2020-7-20' },
        { title: '某某案由本月新收案数2222222222222222222', sendName: '厦门中级人民法院', date: '2020-7-20' },
        { title: '某某案由本月新收案数3333333333333333333', sendName: '厦门中级人民法院', date: '2020-7-20' }
      ]
    }
  },
  computed: {

  },
  mounted() {
    this.getList()
  },
  methods: {
    exChange(time) {
      const myDate = new Date(time)
      return `${myDate.getFullYear()}-${(myDate.getMonth() + 1)}-${myDate.getDate()}`
    },
    getList(pageNum = 1) {
      const params = {
        pageNum: 1,
        pageSize: 7
      }
      listAffiche(params).then(res => {
        const data = res.data.map(item => {
          return {
            ...item,
            title: item.title,
            sendName: item.admin.name,
            date: this.exChange(item.sendDate)
          }
        })
        this.caseList = data
      })
    },
    showMore() {
      this.$router.push({ path: '/otherHome/news' })
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
    .showMore {
      display: inline-block;
      width: 25%;
    }
  }
  .notice-box {
    height: auto;
    padding: 15px;
    .notice-item {
      height: 60px;
      border-bottom: 1px solid #DEDEDE;
      p:nth-child(1){
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 30px;
        height: 30px;
      }
      span:nth-child(2){
        display: inline-block;
        width: 58%;
        font-size: 12px;
      }
      span:nth-child(3){
        display: inline-block;
        width: 40%;
        font-size: 12px;
        text-align: right;
      }
    }
  }
</style>
