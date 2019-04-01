<template>
  <div class="th_property_service_detail">
    <th-layout>
      <div class="th_property_service_detail-header" slot="header">
        <th-back-btn></th-back-btn>
        <mt-navbar v-model="active">
          <mt-tab-item id="selfCar">自驾看房</mt-tab-item>
          <mt-tab-item id="specialCar">免费专车</mt-tab-item>
          <mt-tab-item id="regularCar">免费班车</mt-tab-item>
        </mt-navbar>
      </div>
      <div class="th_property_service_detail-cont" ref="cont">
        <div>
          <mt-cell
            class="yourAddress"
            :class="{placeholder:!yourAddress}"
            @click.native="click('yourAddress')"
            :title="yourAddress || '请选择接送地址'"
          ></mt-cell>
          <mt-cell
            class="property"
            :title="$route.query.buildingGroupName"
          ></mt-cell>
          <mt-cell
            class="time placeholder"
            @click.native="click('time')"
            :title="submitData.specialCarTime ? '出发时间':'请选择出发时间'"
            v-if="active === 'specialCar'">
            <span v-if="submitData.specialCarTime">{{new Date(submitData.specialCarTime) | formatTime('YMDHMS')}}</span>
          </mt-cell>
          <mt-cell
            class="bus placeholder"
            @click.native="click('bus')"
            :title="submitData.visitDetailId ? '班车':'请选择班车'"
            v-if="active === 'regularCar'">
            <span>{{visitDetail && visitDetail.address}}</span>
            </mt-cell>
        </div>
        <ul class="inputBox" v-show="active === 'selfCar'">
          <li>
            <div class="title">车牌号码</div>
            <input value=""  placeholder="输入车牌号码"/>
          </li>
        </ul>
        <p class="tips" v-show="active === 'selfCar'">注：完成报备后将会自动生成申请代码，并发消息提示申请人。凭申请代码到案场对接人领取自驾补贴。</p>
        <p class="tips" v-show="active === 'specialCar'">注：完成报备后将会自动生成申请代码，并将发车时间和发车地址一起由消息发送给申请人。我们安排对接专车为您服务。</p>
        <p class="tips" v-show="active === 'regularCar'">注：完成报备后将会自动生成申请代码，并将发车时间和发车地址一起由消息发送给申请人。我们将为您做好对接服务。</p>
      </div>
      <div slot="footer" class="th_property_service_detail-footer" @click="submit">
        立即报备
      </div>
    </th-layout>
    <th-date-picker
        ref="datePicker"
        @click="getDatePicker">
    </th-date-picker>
    <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade"
        position="bottom">
        <mt-picker :slots="slots" value-key="address" @change="onValuesChange"></mt-picker>
        <ul class="submit">
          <li @click="selectAns">确定</li>
        </ul>
      </mt-popup>
  </div>
</template>

