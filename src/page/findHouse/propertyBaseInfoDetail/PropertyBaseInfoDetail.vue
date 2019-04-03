<template>
  <div class="th_property_base_info_detail">
    <th-layout :hiddenFooter="true">
      <div class="th_property_base_info_detail-cont" v-if="baseInfo.id" ref="cont">
        <ul>
          <li>
            <th-cell :cellData="{title:baseInfo.name + ' 项目简介'}"></th-cell>
            <p>项目介绍：{{baseInfo.description}}</p>
          </li>
          <li>
            <th-cell :cellData="{title:baseInfo.name +' 基本信息'}"></th-cell>
            <p>
              <table class="th_property_base_info-item-info">
                <tr><td>物业类别：</td><td>{{baseInfo.propertyType}}</td></tr>
                <tr><td>建筑类型：</td><td>---------------------</td></tr>
                <tr><td>装修标准：</td><td>{{baseInfo.decorationStatus}}</td></tr>
                <tr><td>产权年限：</td><td>{{baseInfo.propertyType}}{{baseInfo.propertyRightYears}}年</td></tr>
                <tr><td>公交环线：</td><td>{{baseInfo.bus}}</td></tr>
                <tr><td>开发商：</td><td>{{baseInfo.developer}}</td></tr>
                <tr><td>楼盘地址：</td><td>{{baseInfo.address}}</td></tr>
              </table>
            </p>
          </li>
          <li>
            <th-cell :cellData="{title:baseInfo.name + ' 销售信息'}"></th-cell>
            <p>
              <table class="th_property_base_info-item-info">
                <tr><td>销售状态：</td><td>{{baseInfo.saleType}}</td></tr>
                <tr><td>最近开盘：</td><td>{{baseInfo.beginSellDate | formatTime('YMD_')}}</td></tr>
                <tr><td>交房时间：</td><td>{{baseInfo.dealTimeInfo}}</td></tr>
                <tr><td>咨询电话：</td><td>{{baseInfo.tel}}</td></tr>
                <!--<tr>
                  <td>预售许可证：</td><td></td>
                </tr>-->
              </table>
               <table class="table_license">
                 <thead><tr><th>预售许可证</th><th>发证时间</th><th>对应楼栋</th><th>期数</th></tr></thead>
                  <tbody class="table_license_cont">
                    <tr v-for="(x,i) in baseInfo.licence" :key="i">
                      <td><span>{{x.name}}</span></td>
                      <td><span>{{x.createDate | formatTime('YMD_')}}</span></td>
                      <td><span>{{x.content}}</span></td>
                      <td><span>{{x.periods}}</span></td>
                    </tr>
                  </tbody>
                </table>
            </p>
          </li>
          <li>
            <th-cell :cellData="{title:baseInfo.name + ' 周边设施'}"></th-cell>
            <p>
              <table class="th_property_base_info-item-info">
                <tr><td>综合商场：</td><td>{{baseInfo.market}}</td></tr>
                <tr><td>医 院：</td><td>{{baseInfo.hospital}}</td></tr>
                <tr><td>银 行：</td><td>{{baseInfo.bank}}</td></tr>
                <tr><td>其 他：</td><td>{{baseInfo.other}}</td></tr>
                <tr><td>内部设施：</td><td>{{baseInfo.facilities}}</td></tr>
              </table>
            </p>
          </li>
          <li>
            <th-cell :cellData="{title:baseInfo.name + ' 小区规划'}"></th-cell>
            <p>
              <table class="th_property_base_info-item-info">
                <tr><td>占地面积：</td><td>{{baseInfo.areaCovered}}㎡</td></tr>
                <tr><td>建筑面积：</td><td>{{baseInfo.builtUpArea}}㎡</td></tr>
                <tr><td>容积率：</td><td>{{baseInfo.far}}</td></tr>
                <tr><td>绿化率：</td><td>{{baseInfo.greenRatio}}%</td></tr>
                <tr><td>停车位：</td><td>{{baseInfo.parkingNum}}</td></tr>
                <tr><td>总户数：</td><td>{{baseInfo.householdsNum}}户</td></tr>
                <tr><td>物业公司：</td><td>{{baseInfo.propertyCompany}}</td></tr>
                <tr><td>物业费用：</td><td>{{baseInfo.propertyPrice}}元/㎡/月</td></tr>
                <tr><td>物业费详情：</td><td>{{baseInfo.propertyPriceDes}}</td></tr>
                <tr><td>楼层状况：</td><td>{{baseInfo.floorDes}}</td></tr>
              </table>
            </p>
          </li>
        </ul>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {setPropertyDetailInfo} from '../../../common/httpClient.js'
import ThPromoteList from '../../../components/promoteList/PromoteList.vue'
export default {
  props: {
    newsDetail: {
      type: Array
    }
  },
  data () {
    return {
      baseInfo: {}
    }
  },
  components: {
    ThPromoteList
  },
  computed: {

  },
  mounted () {
    this.setPropertyDetail()
  },
  created () {
    this.setPropertyDetail()
  },
  activated () {
    this.setPropertyDetail()
  },
  methods: {
    setPropertyDetail () {
      let data = {
        'id': this.$route.params.id
      }
      setPropertyDetailInfo(data).then((res) => {
        let cont = res && res.content
        this.baseInfo = cont
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_property_base_info_detail{
  height: 100%;
  .th_property_base_info_detail-cont{
    font-size: @defaultFontSize;
    color: @c3;
    padding: 0 @plrPage;
    .th_property_base_info-item-info{
        tr{
          td{
            line-height: 1.25rem;
            vertical-align: top;
            &:first-child{
              width: 4.5rem;
              height: 0;
              overflow: hidden;
              color: @c9;
            }
            &:last-child{
              // padding-left: .5rem;
            }
            span{
              max-width: calc(100% - .6rem);
              padding-right: 1rem;
            }
          }
        }
      }
    .table_license{
      th,td {
        text-align:center;
          border: 1px solid @cD8D8D8;
          box-sizing: border-box;
        }
      .table_license_cont{
        td{
          word-break:break-all;
          min-width: 3.6rem;
          padding: 0 .5rem;
          color: @c9;
          font-size: @smallFontSize;
          span{
            display: inline-block;
            text-align:left;
          }
        }
      }
    }
  }
}
</style>
