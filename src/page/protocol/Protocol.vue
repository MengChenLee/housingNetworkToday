<template>
  <div class="th_protocol">
    <th-layout :hiddenFooter="true" ref="layBox">
      <div class="th_protocol-cont" ref="cont" v-html="content">
      </div>
    </th-layout>
  </div>
</template>
<script>
import {setProtocol} from '../../common/httpClient.js'
export default {
  data () {
    return {
      content: ''
    }
  },
  computed: {
    title () {
      switch (this.$route.query.type) {
        case '1':
          return '注册协议'
        case '2':
          return '认证协议'
        case '3':
          return '钱包协议'
        case '4':
          return '隐私保护协议'
        case '5':
          return '楼盘合作协议'
        case '6':
          return '关于我们'
        case '7':
          return '免责说明'
        case '8':
          return '权益'
        case '9':
          return '佣金协议'
        default:
          return '该协议未定义'
      }
    }
  },
  mounted () {
    this.getData()
  },
  activated () {
    this.getData()
  },
  methods: {
    /**
     * 获取协议内容
     * app;//1今日房网 2房经纪 3房管家
     * type协议分类 1注册协议 2 认证协议 3钱包协议 4隐私保护协议 5楼盘合作协议 6关于我们 7免责说明 8权益 9佣金协议
     */
    getData () {
      let data = {
        app: this.$route.query.app,
        type: this.$route.query.type
      }
      setProtocol(data).then((res) => {
        if (res && res.code === 1) {
          this.content = res.content ? res.content.content : this.title
          document.title = res.content ? res.content.title : this.title
          this.$route.meta.title = res.content ? res.content.title : this.title
          this.$refs.layBox.headerRefresh()
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.th_protocol{
 height: 100%;
 .th_protocol-cont{
   padding:.5rem @plrPage*2 2rem;
   color: @c3;
   font-size: @smallFontSize;
   overflow: auto;
   box-sizing: border-box;
 }
}
</style>