<script>
import {setPropertyServiceDetail, setPropertyRegularCar} from '../../../common/httpClient.js'
import ThBackBtn from '../../../components/base/backBtn/BackBtn.vue'
import ThDatePicker from '../../../components/datePicker/DatePicker.vue'
export default {
  data () {
    return {
      active: 'selfCar',
      selfCarId: 0,
      specialCarId: 0,
      regularCarId: 0,
      popupVisible: false,
      visitDetail: null,
      slots: [
        {
          values: []
        }
      ],
      submitData: {
        // 'visitId': 6, // 看房服务id
        // 'lng': '1',
        // 'lat': '2',
        // 'carNo': '沪Q1234',
        // 'specialCarTime': '',
        // 'visitDetailId': 0// 免费班车ID
      }
    }
  },
  components: {
    ThBackBtn,
    ThDatePicker
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  async mounted () {
  },
  activated () {
    switch (this.$route.query.type) {
      case '114':
        this.active = 'specialCar'
        break
      case '115':
        this.active = 'regularCar'
        break
      default:
        this.active = 'selfCar'
        break
    }
    try {
      // 报备数据-看房服务
      let reportData = sessionStorage.getItem('reportData')
      reportData && (this.submitData = Object.assign(this.submitData, JSON.parse(reportData)))
      sessionStorage.setItem('reportData', '')
    } catch (error) {}
  },
  created () {
    this.yourAddress = this.location.city + this.location.district + this.location.street
    this.setData()
  },
  methods: {
    onValuesChange (picker, values) {
      this.visitDetail = values[0]
      values[0] && this.$set(this.submitData, 'visitDetailId', values[0].id)
    },
    selectAns () {
      this.popupVisible = !this.popupVisible
    },
    setData () {
      let data = {
        'id': this.$route.params.id
      }
      setPropertyServiceDetail(data).then(res => {
        if (res && res.content) {
          res.content.forEach(item => {
            (item.visitTypeId === 113) && (this.selfCarId = item.id);
            (item.visitTypeId === 115) && (this.specialCarId = item.id);
            (item.visitTypeId === 114) && (this.regularCarId = item.id)
          })
        }
      })
    },
    async click (type) {
      if (type === 'time') {
        this.$refs.datePicker.open()
      } else if (type === 'bus') {
        let data = {
          'id': this.regularCarId
        }
        if (!this.slots[0].values.length) {
          await setPropertyRegularCar(data).then(res => {
            if (res && res.content) {
              this.$set(this.slots[0], 'values', res.content)
            }
          })
        }

        this.popupVisible = !this.popupVisible
      }
    },
    getDatePicker (time) {
      this.$set(this.submitData, 'specialCarTime', time)
    },
    submit () {
      let visitId = 0
      let visitText = ''
      if (this.active === 'selfCar') {
        visitId = this.selfCarId
        visitText = '自驾看房'
      } else if (this.active === 'specialCar') {
        visitId = this.specialCarId
        visitText = '免费专车'
      } else {
        visitId = this.regularCarId
        visitText = '免费班车'
      }
      let data = Object.assign(this.submitData, {
        visitText: visitText,
        visitId: visitId,
        'lng': this.location.lng,
        'lat': this.location.lat
      })
      sessionStorage.setItem('reportData', JSON.stringify(data))
      if (this.$route.query.back) {
        history.back()
      } else {
        this.$router.push({path: `/propertyReport/${this.$route.params.id}`,
          query: {
            buildingGroupName: this.$route.query.buildingGroupName,
            reportRemark: this.$route.query.reportRemark,
            back: 1
          }})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.th_property_service_detail{
  height: 100%;
  .th_property_service_detail-header{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 0 10px;
    box-sizing: border-box;
    & /deep/ .mint-navbar{
      margin: 0 2rem;
      height: @headerHeight;
      overflow: hidden;
      background-color: rgba(0,0,0,0);
      .mint-tab-item{
        padding:0;
        color: @cf;
        position: relative;
        .mint-tab-item-label{
          font-size: @FontSize15;
          height: @headerHeight;
          line-height: @headerHeight;
        }
        &.is-selected:after{
          content: '';
          position: absolute;
          width: 40%;
          height: 2px;
          background-color: @cf;
          bottom: 6px;
          border-radius: 2px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .th_property_service_detail-cont{
    height: 100%;
    /deep/ .mint-cell{
    .mint-cell-title{
      padding-left: 1.2rem;
      font-size: @defaultFontSize;
    }
    &::before{
      content: '';
      display: inline-block;
      width: @plrPage;
      height: @plrPage;
      background: @cTheme;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: @plrPage;
      transform: translateY(-50%);
    }
    &.placeholder .mint-cell-title{
      color: @c9;
    }
    &.yourAddress{
      &::before{
        background: @c33D1C7;
      }
    }
    &.property{
      &::before{
        background: @cD16B33;
      }
    }
    &.time,&.bus{
      .mint-cell-title{
        color: @cTheme;
      }
    }
  }
  .inputBox{
    li{
      padding: @plrPage .5rem;
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
      background-position: bottom;
      .title{
        font-size: @smallFontSize;
      }
      input{
        width: 100%;
        display: inline-block;
        outline: none;
        border: 0;
      }
    }
  }
  .tips{
    color: @c9;
    font-size: @smallFontSize;
    line-height: @largeFontSize;
    padding: @plrPage;
  }
  }
  .th_property_service_detail-footer{
    width: 100%;
    height: @footerHeight;
    line-height: @footerHeight;
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    text-align: center;
    color: @cTheme;
    font-size: @FontSize15;
    font-weight: bolder;
    border-top:1px solid @cD8D8D8;
  }
  /deep/ .mint-popup{
    width: 100%;
    .picker-center-highlight{
      background-color: @cDBE0FF;
      z-index: -1;
    }
    .submit{
      display: flex;
      text-align: center;
      font-size: @FontSize15;
      line-height: 1.875rem;
      li{
        flex: 1;
        .lineargGradient();
        color: @cf;
      }
    }
  }
}
</style>
