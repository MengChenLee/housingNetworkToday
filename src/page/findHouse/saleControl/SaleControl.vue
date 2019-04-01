<template>
  <div class="th_sale_control">
    <th-layout ref="layBox" :hiddenFooter="true">
      <div class="th_sale_control-cont" ref="cont">
          <div class="line">
              <div class="text_justify title">楼盘信息</div>
              <div class="info">{{data.buildingGroupName}}</div>
          </div>
          <div class="line">
              <div class="text_justify title">房源状态</div>
              <div class="info">{{data.saleType}}</div>
          </div>
          <div class="line">
              <div class="text_justify title">户型</div>
              <div class="info">{{data.buildingModelTypeName}}</div>
          </div>
          <div class="line">
              <div class="text_justify title">建筑面积</div>
              <div class="info" v-if="data.floorArea">{{data.floorArea}}㎡</div>
              <div class="info" v-else>无</div>
          </div>
          <div class="line">
              <div class="text_justify title">使用面积</div>
              <div class="info" v-if="data.inArea">{{data.inArea}}㎡</div>
              <div class="info" v-else>无</div>
          </div>
          <div class="line">
              <div class="text_justify title">分摊面积</div>
              <div class="info" v-if="data.publicArea">{{data.publicArea}}㎡</div>
              <div class="info" v-else>无</div>
          </div>
          <div class="line">
              <div class="text_justify title">赠送面积</div>
              <div class="info" v-if="data.giveArea">{{data.giveArea}}㎡</div>
              <div class="info" v-else>无</div>
          </div>
          <div class="line">
              <div class="text_justify title">花园面积</div>
              <div class="info" v-if="data.gardenArea">{{data.gardenArea}}㎡</div>
              <div class="info" v-else>无</div>
          </div>
          <div class="line">
              <div class="text_justify title">车位</div>
              <div class="info" >{{data.carParking || '无'}}</div>
          </div>
          <ul class="price">
            <li>
              <div class="line">
                  <div class="text_justify title">销售总价</div>
                  <div class="info" v-if="data.soldAmount">{{data.soldAmount}}万元</div>
                  <div class="info" v-else>无</div>
              </div>
            </li>
            <li>
              <div class="line">
                  <div class="text_justify title">单价</div>
                  <div class="info" v-if="data.pricePerSquare">{{data.pricePerSquare}}万元</div>
                  <div class="info" v-else>无</div>
              </div>
            </li>
          </ul>
          <div class="line noBorder">
              <div class="text_justify title">户型图</div>
          </div>
           <th-slide-property-activity :slidePropertyActivityList="data && data.attachment" v-if="data && data.attachment"></th-slide-property-activity>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {setBuildingModelDetail} from '../../../common/httpClient.js'
import ThSlidePropertyActivity from './slidePropertyActivity/slidePropertyActivity'
export default {
  data () {
    return {
      data: null
    }
  },
  components: {
    ThSlidePropertyActivity
  },
  mounted () {
  },
  created () {
  },
  activated () {
    this.setData()
  },
  methods: {
    setData () {
      let data = {
        id: this.$route.params.id
      }
      setBuildingModelDetail(data).then((res) => {
        let cont = res && res.content
        let title = `${cont.buildingName}-${cont.unitName}-${cont.floor}-${cont.modelName}`
        this.data = cont
        document.title = title
        this.$route.meta.title = title
        this.$refs.layBox.headerRefresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_sale_control{
  height: 100%;
  .th_sale_control-cont{
    padding: 0 0 0 @plrPage;
    .line {
      height: 1.5rem;
      line-height: 1.5rem;
      display: flex;
      border-bottom: 1px solid @cD8D8D8;
      .text_justify {
        text-align: justify;
        flex-shrink: 0;
        min-width: 60px;
        font-size: @defaultFontSize;
        color: @c3;
        margin-right: 20px;
        font-weight: bold;
        height: 1rem;
      }

      .text_justify:after {
        content: " ";
        display: inline-block;
        width: 100%;
      }

      .info {
        flex-grow: 1;
        font-size: @defaultFontSize;
        color: @c3;
      }
      &.noBorder{
        border: 0;
      }
    }
    .price{
      overflow: hidden;
      li{
        width: 50%;
        float: left;
      }
    }
    .th_slide_property_activity{
      height: 4.5rem;
      border-bottom: 1px solid @cD8D8D8;
      /deep/ .th_slide_property_activity-Item{
        width: 4.4rem;
        .th_slide_property_activity-img{
          padding-top: 100% !important;
        }
      }
    }
  }
}
</style>
