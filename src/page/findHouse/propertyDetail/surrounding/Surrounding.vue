<template>
    <div class="th_surrounding">
      <th-cell :cellData="{title:'周边信息'}"></th-cell>
      <th-img-box :imgUrl="baseInfo.peripheryPic" @click="click"></th-img-box>
      <ul class="th_surrounding-item-info" @click="click">
        <li>
          <span class="type">地&emsp;&nbsp;铁：</span>
          <span>{{baseInfo.metro || '无'}}</span>
        </li>
        <li>
          <span class="type">公&emsp;&nbsp;交：</span>
          <span>{{baseInfo.bus || '无'}}</span>
        </li>
        <li>
          <span class="type">餐&emsp;&nbsp;饮：</span>
          <span>{{baseInfo.restaurant || '无'}}</span>
        </li>
        <li>
          <span class="type">商&emsp;&nbsp;场：</span>
          <span>{{baseInfo.market || '无'}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
import banner from './imgs/banner.png'
export default {
  props: {
    baseInfo: {
      type: Object
    }
  },
  data () {
    return {
      banner: banner
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
    click () {
      this.$router.push({path: '/propertyMap',
        query: {
          lat: this.baseInfo.lat,
          lng: this.baseInfo.lng
        }})
    }
  }
}
</script>

<style lang="less" scoped>
.th_surrounding{
  padding: 0 @plrPage ;
  .th_img-box{
    padding-top: @imgSurrounding;
    margin-top: .5rem;
  }
  .th_surrounding-item-info{
    width: 100%;
    font-size: @defaultFontSize;
    color: @c3;
    display: flex;
    flex-direction: column;
        li{
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          span{
            line-height: 1.5rem;
            &:first-child{
              width: 30%;
              overflow: hidden;
              color: @c9;
              padding-left: 5%;
              &:before{
                content: '';
                width: 1rem;
                height: 1rem;
                display: inline-block;
                background: url(./imgs/subway.png) no-repeat;
                background-size: contain;
                background-position: center;
                position: relative;
                top: .25rem;
                left: -.5rem;
              }
            }
            &:last-child{
              padding-left: .5rem;
              width: 65%;
              .lineClamp(1);
            }
          }
          &:nth-child(2) .type:before{
            background-image: url(./imgs/bus.png) !important;
          }
          &:nth-child(3) .type:before{
            background-image: url(./imgs/food.png) !important;
          }
          &:nth-child(4) .type:before{
            background-image: url(./imgs/mall.png) !important;
          }
        }
      }
}
</style>
