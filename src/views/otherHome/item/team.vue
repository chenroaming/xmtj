<template>
  <div class="">
    <div class="header">
      <span
        v-for="item in itemArr"
        :key="item.index"
        :class="{isChoice:nowChoice === item.index}"
        @click="getNotice(item.index)"
      >{{ item.name }}</span>
    </div>
    <div class="body">
      <center v-if="nowChoice === 0" ref="center" />
      <others v-if="nowChoice !== 0" ref="others" :team-type="nowChoice" />
    </div>
  </div>
</template>

<script>
import center from '@/components/otherHome/team/center'
import others from '@/components/otherHome/team/others'
export default {
  name: 'Team',
  components: {
    center, others
  },
  data() {
    return {
      itemArr: [
        { name: '分流中心', index: 0 },
        { name: '联动单位', index: 1 },
        { name: '解纷组织', index: 2 },
        { name: '解纷员', index: 20 }
      ],
      nowChoice: 0
    }
  },
  computed: {

  },
  mounted() {
    this.$emit('update:nowChoice', '队伍管理')
  },
  methods: {
    getNotice(index) {
      this.nowChoice = index
      this.$nextTick(() => {
        if (this.nowChoice === 0) {
          this.$refs.center.getList(this.nowChoice)
        }
        if (this.nowChoice != 0) {
          this.$refs.others.getList(this.nowChoice)
        }
      })
    }
  }
}
</script>

<style scoped lang = "scss">
  .header {
    height: 60px;
    border-bottom: 5px solid #f2f5fa;
    span{
      width: 100px;
      height: 60px;
      line-height: 60px;
      display: inline-block;
      text-align: center;
      cursor: pointer;
    }
  }
  .isChoice {
    border-bottom: 5px solid #007AFF;
  }
</style>
