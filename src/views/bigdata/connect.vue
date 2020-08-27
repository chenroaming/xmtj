<template>
  <el-row class="el-row-wrapper">
    <!-- <a class="back" @click="back">返回</a> -->
    <span style="position:absolute;top:-44px;left:30px;color:#fff;cursor:pointer;z-index:10" @click="back"><Icon type="ios-undo-outline" size="24" />返回</span>
    <div class="title">{{ courtInfo.name }}</div>
    <div class="content1-wrapper">
      <el-col :span="12" class="text-content">
        <div v-if="courtInfo.beInviteTime" class="text-item">
          <label>对接时间</label>
          <span>{{ courtInfo.beInviteTime | time }}</span>
        </div>
        <div v-if="courtInfo.linkMan" class="text-item">
          <label>联络人</label>
          <span>{{ courtInfo.linkMan }}</span>
        </div>
        <div v-if="courtInfo.phone" class="text-item">
          <label>联系电话</label>
          <span>{{ courtInfo.phone }}</span>
        </div>
        <div v-if="showdutiesOrintroduce == 1" class="text-item">
          <label>主要职责</label>
          <span>{{ courtInfo.duties }}</span>
        </div>
        <div v-if="showdutiesOrintroduce == 2" class="text-item">
          <label>简介</label>
          <span>{{ courtInfo.introduce }}</span>
        </div>
        <div v-if="courtInfo.fileBasis" class="text-item">
          <label>文件依据</label>
          <span>{{ courtInfo.fileBasis }}</span>
        </div>
        <div class="text-item">
          <label />
          <span>
            <button class="connect-btn" @click="getToken">发起视频通话</button>
          </span>
        </div>
      </el-col>
      <el-col :span="12" class="img-wrapper">
        <pdfIframe v-if="courtInfo.fileUrl" :pdf-url="courtInfo.fileUrl" />
      </el-col>
    </div>
  </el-row>
</template>

<script>
import { formatDate } from '@/utils/format.js'
import { getRoomToken } from '@/api/bigdata/index.js'
import { getCourtInfo } from '@/api/common/common.js'
import pdfIframe from './compontents/pdfIframe'
export default {
  components: {
    pdfIframe
  },
  props: {

  },
  data() {
    return {
      time: formatDate(new Date()),
      courtId: '',
      roomName: '',
      courtInfo: '',
      title: ['市人力资源和社会'],
      pdfUrl: '',
      queryPath: ''
    }
  },
  computed: {
    // 显示简介还是显示主要职责
    showdutiesOrintroduce() {
      let index = 0
      if (this.courtInfo.introduce) {
        index = 2
      } else if (this.courtInfo.duties) {
        index = 1
      }
      return index
    }
  },
  created() {
    this.courtId = this.$store.state.bigdata.courtId
    // this.courtId = 'ca3d61a5ad044cb2aa076e5373a647ea'
    this.getCourtInfo()
    this.queryPath = this.$route.query.path
  },
  mounted() {
  },
  methods: {
    // 获取token
    getToken() {
      getRoomToken({ beInviteId: this.courtId }).then(res => {
        if (res.state === 100) {
          this.$router.push({ name: 'videoCom', query: { token: [res.roomToken] }})
        }
      })
    },
    // 获取信息
    getCourtInfo() {
      getCourtInfo({ courtId: this.courtId }).then(res => {
        if (res.state === 100) {
          this.courtInfo = res.courtInfo
        }
      })
    },
    back() {
      if (this.queryPath) {
        this.$router.push(this.queryPath)
      } else {
        this.$store.commit('SET_MENUINDEX', 0)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-row-wrapper {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  padding: 30px 10px;
  .back {
    position: absolute;
    color: #fff;
    right: 20px;
    top: -35px;
    cursor: pointer;
    z-index: 101;
  }
  .title {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/bigData/xm/title.png');
    color: #14B5F1;
    line-height: 40px;
    height: 40px;
    padding-left: 30px;
    font-size: 25px;
  }
  .content1-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #03183f;
    .text-content {
      padding-left: 50px;
      padding-top: 80px;
    }
    .text-item {
      color: white;
      margin-bottom: 50px;
      display: flex;
      label {
        display: inline-block;
        font-size: 25px;
        min-width: 200px;
      }
      span {
        font-size: 20px;
        font-weight: 300;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .connect-btn {
        background-color: transparent;
        border-color: transparent;
        background-size: 100% 100%;
        color: #fff;
        line-height: 80px;
        height: 80px;
        width: 200px;
        margin-left: 150px;
        background-repeat: no-repeat;
        cursor: pointer;
        background-image: url('../../assets/images/connect-btn.png');
        &:active {
          border-color: transparent;
        }
        &:focus {
          border-color: #14B5F1;
        }
      }
      .connect-btn:focus {
        outline: none;
        border-color: transparent;
        box-shadow:none;
      }
    }
  }
  .img-wrapper {
    height: 100%;
    background-image: url('../../assets/bigData/xm/light.png');
    background-repeat: no-repeat;
    background-size: 58% 37%;
    background-position: bottom;
    display: flex;
    padding-top: 100px;
    justify-content: center;
  }
}
</style>
