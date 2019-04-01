<template>
  <div class="th_my_iframe">
    <th-layout :hiddenFooter="true">
      <div class="th_my_iframe-cont" ref="cont">
        <img :src="decodeURIComponent($route.query.url)" />
        <!-- <iframe  class="myIframe" :src="decodeURIComponent($route.query.url)"></iframe> -->
      </div>
    </th-layout>
  </div>
</template>

<script>
export default {
  created () {
    this.$route.query.title && (document.title = this.$route.query.title)
  }
}
</script>

<style scoped lang='less'>
.th_my_iframe{
  height: 100%;
  .th_my_iframe-cont{
    width: 100%;
    height: 100%;
    border: 0;
    img{
      max-width: 100%;
    }
  }
}
</style>
