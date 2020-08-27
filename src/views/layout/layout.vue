<template>
  <div
    class="app-wrapper"
    :style="{'--fz': fontSize+'px'}"
  >
    <!-- <sidebar class="sidebar-container"></sidebar> -->
    <div
      class="main-container"
    >
      <my-header />
      <!-- 菜单选项卡 -->
      <!-- 视图容器 -->
      <div class="main-content">
        <router-view class="viewStyle" />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './header/'
export default {
  components: { MyHeader },
  data() {
    return {
      fontSize: '10'
    }
  },
  computed: {
  },
  mounted() {
    this.adaptive()
  },
  methods: {
    adaptive() {
      // 大小比例为 1920 ：10
      this.fontSize = this.fontSize * document.body.clientWidth / 1920
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
.app-wrapper {
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  overflow-y: hidden;;
  // overflow: hidden;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #FFF;
  background-image: url('../../assets/bc/bc.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .main-container {
    width: 100%;
  }
  .main-content {
    width: 100%;
    min-height: calc(100vh - 80px);
    padding: 20px;
    position: fixed;
    top: calc(var(--fz) * 8);
    bottom: 0px;
    overflow: auto;
  }
  .viewStyle {
    /* width: 100%; */
    /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16); */
  }
  .btnColor {
    background-color: #5585c9;
  }
}
</style>
