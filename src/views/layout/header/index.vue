<template>
  <div>
    <div id="header" :style="{'height': adaptiveObj.height}">
      <ul v-if="userInfo.roleType != 3" class="menu-wrapper" :style="{'height': adaptiveObj.height, 'line-height': adaptiveObj.height}">
        <!-- <li>
          <img src="@/assets/bc/home.png">
          <span>首页</span>
        </li> -->
        <li v-for="(item, index) in menuData" :key="index" :class="{'active': selectMenu === index}" :style="{'font-size': adaptiveObj.fontSize, 'padding-left': adaptiveObj.padding, 'padding-right': adaptiveObj.padding}" @click="selectMenu1(index, item.path)">
          <img :src="item.url" :style="{'width': adaptiveObj.imgWidth}">
          <span :style="{'margin-right': adaptiveObj.margin}">{{ item.text }}</span>
        </li>
      </ul>
      <div class="header-inner" :style="{'--fz': adaptiveObj.adaptiveSize}">
        <div class="info-wrapper">
          <el-dropdown>
            <span class="el-dropdown-link">
              <div class="info-inner">
                <div class="avator">
                <!-- <img
                    src="@/assets/logo.png"
                    alt=""
                  > -->
                </div>
                <div class="info">
                  <div class="name">{{ userInfo.result.name }}</div>
                  <div class="role">{{ userRole }}</div>
                </div>
                <div class="icon">
                  <i class="el-icon-caret-bottom info-icon" />
                </div>
              </div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="resetPwd">重置密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <modal
      :title="'重置密码'"
      :modal-visible="modalVisible"
      @changeModalVisible="changeModalVisible"
      @submitModal="submitResetPwd"
    >
      <div class="form-item">
        <div class="label">旧密码</div>
        <div class="input">
          <el-input v-model="pwdParam.oldPassword" type="password" placeholder="请输入内容" />
        </div>
      </div>
      <div class="form-item">
        <div class="label">新密码</div>
        <div class="input">
          <el-input v-model="pwdParam.newPassword1" type="password" placeholder="请输入内容" />
        </div>
      </div>
      <div class="form-item">
        <div class="label">确认密码</div>
        <div class="input">
          <el-input v-model="pwdParam.newPassword2" type="password" placeholder="请输入内容" />
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import md5 from 'md5'
import modal from '@/components/modal/modal'
import { mapGetters } from 'vuex'
import { ROLEMAP } from '@/utils/constVal'

