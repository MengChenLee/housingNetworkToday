<template>
  <div class="th_share_pic">
    <!--<th-layout :hiddenFooter="true">-->
      <!--<div class="th_share_pic-header" slot="header">-->
        <!--<th-back-btn></th-back-btn>-->
        <!--<span>{{$route.meta.title}}</span>-->
        <!--<div class="th_share_pic-right" @click="share">分享</div>-->
      <!--</div>-->
      <div class="th_share_pic-cont" ref="cont" :hiddenFooter="true">
        <img :src="list"/>
      </div>
    <!--</th-layout>-->
  </div>
</template>

<script>
import {getSharePic} from '../../../common/httpClient.js'
// import ThBackBtn from '../../../components/base/backBtn/BackBtn.vue'
export default {
  data () {
    return {
      list: ''
    }
  },
  // components: {
  //   ThBackBtn
  // },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  created () {
    this.share()
    this.getData()
  },
  activated () {
    this.share()
  },
  methods: {
    getData () {
      let data = {
        'accountId': this.userInfo.id
      }
      getSharePic(data).then((res) => {
        if (res && res.code === 1) {
          this.list = res && res.content
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    share () {
      // let _this = this
      this.wxShare({
        title: '今日房网',
        imgUrl: this.userInfo.content,
        link: this.userInfo.content,
        desc: ''
      }, true)
    }
  }
}
</script>

<style lang="less" scoped>
.th_share_pic{
  height: 100%;
  .th_share_pic-header{
    width: 100%;
    height: 100%;
    line-height: @headerHeight;
    text-align: center;
    font-size: @FontSize17;
    color: @cf;
    .th_share_pic-right{
      // width: 4rem;
      position: absolute;
      top: 0;
      right: .4rem;
      font-size: @defaultFontSize;
    }
  }
  .th_share_pic-cont{
    height: 100%;
    text-align: center;
    img{
      width: 100%;
      height: auto;
    }
  }
}
</style>
