<template>
  <div class="th_property_list">
    <div class="th_property_list-item" v-for="(item, index) in propertyList" :key="index" @click="click(item)">
      <!-- 左右结构显示一张图 -->
      <div v-if="item.viewType !==2 && !isReward">
        <th-img-text-level class="th_property_list-item-top">
          <div slot="left">
            <div class="th_property_list-item-check" v-if="selectAble">
              <span :class="{active:selectList.indexOf(item.id + '') > -1}"></span>
            </div>
            <div class="th_property_list-item-img-wrap" :class="{selectAble:selectAble}">
              <th-img-box :imgUrl="item.logo" class="th_property_list-item-img"></th-img-box>
              <div class="th_property_list-item-saleType" :class="{onsale:item.saleType ==='在售'}">{{item.saleType}}</div>
              <img class="th_property_list-item-video" src="./imgs/video.png" v-if="item.attachType===2"/>
              <img class="th_property_list-item-panoramic" src="./imgs/panoramic.png" v-if="item.attachType===3"/>
            </div>
          </div>
          <div class="th_property_list-item-cont">
            <div class="th_property_list-item-title">
              <div>{{item.viewType ===2?'三图-':''}}{{item.name}}</div>
              <span v-if="item.buildingType">
                <div v-for="(typeItem,i) in item.buildingType.split('-')" :key="i">
                  <span class="typeItem">{{typeItem}}</span>
                </div>
              </span>
            </div>
            <table class="th_property_list-item-info">
              <tr><td><div class="th_property_list-item-size">{{item.roomArea}}<i class="split"></i><span>{{item.roomType}}</span></div></td><td ><div class="th_property_list-item-price">{{Math.round(item.price)}}元/㎡</div></td></tr>
              <tr><td><div class="th_property_list-item-locate">{{item.provinceName}}{{item.cityName}}<i class="split"></i>{{setDistance(item.distance)}}</div></td><td><div class="th_property_list-item-price-last">{{item.totalPrice}}</div></td></tr>
            </table>
            <ul class="th_property_list-item-tag" v-if="item.tags">
              <li v-for="(tagItem, i) in item.tags.split('-')" :key="i">
                <div><span>{{tagItem}}</span></div>
              </li>
            </ul>
            <div class="th_property_list-item-bg" v-if="item.activityTypePic">
              <th-img-box class="th_property_list-item-img" :imgUrl="item.activityTypePic"></th-img-box>
            </div>
          </div>
        </th-img-text-level>
        <div class="th_property_list-item-dynamic" v-if="item.newsTitle" :class="{selectAble:selectAble}">
          <div class="th_property_list-item-dynamic-text" >
            <span class="th_property_list-item-dynamic-name">
              最新动态
            </span>{{item.newsTitle}}
          </div>
          <div class="th_property_list-item-dynamic-flag">有新动态</div>
        </div>
      </div>
      <!-- 上下结构显示三张图 -->
      <div v-else-if="!isReward">
        <div class="th_property_list-item-top ads">
          <!-- <th-img-box class="th_property_list-item-img" :imgUrl="item.logo"></th-img-box> -->
          <!-- <div class="th_property_list-item-saleType" :class="{onsale:item.saleType ==='在售'}">{{item.saleType}}</div> -->
          <!-- <img class="th_property_list-item-video" src="./imgs/video.png" v-if="item.attachType===2"/>
          <img class="th_property_list-item-panoramic" src="./imgs/panoramic.png" v-if="item.attachType===3"/> -->
          <div class="th_property_list-item-cont">
            <div class="item-cont">
              <div class="th_property_list-item-title">
                <div>{{item.name}}</div>
                <span v-if="item.buildingType">
                <div v-for="(typeItem,i) in item.buildingType.split('-')" :key="i">
                  <span class="typeItem">{{typeItem}}</span>
                </div>
              </span>
              </div>
              <div class="th_property_list-item-info item-info">
                <div class="th_property_list-item-size item-size">
                  <span class="roomArea">{{item.roomArea}}</span>
                  <i class="split"></i>
                  <span>{{item.roomType}}</span>
                </div>
                <div class="th_property_list-item-price">{{item.price}}元/㎡</div>
              </div>
            </div>
            <p class="th_property_list-item-dynamic" v-if="item.newsTitle">{{item.newsTitle}}</p>
            <div class="th_property_list-item-img-wrap">
              <ul class="th_property_list-item-img-list">
                <li v-for="(imgItem,imgIndex) in item.attachment" :key="imgIndex">
                  <th-img-box class="th_property_list-item-img" :imgUrl="imgItem.picPath"></th-img-box>
                </li>
                <li v-if="item.attachment.length===0">
                  <th-img-box class="th_property_list-item-img" :imgUrl="item.logo"></th-img-box>
                </li>
              </ul>
              <div class="th_property_list-item-saleType" :class="{onsale:item.saleType ==='在售'}">{{item.saleType}}</div>
              <img class="th_property_list-item-video" src="./imgs/video.png" v-if="item.attachType===2"/>
              <img class="th_property_list-item-panoramic" src="./imgs/panoramic.png" v-if="item.attachType===3"/>
            </div>
            <table class="th_property_list-item-info left">
              <tr><td><div class="th_property_list-item-locate">{{item.provinceName}}{{item.cityName}}<i class="split"></i>{{item.distance}}</div></td></tr>
            </table>
            <ul class="th_property_list-item-tag" v-if="item.tags">
              <li v-for="(tagItem, i) in item.tags.split('-')" :key="i">
                <div><span>{{tagItem}}</span></div>
              </li>
            </ul>
            <div class="th_property_list-item-bg" v-if="item.activityTypePic">
              <th-img-box class="th_property_list-item-img" :imgUrl="item.activityTypePic"></th-img-box>
            </div>
          </div>
        </div>
      </div>
      <!--奖励 左右结构显示一张图 -->
      <div v-else :class="{isReward:item.bounsNum}">
        <th-img-text-level class="th_property_list-item-top">
          <div slot="left">
            <div class="th_property_list-item-img-wrap" :class="{selectAble:selectAble}">
              <th-img-box :imgUrl="item.logo" class="th_property_list-item-img"></th-img-box>
            </div>
          </div>
          <div class="th_property_list-item-cont">
            <div class="th_property_list-item-title">
              <div>{{item.name}}</div>
            </div>
            <table class="th_property_list-item-info">
              <tr><td><div class="th_property_list-item-size">{{item.bouns}}</div></td></tr>
              <tr><td><div class="th_property_list-item-size">{{item.address}}</div></td></tr>
            </table>
            <ul class="th_property_list-item-tag" v-if="item.tags">
              <li v-for="(tagItem, i) in item.tags.split('-')" :key="i">
                <div><span>{{tagItem}}</span></div>
              </li>
            </ul>
          </div>
        </th-img-text-level>
        <span class="th_property_list-item-reward">{{item.bounsNum}}套方案</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propertyList: {
      type: Array
    },
    selectAble: {
      type: Boolean,
      default: false
    },
    isReward: {
      type: Boolean,
      default: false
    },
    selectList: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectTextList: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectPropertyRemarkList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: this.$route.name
    }
  },
  components: {

  },
  computed: {

  },
  mounted () {

  },
  created () {
    // console.log(this.name)
  },
  methods: {
    click (item) {
      // console.log(this.selectList)
      if (this.selectAble) {
        let _index = this.selectList.indexOf(item.id + '')
        if (_index > -1) { // 最后一个不允许删除
          if (this.selectList.length > 1) {
            this.selectList.splice(_index, 1)
            this.selectTextList.splice(_index, 1)
            this.selectPropertyRemarkList.splice(_index, 1)
          }
        } else {
          // if (this.$route.query.source === 'client') {

          // }
          if (this.selectList.length < 3 || this.$route.query.source === 'client') {
            this.selectList.push(item.id + '')
            this.selectTextList.push(item.name)
            this.selectPropertyRemarkList.push(item.reportRemark)
          } else {
            this.toast('一次性最多只能报备3个楼盘呦～')
          }
        }
        // console.log(this.selectList)
      } else if (this.isReward) {
        this.$router.push({path: `/rewardDetail/${item.id}`})
      } else {
        this.$router.push({path: `/propertyDetail/${item.id}`})
        // if (this.name === 'recommend') {
        //   this.$router.push({path: `/propertyDetail/${item.id}`, query: {id: 2}})
        // } else {
        //   this.$router.push({path: `/propertyDetail/${item.id}`, query: {id: 1}})
        // }
      }
    },
    setDistance (distance) {
      if (/米/.test(distance)) {
        return distance
      } if (Number(distance) > 10000) {
        return Math.round(distance / 100) / 100 + '千米'
      } else {
        return Math.round(distance * 100) / 100 + '米'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .th_property_list{
    .th_property_list-item{
      padding:@plrNewsitem @plrPage;
      overflow: hidden;
      border-bottom: 1px solid @cD8D8D8;
      color: @c9;
      display: block;
      position: relative;
      .th_property_list-item-top{
        overflow: hidden;
        // height: 4.2rem;
        .th_property_list-item-check{
          width: 3rem;
          height: 4.2rem;
          line-height: 4.2rem;
          float: left;
          span{
            display: inline-block;
            border-radius: 100%;
            border: 1px solid #ccc;
            width: 20px;
            height: 20px;
            margin-left: 5px;
            position: relative;
            &::after{
              border: 2px solid transparent;
              border-left: 0;
              border-top: 0;
              content: " ";
              top: 3px;
              left: 6px;
              position: absolute;
              width: 4px;
              height: 8px;
              transform: rotate(45deg) scale(0);
              transition: transform .2s;
            }
            &.active{
              background-color: #D14E33;
              border-color: #D14E33;
              &::after{
                border-color: #fff;
                transform: rotate(45deg) scale(1);
              }
            }
          }
        }
        .th_property_list-item-img-wrap{
          position: relative;
          overflow: hidden;
          .th_property_list-item-img{
            padding-top: @imgBase;
          }
          .th_property_list-item-saleType{
            line-height: 1rem;
            padding: 0 .2rem;
            transform: scale(0.83);
            color: @cf;
            background-color: @c9;
            font-size: @smallFontSize;
            border-radius: 2px;
            position: absolute;
            top: 0;
            left: 0;
            &.onsale{
              background-color: @cD14E33;
            }
          }
          .th_property_list-item-video{
            width: 1.2rem;
            height: 1.2rem;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -.6rem ;
          }
          .th_property_list-item-panoramic{
            width: 1.2rem;
            height: .5rem;
            position: absolute;
            bottom: .2rem;
            left: .2rem;
          }
          &.selectAble{
            width: 4rem;
            position: absolute;
            left: 2rem;
            .th_property_list-item-img{
              padding-top: 100%;
            }
          }
        }
        .th_property_list-item-cont{
          height: 100%;
          position: relative;
          line-height: 1rem;
          .item-cont{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .th_property_list-item-title{
            height: 1rem;
            line-height: 1rem;
            color: @c3;
            font-size: @defaultFontSize;
            overflow: hidden;
            div{
              float: left;
              span{
                .FontSize10;
                color: @cD14E33;
                margin-left: .1rem;
              }
              span.typeItem{
                color: @cTheme;
              }
              &:nth-child(2n) span{
                color: @cE4805E;
              }
            }
          }
          .th_property_list-item-info.item-info{
            width: 50%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .th_property_list-item-size.item-size{
              width: 60%;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              span.roomArea{
                margin-left: .5rem;
                width: 60%;
              }
              .split{
                margin-top: 1px;
              }
            }
          }
          .th_property_list-item-info{
            .split{
              display: inline-block;
              margin: 0 .2rem;
              width: 2px;
              height: 13px;
              background-color: @c9;
              vertical-align: middle;
            }
            tr{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              td:nth-child(2n+1){
                width: 60%;
              }
              td:nth-child(2n){
                width: 40%;
                text-align: right;
              }
            }
            .th_property_list-item-size,.th_property_list-item-locate,.th_property_list-item-price-last{
              // .lineClamp(1);
              .FontSize10;
            }
            .th_property_list-item-size{
              text-align: left;
            }
            .th_property_list-item-size span{
              display: inline-block;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              width: 40%;
              vertical-align: middle;
            }
            .th_property_list-item-price{
              width: 105%;
              color: @cE4805E;
              font-size: @smallFontSize;
              text-align: right;
              // .lineClamp(1);
            }
          }
          .th_property_list-item-tag{
            height: 1rem;
            margin:.2rem 0 0  -.3rem;
            overflow: hidden;
            li{
              float: left;
              &:first-child{
                margin-left: 0
              }
              div{
                .FontSize10;
                margin-left: 0;
                span{
                  padding:.1rem .2rem;
                  border: 1px solid @c9;
                }
              }
            }
          }
          .th_property_list-item-bg{
            width: 4.425rem;
            height: 3.175rem;
            position: absolute;
            bottom: 0;
            right: 2.25rem;
            // z-index: -;
            .th_property_list-item-img{
              padding-top: 71.75%;
            }
          }
        }
        &.ads {
          .th_property_list-item-title{
            display: inline-block;
          }
          .th_property_list-item-info{
            width: auto;
            float: right;
            // display: inline-block;
            &tr{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            &.left{
              height: 1rem;
              margin-top: 0.2rem;
              float: left;
            }
          }
          .th_property_list-item-dynamic{
            width: 100%;
            padding: 0;
            margin-top: -.1rem;
          }
          .th_property_list-item-img-wrap{
            position: relative;
            .th_property_list-item-img-list{
              width: calc(100% + @plrPage);
              display: flex;
              li{
                // width: calc(33.33% - @plrPage);
                flex: 0 0 calc(33.38% - @plrPage);
                margin-right: @plrPage;
              }
            }
          }
          .th_property_list-item-tag{
            max-width: 60%;
            float: right;
            li{
              float: right;
            }
          }
        }
      }
      .th_property_list-item-dynamic{
        width: calc(100% + @plrPage - 103px);
        margin-top: @plrPage;
        height: 1rem;
        line-height: 1rem;
        position: relative;
        font-size: @smallFontSize;
        &.selectAble{
          width: calc(100% + @plrPage - 103px - 3rem);
          padding-left: 3rem;
        }
        .th_property_list-item-dynamic-text{
          .lineClamp(1);
          .th_property_list-item-dynamic-name{
            color: @cTheme;
          }
        }
        .th_property_list-item-dynamic-flag{
          height: 100%;
          position: absolute;
          top: 0;
          right: -103px;
          background-color: @cD14E33;
          color: @cf;
          padding:0 8px 0 12.5px;
          border-radius: .5rem 0 0 .5rem;
        }
      }
      .th_property_list-item-reward{
        display:none;
      }
      .isReward{
        padding-right:3rem;
        .th_property_list-item-reward{
          width:3rem;
          display:block;
          position:absolute;
          top:50%;
          right:@plrPage;
          text-align:right;
          font-size:@smallFontSize;
          color:@cE4805E;
          transform:translateY(-50%);
        }
      }
    }
  }
</style>
