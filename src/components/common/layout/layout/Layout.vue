<template>
  <div
    class="th_laybox"
    ref='layBox'
    :class="{
      hiddenFooter:hiddenFooter,
      hiddenHeader:hiddenHeader,
      isJrfwFjj:isJrfwFjj,
      isJrfwFgj:isJrfwFgj
    }">
      <div class="th_laybox-header lineargGradientFgj">
          <slot name="header">
            <th-header v-if="hackReset"></th-header>
          </slot>
      </div>
      <div class="th_laybox-cont" ref="layBoxCont">
          <slot></slot>
      </div>
      <div class="th_laybox-footer">
          <slot name="footer">
          </slot>
      </div>
  </div>
</template>

<script>
import ThHeader from '../header/Header.vue'
import ThFooterTab from '../footerTab/FooterTab.vue'

export default {
  name: 'th-layout',
  props: {
    hiddenFooter: {
      type: Boolean,
      default: false
    },
    hiddenHeader: {
      type: Boolean,
      default: false
    },
    loading: {// 加载中
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: '',
      hackReset: true,
      isApp: window.jrfw.isApp(),
      isJrfwFjj: window.jrfw.isJrfwFjj(),
      isJrfwFgj: window.jrfw.isJrfwFgj()
    }
  },
  computed: {
    pageValue () {
      return this.$route.meta.pageValue
    }
  },
  mounted () {
  },
  watch: {
    pageValue (val) {
      window.jrfw.isFirstScreen(val) && (this.active = val)
    },
    scrollTop () {
    },
    active (val) {
      // this.$router.push(val)
    }
  },
  activated () {
    if (this.$refs.layBoxCont.children.length) {
      this.$refs.layBoxCont.children[0].scrollTop = this.$route.meta.scrollTop || 0
    }
  },
  components: {
    ThHeader,
    ThFooterTab
  },
  methods: {
    headerRefresh () {
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    }
  }
}
</script>
<style lang="less" scoped>
.th_laybox{
  height: calc(100%  - @footerHeight);
  padding-top: @headerHeight;
  box-sizing: border-box;
  overflow-y: scroll;
  position: relative;
  -webkit-overflow-scrolling: touch;
    &.isJrfwFgj{
      .th_laybox-header{
        .lineargGradientFgj;
      }
    }
    &.isJrfwFjj{
      .th_laybox-header{
        .lineargGradientFjj;
      }
    }
    &.hiddenFooter{
        height: 100%;
        .th_laybox-footer{
            display: none;
        }
    }
    &.hiddenHeader{
      padding-top: 0;
        .th_laybox-header{
            display: none;
        }
    }
    .th_laybox-header{
      width: 100%;
      height: @headerHeight;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      .lineargGradient;
    }
    .th_laybox-cont{
      height: 100%;
      position: relative;
      background-color: @cf;
      -webkit-overflow-scrolling: touch;
        // overflow-x: hidden;
      /*overflow-y: auto;*/
        >*{
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
    }
    .th_laybox-footer{
        width: 100%;
        height: @footerHeight;
        background-color: @cf;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
    }
}
</style>
