<template>
  <div class="">
    <el-row :gutter="20">
      <el-col :span="2">
        <ul class="menuList">
          <li
            v-for="item in menuList"
            :key="item.name"
            :class="{ isChoice:nowChoice === item.name }"
            @click="go(item)"
          >{{ item.name }}</li>
        </ul>
      </el-col>
      <el-col :span="22">
        <div class="grid-content">
          <router-view :now-choice.sync="nowChoice" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'OtherHome',
  data() {
    return {
      menuList: [
        { name: '首页', path: '/otherHome/index' },
        { name: '资讯管理', path: '/otherHome/news' },
        { name: '队伍管理', path: '/otherHome/team' }
        // { name: '账号管理', path: '/otherHome/account' }
      ],
      nowChoice: ''
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    go({ name, path }) {
      if (this.$route.path === path) return false
      this.$router.push({ path: path })
    }
  }
}
</script>

<style scoped lang = "scss">
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
  .isChoice {
    border-top-left-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: rgba(255,255,225,0.3);
  }
</style>
