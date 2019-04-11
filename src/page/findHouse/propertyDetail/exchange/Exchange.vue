<template>
  <div class="th_exchange">
       <!-- <mt-navbar v-model="selected">
          <mt-tab-item id="1">点评</mt-tab-item>
          <mt-tab-item id="2">问答</mt-tab-item>
        </mt-navbar> -->
        <th-cell :cellData="{title:'点评'}"></th-cell>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <table>
              <tr v-for="(item,i) in scoreList" :key="i">
                <td>{{item.name}}</td>
                <td>
                  <ul>
                    <li v-for="(x2,i2) in 5" :key="i2" class="star">
                      <th-img-box v-if="i2+1>item.score" :imgUrl="starDark"></th-img-box>
                      <th-img-box v-else :imgUrl="star"></th-img-box>
                    </li>
                  </ul>
                </td>
                <td>{{item.score}}分</td>
              </tr>
            </table>
            <svg>
              <circle cx="100" cy="60" r="25" stroke-width="1" stroke="#D8D8D8" fill="#3347D1" />
              <text x="90" dy="65" style="font-size:15px;fill:white">{{buildScore.scoreNum}}分</text>
              <circle cx="100" cy="60" r="50" stroke-width="1" stroke="#D8D8D8" fill="none" />
              <circle cx="100" cy="60" r="50" stroke-width="2" stroke="#3347D1" fill="none" :stroke-dasharray=" buildScore.scoreNum*Math.PI*50*(2/5) +' '+ 2*Math.PI*50" stroke-linecap='round' transform="rotate(-90, 100 60)"></circle>
            </svg>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <p class="que">在上海工作断断续续有5年<span class="ansNum">2个回答</span></p>
            <p class="ans">最近63个月，累计60个月社保，税单连续，税单不可以断最近63个月，累计60个月社保，税单连续，税单不可以断最近63个月，累计60个月社保，税单连续，税单不可以断</p>
          </mt-tab-container-item>
        </mt-tab-container>
  </div>
</template>

<script>
import ThPropertyList from '../../../../components/propertyList/PropertyList.vue'

import banner from './imgs/index_banner2.jpg'
import star from './imgs/star.png'
import starDark from './imgs/star_dark.png'
export default {
  props: {
    buildScore: {
      type: Object
    }
  },
  data () {
    return {
      banner: banner,
      star,
      starDark,
      selected: '1',
      scoreList: []
    }
  },
  components: {
    ThPropertyList
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.scoreList.push(
      {name: '价格', score: this.buildScore.priceScore},
      {name: '地段', score: this.buildScore.sectionScore},
      {name: '交通', score: this.buildScore.trafficScore},
      {name: '配套', score: this.buildScore.matchingScore},
      {name: '环境', score: this.buildScore.environmentScore}
    )
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.th_exchange{
  padding: 0 @plrPage .5rem;
    & /deep/ .mint-navbar{
      width: 5rem;
      background-color:rgba(0, 0, 0, 0);
      .mint-tab-item{
        padding: 0;
        .mint-tab-item-label{
          height: 1.8rem;
          line-height: 1.8rem;
          font-size:@FontSize15;
        }
        &.is-selected{
          border-bottom: 1px solid @cTheme;
          color: @cTheme;
        }
      }
    }
    & /deep/ .mint-tab-container{
      height: 100%;
      .mint-tab-container-wrap{
        height: 100%;
        .mint-tab-container-item{
          height: 100%;
          overflow: auto;
          table {
            width: 50%;
            float: left;
            color: @c9;
            font-size: @smallFontSize;
            line-height: 1.2rem;
            .star{
              float: left;
              .th_img-box{
                width: 1rem;
              }
            }
          }
          svg{
            width: 50%;
            float: left;
            height: 6rem;
          }
          .que{
            font-size: @FontSize15;
            color: @c3;
            box-sizing: border-box;
            padding:0 3rem 0 1.25rem;
            line-height: 1.25rem;
            position: relative;
            .lineClamp(1);
            &:before{
              content: '问';
              line-height: 1.1;
              background-color: @cD14E33;
              color: @cf;
              position: absolute;
              top: .2rem;
              left: 0;
            }
            .ansNum{
              font-size: @smallFontSize;
              color: @c9;
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          .ans{
            font-size: @defaultFontSize;
            color: @c6;
            padding-left: 1.25rem;
            line-height: 1.25rem;
            position: relative;
            &:before{
              content: '答';
              background-color: @cTheme;
              color: @cf;
              line-height: 1.1;
              position: absolute;
              top: .2rem;
              left: 0;
            }
          }
        }
      }
    }
}
</style>
