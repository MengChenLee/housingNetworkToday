<template>
  <div class="th_img_text_level">
    <div class="th_img_text_level-left">
      <slot name="left"></slot>
    </div>
    <div class="th_img_text_level-right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-img-text-level',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {

  },
  computed: {

  },
  mounted () {

  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.th_img_text_level{
  height: 100%;
  overflow:hidden;
  position:relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .th_img_text_level-left{
    width: 7rem;
    height: 100%;
    float: left;
    box-sizing:border-box;
  }
  .th_img_text_level-right{
    width: calc(100% - 7rem);
    height: 100%;
    overflow:hidden;
    box-sizing:border-box;
    padding-left: @plrNewsList;
    padding-right: @plrNewsList;
  }
}
</style>
