<template>
  <div class="wisdom-judgment-wrapper">
    <mtitle :title="title" />
    <div class="content">
      <div id="mybar" style="height: 100%;" />
    </div>
  </div>
</template>

<script>
import mtitle from './title'
import echarts from 'echarts'
export default {
  components: {
    mtitle
  },
  props: {
  },
  data() {
    return {
      title: ['解纷类型']
    }
  },
  created() {
  },
  mounted() {
    this.initBar()
  },
  methods: {
    initBar() {
      const myChart = echarts.init(document.getElementById('mybar'))
      // 绘制图表
      const bgColor = '#03183F'
      const title = '人员总数'
      const color = ['#10F1F7', '#00BAFF', '#4AEAB0', '#E9BF07', '#F8456B', '#06FFF']
      const echartData = [{
        name: '调解',
        value: 228
      },
      {
        name: '仲裁',
        value: 110
      },
      {
        name: '公证',
        value: 50
      },
      {
        name: '其他',
        value: 18
      }
      ]

      const formatNumber = function(num) {
        const reg = /(?=(\B)(\d{3})+$)/g
        return num.toString().replace(reg, ',')
      }
      const total = echartData.reduce((a, b) => {
        return a + b.value * 1
      }, 0)

      const option = {
        color: color,
        tooltip: {
          trigger: 'item'
        },
        title: [{
          text: '{name|' + title + '}\n{val|      ' + formatNumber(total) + '}',
          top: 'center',
          left: '27%',
          textStyle: {
            rich: {
              name: {
                fontSize: 20,
                fontWeight: 'normal',
                color: '#18F1F8',
                padding: [10, 0]
              },
              val: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff'

              },
              width: '30px',
              align: 'center'
            }
          }
        }],
        legend: {
          orient: 'vertical',
          icon: 'rect',
          x: '60%',
          y: 'center',
          itemWidth: 12,
          itemHeight: 18,
          align: 'left',
          itemGap: 30,
          textStyle: {
            color: '#fff',
            rich: {
              a: {
                fontSize: 16
              },
              b: {
                fontSize: 16,
                color: '#18F1F8'
              }
            }
          },
          formatter: (name) => {
            const data = echartData
            let total = 0
            let target
            for (let i = 0, l = data.length; i < l; i++) {
              total += data[i].value
              if (data[i].name == name) {
                target = data[i].value
              }
            }
            const arr = [
              '{a|  ' + name + '}' + '{b|      ' + ((target / total) * 100).toFixed(2) + '%}'
            ]
            return arr.join('\n')
          }

        },
        series: [{
          type: 'pie',
          radius: ['45%', '60%'],
          center: ['35%', '50%'],
          data: echartData,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              borderColor: bgColor,
              borderWidth: 2
            }
          },
          // labelLine: {
          //     normal: {
          //         length: 20,
          //         length2: 120,
          //         lineStyle: {
          //             color: '#e6e6e6'
          //         }
          //     }
          // },
          label: {
            normal: {
              show: false
              // formatter: params => {
              //     return (
              //         '{icon|●}{name|' + params.name + '}{value|' +
              //         formatNumber(params.value) + '}'
              //     );
              // },
              // padding: [0 , -100, 25, -100],
              // rich: {
              //     icon: {
              //         fontSize: 16
              //     },
              //     name: {
              //         fontSize: 14,
              //         padding: [0, 10, 0, 4],
              //         color: '#666666'
              //     },
              //     value: {
              //         fontSize: 18,
              //         fontWeight: 'bold',
              //         color: '#333333'
              //     }
              // }
            }
          }
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
.wisdom-judgment-wrapper {
  height: 100%;
  .content {
    height: calc(100% - 50px);
    background-color: #03183F;
    opacity: 0.7;
    #bar {
      width: 100%;
      height: 100%;
      padding: 10px;
    }
  }
}
</style>
