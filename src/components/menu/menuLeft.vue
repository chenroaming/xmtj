<template>
  <div class="menu-left-wrapper">
    <div class="register-btn" @click="toAddCase">登记</div>
    <ul class="menuList">
      <li v-for="(item, index) in menuData" :key="index" :class="{'active':menuIndex == index }" @click="selectMenu(index)">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    menuData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      menuIndex: 0
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    selectMenu(index) {
      this.menuIndex = index
      this.$emit('selectMenu', index)
    },
    // 跳转到登录页面
    toAddCase() {
      // 清空上一次可能保留下来的
      this.$store.commit('SET_CASEID', '')
      window.localStorage.setItem('lawCaseId', '')
      this.$router.push({ name: 'step' })
    }
  }
}
</script>

<style scoped lang="scss">
.menu-left-wrapper {
  width: 80px;
  .register-btn {
    width: 100%;
    height: 80px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #F9BC01;
    color: #fff;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .menuList {
    height: auto;
    padding: 10px 0;
    border-radius: 10px;
    background-color: rgba(255,255,255,0.1);
    li {
      height: 60px;
      width: 100%;
      text-align: center;
      line-height: 60px;
      color: #fff;
      margin-top: 10%;
      cursor: pointer;
    }
  }
  .grid-content {
    width: 100%;
    min-height: calc(100vh - 120px);
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 25px;
  }
  .active {
    border-top-left-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: rgba(255,255,225,0.3);
  }
  // ul {
  //   width: 100%;
  //   text-align: center;
  //   background-color: #fff;
  //   box-shadow: 0 3px 6px rgba(0,0,0,.16);
  //   li {
  //     &.active {
  //       box-shadow: 7px 3px 5px rgba(0, 0, 0, 0.16);;
  //       width: 110px;
  //       background-color: #fff;
  //       margin-left: -5px;
  //       z-index: 100;
  //       position: relative;
  //     }
  //     line-height: 80px;
  //     color: #337BEC;
  //     cursor: pointer;
  //   }
  // }
}
</style>