const menuMap = {
  'otherHome': 0,
  'index': 0,
  'news': 0,
  'team': 0,
  'account': 0,
  'homeIndex': 2,
  'caseIndex': 2,
  'addCase': 2,
  'step': 2,
  'step1': 2,
  'step2': 2,
  'step3': 2,
  'step4': 2,
  'rtcIndex': 3,
  'VisualizationIndex': 1
}
export default {
  components: {
    modal
  },
  data() {
    return {
      userInfo: null,
      userRole: null,
      modalVisible: false,
      socket: '',
      pwdParam: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
      },
      menuData: [
        {
          url: require('@/assets/bc/home.png'),
          text: '首页',
          path: '/otherHome/index'
        },
        {
          url: require('@/assets/bc/visualization.png'),
          text: '可视化',
          path: '/visualization/index'
        },
        {
          url: require('@/assets/bc/caseMana.png'),
          text: '案件管理',
          path: '/home/index'
        },
        {
          url: require('@/assets/bc/solve.png'),
          text: '在线解纷',
          path: '/rtc/index'
        }
      ],
      adaptiveSize: '10',
      selectMenu: 0,
      adaptiveObj: {
        height: '85px',
        fontSize: '16px',
        imgWidth: '18px',
        padding: '30px',
        margin: '15px',
        adaptiveSize: '10px'
      },
      screenHeight: document
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  mounted() {
    // this.selectMenu = 0
    this.adaptive()
  },
  created() {
    this.getInfo()
    this.getselectMenu()
    this.socket1()
  },
  methods: {
    // 退出登录
    async logout() {
      await this.$store.dispatch('LogOut')
      location.reload()
    },
    // 自适应大小
    adaptive() {
      console.log(5555555)
      // 大小比例为 1920 ：10
      this.adaptiveSize = this.adaptiveSize * document.body.clientWidth / 1920
      this.adaptiveObj.height = this.adaptiveSize * 8.5 + 'px'
      this.adaptiveObj.fontSize = this.adaptiveSize * 1.6 + 'px'
      this.adaptiveObj.imgWidth = this.adaptiveSize * 1.8 + 'px'
      this.adaptiveObj.padding = this.adaptiveSize * 3 + 'px'
      this.adaptiveObj.margin = this.adaptiveSize * 1.5 + 'px'
      this.adaptiveObj.adaptiveSize = this.adaptiveSize + 'px'
    },
    clickdropdown() {},
    // 获取用户信息
    getInfo() {
      this.userInfo = this.getUserInfo
      const roleType = this.userInfo.roleType
      this.userRole = ROLEMAP[roleType]
    },
    // 选择菜单
    selectMenu1(index, url) {
      this.selectMenu = index
      if (!url) {
        return
      }
      if (this.$route.path === url) {
        return false
      }
      this.$router.push(url)
    },
    resetPwd() {
      this.modalVisible = true
    },
    changeModalVisible() {
      this.modalVisible = false
    },
    // 判断当前地址为哪个菜单
    getselectMenu() {
      console.log('路由地址')
      console.log(this.$route)
      this.selectMenu = menuMap[this.$route.name]
      console.log('-------selectMenu-----')
      console.log(this.selectMenu)
    },
    // 重置密码提交
    submitResetPwd() {
      if (!this.pwdParam.oldPassword) {
        this.$message({
          showClose: true,
          message: '请输入旧密码',
          type: 'error'
        })
        return
      }
      if (!this.pwdParam.newPassword1) {
        this.$message({
          showClose: true,
          message: '请输入新密码',
          type: 'error'
        })
        return
      }
      if (!this.pwdParam.newPassword2) {
        this.$message({
          showClose: true,
          message: '请输入确认密码',
          type: 'error'
        })
        return
      }
      if (this.pwdParam.newPassword1.length < 6 || this.pwdParam.newPassword1.length > 12) {
        this.$message({
          showClose: true,
          message: '新密码位数为6-12位',
          type: 'error'
        })
        return
      }
      if (this.pwdParam.newPassword2.length < 6 || this.pwdParam.newPassword2.length > 12) {
        this.$message({
          showClose: true,
          message: '新密码位数为6-12位',
          type: 'error'
        })
        return
      }
      const modifyPassword = require('@/api/user/user.js').modifyPassword
      const params = {
        oldPassword: md5(this.pwdParam.oldPassword),
        newPassword1: md5(this.pwdParam.newPassword1),
        newPassword2: md5(this.pwdParam.newPassword2)
      }
      modifyPassword(params).then(res => {
        if (res.state === 100) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          this.modalVisible = false
        }
      })
    },
    socket1() {
      const host = location.host
      let socketUrl = ''
      if (host.indexOf('localhost') === 0) { // 判断是否本第还是线上
        socketUrl = `ws://${host}`
      } else {
        socketUrl = `wss://${host}`
      }
      this.socket = new WebSocket(`${socketUrl}/api/web/webSocket.jhtml`)
      // this.socket = new WebSocket('ws://localhost:8083/api/web/webSocket.jhtml')
      this.socket.onopen = function() {
        console.log('websocket连接成功')
      }
      this.socket.onmessage = (e) => {
        console.log(JSON.parse(e.data))
        const data = JSON.parse(e.data)
        if (data.beInviteId) { // 判断是否有邀请的机构
          this.$confirm(`${data.message}`)
            .then(_ => {
              this.$store.commit('SET_COURTID', data.inviteId)
              this.$router.replace({ path: '/redirect/videoCom', query: { token: [data.roomToken] }})
            })
            .catch(_ => {
              const params = {
                inviteId: data.inviteId,
                beInviteId: data.beInviteId,
                inviteType: false
              }
              const beInviteIntoRoom = require('@/api/bigdata/index').beInviteIntoRoom
              beInviteIntoRoom(params)
            })
        } else {
          this.$message.error(data.message)
        }
      }
      this.socket.onerror = function() {
        console.log('WebSocket连接发生错误')
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

html,
body,
#app,
.el-container,
#asideNav,
ul.el-menu {
  @extend %h100;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}
#header {
  /* max-height: 80px;
  line-height: 80px; */
  position: fixed;
  top: 0;
  height: 80px;
  width: 100%;
  font-size: 0px;
  .header-inner {
    float: right;
    > div {
      display: inline-block;
    }
    .icon-wrapper {
      position: relative;
      i {
        font-size: 25px;
        color: #131026;
        text-align: center;
        margin-right: 30px;
        position: relative;
        top: 5px;
      }
      .number {
        position: absolute;
        display: inline-block;
        width: 18px;
        height: 18px;
        background-color: #ec4c4d;
        color: #fff;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
        right: 25px;
        top: 23px;
      }
    }
    .el-dropdown {
      top: calc(var(--fz) * 1.5);
    }
    .info-inner {
      display: flex;
      height: 50%;
      line-height: 50%;
      color: #fff;
      .avator {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 12px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .info {
        height: calc(var(--fz) * 5);
        text-align: left;
        margin-right: calc(var(--fz) * 2);
        .name {
          font-size: calc(var(--fz) * 1.5);
          line-height: calc(var(--fz) * 3.7);
          height: calc(var(--fz) * 3);
        }
        .role {
          font-size: calc(var(--fz) * 1.2);
          line-height: calc(var(--fz) * 1.2);
          height: calc(var(--fz) * 1.2);
        }
      }
      .icon {
        line-height: calc(var(--fz) * 5);
      }
      .info-icon {
        margin-right: calc(var(--fz) * 1) !important;
        font-size: calc(var(--fz) * 2);
      }
    }
  }
  .menu-wrapper {
    display: inline-flex;
    color: #fff;
    margin-left: 25%;
    height: 80px;
    line-height: 80px;
    li {
      padding: 0 30px;
      cursor: pointer;
      &.active {
        background-image: url('../../../assets/bc/menuSelectbc.png');
        background-size: 100%;
        background-repeat: no-repeat;
        background-position-y: 50%;
      }
      img {
        margin-top: calc(var(--fz) * 0.5);
        margin-right: calc(var(--fz) * 0.5);
        position: relative;
        top: calc(var(--fz) * 0.3);
        margin-left: calc(var(--fz) * 1.5);
      }
      span {
        display: inline-block;
        margin-right: 15px;
      }
    }
  }
}
.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .label {
    width: 60px;
  }
  .input {
    width: 300px;
  }
  .code {
    cursor: pointer;
  }
}

</style>
