<template>
  <div>
    <div class="card-box">
      <div class="unit-box">
        <el-row :gutter="20">
          <el-col v-for="item in unitArr" :key="item.id" :span="4">
            <div class="unit" :class="{ 'isChoice': choiceId === item.id }">{{ item.name }}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getMediater } from '@/api/common/common'
export default {
  name: 'SelectUnit',
  data() {
    return {
      choiceId: 0,
      unitArr: [],
      other: '',
      registerCourt: {}
    }
  },
  computed: {

  },
  mounted() {
    getMediater({ courtType: 1, pageSize: 100 }).then(({ content }) => {
      this.unitArr = content
    })
  },
  methods: {
    choice(item) {
      this.registerCourt = item
      this.choiceId = item.id
    },
    go() {
      if (!this.choiceId) {
        return this.$message.warning('请选择受理单位！')
      }
      // addCase().then(({ lawCaseId, state }) => {
      //   if (state === 100) {
      //     this.$store.commit('SET_CASEID', lawCaseId)
      //     window.localStorage.setItem('lawCaseId', lawCaseId)
      //     this.$store.commit('SET_COURT', this.registerCourt)
      //     this.$router.push({ name: 'step1' })
      //   }
      // })
      this.$store.commit('SET_COURT', this.registerCourt)
      this.$router.push({ name: 'step5' })
    },
    cancel() {
      this.$router.push({ name: 'step5' })
    }
  }
}
</script>

<style scoped lang = "scss">
  .box-card {
    width: 95%;
    height: 88%;
    position: absolute;
    /* top: 10%; */
    left: 2.5%;
  }
  .card-box {
    width: 90%;
    height: 90%;
    margin: 0 auto;
    margin-top: 3%;
    h2 {
      display: inline-block;
      height: 50px;
      text-align: left;
      color: #4495FF;
      font-size: 24px;
      font-weight: bold;
      border-bottom:3px solid;
    }
    .footer {
      width: 500px;
    }
    .unit-box {
      width: 100%;
      height: 80%;
      overflow: auto;
      .el-row {
        width: 100%;
        height: 100%;
      }
      .unit {
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        color: #757575;
        cursor: pointer;
      }
      .isChoice {
        font-size: 16px;
        color: #4495FF;
      }
    }
  }

</style>
