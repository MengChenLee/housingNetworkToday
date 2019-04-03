<template>
  <div class="th_promote_list">
    <router-link  :to="'/promoteDetail/'+item.id" class="th_promote_list-item" v-for="(item, index) in promoteList" :key="index">
      <div class="th_promote_list-item-cont">
          <div class="th_promote_list-item-title">
            {{item.buildingGroupName || '楼盘名称'}}
            <span class="th_promote_list-item-name">[{{item.title}}]</span>
            <div class="th_promote_list-item-tag"><div><span>{{item.type}}</span></div></div>
          </div>
          <th-img-box class="th_promote_list-item-img" :imgUrl="item.picPath" slot="left"></th-img-box>
          <div class="th_promote_list-item-des">{{item.content}}</div>
          <div class="th_promote_list-item-info">
            <span class="th_promote_list-item-author">已有{{item.joinNum || 0}}人参与</span>
            <span class="th_promote_list-item-time" v-if="(item.endDate - +new Date()) > 0">剩余时间：{{(item.endDate - +new Date()) | distanceTime}}</span>
            <span class="th_promote_list-item-time" v-else>已过期</span>
            <span class="th_promote_list-item-btn">立即报名</span>
          </div>
        </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    promoteList: {
      type: Array
    }
  },
  data () {
    return {
      toLinkGo: '',
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
.th_promote_list{
  .th_promote_list-item{
    border-bottom: 1px solid @cD8D8D8;
    padding:@plrPage @plrPage @plrNewsitem;
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    .th_promote_list-item-cont{
      height: 100%;
      position: relative;
      .th_promote_list-item-title{
        color: @c3;
        font-size: @defaultFontSize;
        height: 1.5rem;
        line-height: 1.5rem;
        .lineClamp(1);
        padding-right: 2.5rem;
        .th_promote_list-item-name{
          color: @cD14E33;
        }
        .th_promote_list-item-tag{
          position: absolute;
          top: -.15rem;
          right: 0;
          div{
            .FontSize10;
            margin-left: 0;
            span{
              color: @cE45ECA;
              padding:.1rem .2rem;
              border: 1px solid @cE45ECA;
            }
          }
        }
      }
      .th_promote_list-item-img{
        padding-top: @imgBanner;
      }
      .th_promote_list-item-des{
        color: @c9;
        height: 1.3rem;
        line-height: 1.3rem;
        font-size: @smallFontSize;
        .lineClamp(1);
      }
      .th_promote_list-item-info{
        height: 1rem;
        line-height: 1rem;
        font-size: @FontSize10;
        color: @c9;
        .FontSize10;
        .th_promote_list-item-time{
          margin-left: 10px;
        }
        .th_promote_list-item-btn{
          color: @cf;
          background-color: @cD14E33;
          padding: 4px 10px;
          border-radius: @borderRadius;
          line-height: .7rem;
          float: right;
        }
      }
    }
    &:last-child{
      padding-bottom: 0
    }
  }
}
</style>
