<template>
  <div class="th_news_list">
    <router-link :to="'/newsDetail/'+item.id" class="th_news_list-item" v-for="(item, index) in newsList" :key="index">
      <th-img-text-level>
        <th-img-box class="th_news_list-item-img" :imgUrl="item.picPath" slot="left"></th-img-box>
        <div class="th_news_list-item-cont">
          <div class="th_news_list-item-title">{{item.headline}}</div>
          <div class="th_news_list-item-des">
            <span>{{item.zhaiyao || '这是新闻的内容'}}</span></div>
          <div class="th_news_list-item-info">
            <span class="th_news_list-item-time">{{new Date(item.createDateFormat.replace(/-/g, "/")) | formatTime()}}</span>
            <span class="th_news_list-item-author">作者：{{item.resource}}</span>
          </div>
        </div>
      </th-img-text-level>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    newsList: {
      type: Array
    }
  },
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
.th_news_list{
  .th_news_list-item{
    height: 4.2rem;
    padding:@plrPage;
    overflow: hidden;
    display: block;
    border-bottom: 1px solid @cD8D8D8;
    .th_news_list-item-img{
      padding-top: @imgBase;
    }
    .th_news_list-item-cont{
      height: 100%;
      position: relative;
      z-index: 1;
      .th_news_list-item-title{
        color: @c3;
        font-size: @defaultFontSize;
        line-height: @FontSize20;
        .lineClamp(1)
      }
      .th_news_list-item-des{
        color: @c9;
        height: @defaultFontSize/.8 * 2;
        font-size: @smallFontSize;
        overflow: hidden;
        span{
          .FontSize10;
          .lineClamp(2);
        }
      }
      .th_news_list-item-info{
        .FontSize10;
        color: @c9;
        position: absolute;
        bottom: 5px;
        left: 0;
        .th_news_list-item-time{
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
