<template>
  <div class="base-info-wrapper">
    <div class="content-left">
      <menuLeft :menu-data="menuData" />
    </div>
    <div class="content-right">
      <baseInfo />
      <dispute />
      <litigant />
      <evidence />
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu/caseMenuLeft'
import baseInfo from './components/baseInfo'
import dispute from './components/dispute'
import litigant from './components/litigant'
import evidence from './components/evidence'
import { mapGetters } from 'vuex'
export default {
  components: {
    menuLeft,
    baseInfo,
    dispute,
    litigant,
    evidence
  },
  props: {

  },
  data() {
    return {
      menuData: [{
        content: '基本信息',
        color: '#F4AA5A'
      }, {
        content: '纠纷概况',
        color: '#7AC246'
      }, {
        content: '当事人信息',
        color: '#649BED'
      }, {
        content: '证据信息',
        color: '#EB6E63'
      }]
    }
  },
  computed: {
    ...mapGetters(['getCaseInfo'])
  },
  created() {
    this.$store.dispatch('GetCaseInfo')
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.base-info-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  .content-left {
    width: 150px;
  }
  .content-right {
    width: calc(100% - 150px);
    padding-left: 30px;
  }
}
</style>
