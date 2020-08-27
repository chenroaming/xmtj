<template>
  <div class="pdf-iframe">
    <div @click="open(srcAry[pdfIndex])">
      <iframe :src="srcAry[pdfIndex]" class="iframe" />
    </div>
    <div v-if="pdfLenth > 1" class="btn-wrapper">
      <a><i class="el-icon-d-arrow-left" @click="prev" /></a>
      <a><i class="el-icon-d-arrow-right" @click="next" /></a>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    pdfUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      srcAry: '',
      pdfLenth: '',
      pdfIndex: 0
    }
  },
  created() {
    this.dealSrc()
  },
  mounted() {

  },
  methods: {
    open(url) {
      window.open(url)
    },
    dealSrc() {
      this.pdfLenth = this.pdfUrl.split(';').length
      this.srcAry = this.pdfUrl.split(';').map(item => {
        item = `https://xmtj.olcourt.cn${item}`
        return item
      })
    },
    // 上一张
    prev() {
      if (this.pdfIndex == 0) {
        return
      }
      this.pdfIndex--
    },
    next() {
      if (this.pdfIndex == this.pdfLenth - 1) {
        return
      }
      this.pdfIndex++
    }
  }
}
</script>

<style scoped lang="scss">
.pdf-iframe {
  .iframe {
    width: 600px;
    height: 500px;
  }
  .btn-wrapper {
    margin-top: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    a {
      color: #fff;
      &:last-child {
        margin-left: 100px;
      }
    }
  }
}
</style>
