<template>
  <div class="th_property_report" id="cont">
    <th-layout>
      <div class="th_property_report-cont" ref="cont">
        <div >
          <mt-cell
            title="报备楼盘"
            isLink
            @click.native='selectProperty'>
            <span class="color999">{{this.selectTextList[0] || '请选择报备楼盘'}}</span>
          </mt-cell>
          <mt-cell
            :class="{placeholder:!submitData.firstVisitTime}"
            title="预计到访时间"
            isLink
            @click.native="openDatePicker(1)">
            <span v-if="submitData.firstVisitTime">{{submitData.firstVisitTime | formatTime('YMDHMS')}}</span>
            <span v-else>选择预计到访时间</span>
          </mt-cell>
          <div class="tips">
            报备提示：
            {{selectPropertyRemarkList[0] || $route.query.reportRemark || '无'}}</div>
        </div>
        <div v-if="submitData.secondId">
          <mt-cell
            title="报备楼盘"
            isLink
            @click.native='selectProperty'>
            {{this.selectTextList[1]}}
          </mt-cell>
          <mt-cell
            :class="{placeholder:!submitData.secondVisitTime}"
            title="预计到访时间"
            isLink
            @click.native="openDatePicker(2)">
            <span v-if="submitData.secondVisitTime">{{submitData.secondVisitTime | formatTime('YMDHMS')}}</span>
            <span v-else>选择预计到访时间</span>
          </mt-cell>
          <div class="tips">报备提示：{{selectPropertyRemarkList[1]|| '无'}}</div>
        </div>
        <div v-if="submitData.thirdId">
          <mt-cell
            title="报备楼盘"
            isLink
            @click.native='selectProperty'>
            {{this.selectTextList[2]}}
          </mt-cell>
          <mt-cell
            :class="{placeholder:!submitData.thirdVisitTime}"
            title="预计到访时间"
            isLink
            @click.native="openDatePicker(3)">
            <span v-if="submitData.thirdVisitTime">{{submitData.thirdVisitTime | formatTime('YMDHMS')}}</span>
            <span v-else>选择预计到访时间</span>
          </mt-cell>
          <div class="tips">报备提示：{{selectPropertyRemarkList[2]|| '无'}}</div>
        </div>
        <ul class="inputBox">
          <li>
            <div class="title">客户姓名</div>
            <input v-model="submitData.username"   placeholder="请输入到访客户姓名"/>
            <div class="radioBox">
              <input type="radio" name="report" id="yes" :value="1" v-model="submitData.sex"><label for="yes">先生</label>
              <input type="radio" name="report" id="no" :value="2" v-model="submitData.sex"><label for="no">女士</label>
            </div>
          </li>
          <li>
            <div class="title">客户电话<span>（系统将做隐号处理）</span></div>
            <input type="number" @focus="focusReF" @blur="blurReF" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="11" v-model="submitData.phone"   placeholder="请输入到客户电话"/>
            <span class="add" @click="clickTarget"><span :class="addPhoneNumber === false ? 'decrease' : 'addPhoneNumber'"></span></span>
          </li>
          <li class="noRequire" v-show="!addPhoneNumber">
            <div class="title">备用电话<span>（系统将做隐号处理）</span></div>
            <input type="number" @focus="focusReF" @blur="blurReF" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="11" v-model="submitData.backPhone"  placeholder="请输入到客户备用电话"/>
          </li>
          <li>
            <div class="title">到访人数</div>
            <input type="number" v-model="submitData.visitorNum" @focus="focusReF" @blur="blurReF"  placeholder="请输入到访人数"/>
          </li>
        </ul>
        <div class="th_property_report-service">
          <mt-cell
            title="看房服务" :isLink="!this.$route.query.back" :class="{placeholder:!submitData.visitText}" @click.native="goUrl" v-show="selectList.length===1">
            <span>{{this.submitData.visitText || '请选择看房服务'}}</span>
          </mt-cell>
          <mt-cell
            title="购房意向" isLink :class="{placeholder:!submitData.content}" @click.native="goIntention">
            <span>{{this.submitData.content || '请选择购房意向'}}</span>
          </mt-cell>
        </div>

        <textarea class="th_property_report-remark" @focus="focusReF" @blur="blurReF" v-model="submitData.remark" placeholder="请输入备注" maxlength="100"></textarea>
        <div class="th_property_report-remark-length">{{submitData.remark.length}}/100</div>
      </div>
      <div class="th_property_report-footer" @click="submit" slot="footer">
        <span>确定</span>
      </div>
      <th-date-picker
        ref="datePicker"
        @click="getDatePicker">
      </th-date-picker>
    </th-layout>
  </div>
</template>
<script>
import {setPropertyReport} from '../../common/httpClient.js'
import ThDatePicker from '../../components/datePicker/DatePicker.vue'
export default {
  name: 'newPropertyReport',
  data () {
    return {
      addPhoneNumber: true,
      pickerNum: 1,
      selectList: [],
      selectTextList: [],
      selectPropertyRemarkList: [],
      submitData: {
        'firstId': 0,
        'firstVisitTime': '',
        'secondId': 0,
        'secondVisitTime': '',
        'thirdId': 0,
        'thirdVisitTime': '',
        'remark': '', // 备注
        'visitorNum': null,
        'phone': '',
        'backPhone': '',
        'username': '',
        'content': '', // 购房意向
        'sex': 1 // 1：男；2:女
      }

    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    },
    location () {
      return this.$store.state.locate.location
    }
  },
  watch: {
  },
  components: {
    ThDatePicker
  },
  activated () {
    // 添加默认的楼盘
    // this.selectList.push(this.$route.params.id)
    // this.selectTextList.push(this.$route.query.buildingGroupName)
    // this.selectPropertyRemarkList.push(this.$route.query.reportRemark)
    try {
      // 报备数据-看房服务
      let reportData = sessionStorage.getItem('reportData')
      reportData && (this.submitData = Object.assign(this.submitData, JSON.parse(reportData)))
      sessionStorage.setItem('reportData', '')
    } catch (error) {}
    try {
      // 楼盘选择-楼盘id
      let selectList = sessionStorage.getItem('newSelectPropertyList')
      if (selectList) {
        this.selectList = JSON.parse(selectList)
        this.$set(this.submitData, 'firstId', this.selectList[0])
        this.$set(this.submitData, 'secondId', this.selectList[1])
        this.$set(this.submitData, 'thirdId', this.selectList[2])
      }
    } catch (error) {}
    try {
      // 楼盘选择-楼盘name
      let selectTextList = sessionStorage.getItem('newSelectPropertyTextList')
      selectTextList && (this.selectTextList = JSON.parse(selectTextList))
    } catch (error) {}
    // console.log(this.selectTextList)
    try {
      // 楼盘选择-楼盘报备标注
      let selectPropertyRemarkList = sessionStorage.getItem('newSelectPropertyRemarkList')
      selectPropertyRemarkList && (this.selectPropertyRemarkList = JSON.parse(selectPropertyRemarkList))
    } catch (error) {}

    try {
      // 报备数据-意向找房
      let reportCont = sessionStorage.getItem('report-content')
      reportCont && this.$set(this.submitData, 'content', sessionStorage.getItem('report-content'))
    } catch (error) {}
    sessionStorage.clear('newSelectPropertyList')
    sessionStorage.setItem('newSelectPropertyTextList')
    sessionStorage.setItem('newSelectPropertyRemarkList')
    sessionStorage.setItem('report-content')
  },
  methods: {
    clickTarget () {
      this.addPhoneNumber = !this.addPhoneNumber
    },
    focusReF () {
      // document.body.scrollTop = document.body.scrollHeight
      this.$nextTick(() => {
        let container = document.getElementById('cont')
        container.scrollIntoView({
          block: 'start',
          behavior: 'auto'
        })
      })
    },
    blurReF () {
      // document.body.scrollTop = this.bfscrolltop
      this.$nextTick(() => {
        let container = document.getElementById('cont')
        container.scrollIntoView({
          block: 'end',
          behavior: 'auto'
        })
      })
    },
    openDatePicker (num) {
      this.pickerNum = num
      this.$refs.datePicker.open()
    },
    getDatePicker (time) {
      // console.log(time)
      if (this.pickerNum === 2) {
        this.$set(this.submitData, 'secondVisitTime', time)
      } else if (this.pickerNum === 3) {
        this.$set(this.submitData, 'thirdVisitTime', time)
      } else {
        this.$set(this.submitData, 'firstVisitTime', time)
      }
    },
    /**
     * 选择看房服务
     */
    goUrl () {
      if (!this.$route.query.back) {
        this.setSessionStorage()
        this.$router.push({path: '/propertyServiceDetail',
          query: {
            buildingGroupName: this.$route.query.buildingGroupName,
            back: 1
          }})
      }
    },
    /**
     * 选择意向
     */
    goIntention () {
      this.setSessionStorage()
      this.$router.push({path: '/intention?isSelect=1'})
    },
    /**
     * 选择楼盘
     */
    selectProperty () {
      if (!this.$route.query.back) {
        this.setSessionStorage()
        this.$router.push({path: '/newSelectProperty'})
      }
    },
    /**
     * 存储本地数据
     */
    setSessionStorage () {
      sessionStorage.setItem('newSelectPropertyList', JSON.stringify(this.selectList))
      sessionStorage.setItem('newSelectPropertyTextList', JSON.stringify(this.selectTextList))
      sessionStorage.setItem('newSelectPropertyRemarkList', JSON.stringify(this.selectPropertyRemarkList))
      sessionStorage.setItem('report-content', this.submitData.content)
      sessionStorage.setItem('reportData', JSON.stringify(this.submitData))
    },
    submit () {
      if (this.submitData.phone === '') {
        this.toast('手机号不能为空')
      } else if (!(/^1[345678]\d{9}$/.test(this.submitData.phone))) {
        this.toast('主手机号不合法')
      } else if (this.submitData.backPhone) {
        if (!(/^1[345678]\d{9}$/.test(this.submitData.backPhone))) {
          this.toast('备用手机号不合法')
        }
      } else {
        if (this.submitData.firstVisitTime) {
          this.submitData.firstVisitTime = this.submitData.firstVisitTime.getTime()
        } else if (this.submitData.secondVisitTime) {
          this.submitData.secondVisitTime = this.submitData.secondVisitTime.getTime()
        } else if (this.submitData.thirdVisitTime) {
          this.submitData.thirdVisitTime = this.submitData.thirdVisitTime.getTime()
        }
        this.submitData.visitorNum = +this.submitData.visitorNum
        let data = Object.assign({}, this.submitData, {
          'accountId': 58
        })
        delete data.visitText
        setPropertyReport(data).then(res => {
          if (res && res.content) {
            this.toast(res.msg || '报备成功')
            if (window.jrfw.isApp()) {
              window.jrfw.back()
            } else {
              history.back()
            }
          } else {
            this.toast(res.msg || '报备失败')
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .th_property_report{
    height: 100%;
    .th_property_report-cont{
      /deep/ .mint-cell{
        .mint-cell-title{
          min-width: 5rem;
          padding-left: 1.2rem;
          font-size: @defaultFontSize;
        }
        .mint-cell-value{
          font-size: @defaultFontSize;
          height: @defaultFontSize;
          color: @c6;
          .lineClamp(1);
          .color999{
            color: @c9;
          }
        }
        &.placeholder .mint-cell-value{
          color: @c9;
        }
        &::before{
          content: '';
          display: inline-block;
          width: @plrPage;
          height: @plrPage;
          position: absolute;
          top: 50%;
          left: @plrPage;
          transform: translateY(-55%);
          background: url('./imgs/star.png');
          background-size: contain;
        }
      }
      .tips{
        padding: 0 @plrPage;
        color: @cf;
        font-size: @smallFontSize;
        line-height: 1.5rem;
        background:rgba(94,109,228,0.4497);
      }
      .inputBox{
        li{
          padding: @plrPage .5rem;
          padding-left: calc(@plrPage + 1.2rem);
          background-size: 100% 1px;
          background-repeat: no-repeat;
          background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 45%, transparent 50%);
          background-position: bottom;
          position: relative;
          // height: 3rem;
          .title{
            font-size: @smallFontSize;
            span{
              color: @c9;
            }
          }
          .add{
            width: @defaultFontSize;
            height: @defaultFontSize;
            position: absolute;
            top: 0.5rem;
            right: 1rem;
            .addPhoneNumber{
              position: absolute;
              top: 0;
              /*right: 50%;*/
              width: @defaultFontSize;
              background-color: @c9;
              transform: translateX(-50%);
              &:before{
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 3px;
                height: @defaultFontSize;
                background-color: @c9;
              }
              &:after{
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 3px;
                height: @defaultFontSize;
                background-color: @c9;
                transform: rotateZ(90deg);
              }
            }
            .decrease{
              position: absolute;
              top: 0;
              /*right: 50%;*/
              width: @defaultFontSize;
              background-color: @c9;
              transform: translateX(-50%);
              &:before{
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 3px;
                height: @defaultFontSize;
                background-color: @c9;
                transform: rotateZ(90deg);
              }
            }
          }
          input{
            width: 100%;
            display: inline-block;
            outline: none;
            border: 0;
          }
          &:first-child{
            padding-right: 7rem;
          }
          &:last-child{
            background-size: 100% 0px;
          }
          &::before{
            content: '';
            display: inline-block;
            width: @plrPage;
            height: @plrPage;
            position: absolute;
            top: .6rem;
            left: @plrPage;
            background: url('./imgs/star.png');
            background-size: contain;
          }
          &.noRequire:before{
            display: none
          }
        }
        .radioBox{
          position: absolute;
          bottom: @plrPage/2;
          right: 0;
          input[type='radio'] {
            display: none;
            -webkit-appearance: none;
            &:checked + label{
              &::before{
                background-color: @cD14E33;
                border-color: @cD14E33;
              }
              &::after{
                transform: rotate(45deg) scale(1);
              }
            }
          }
          label{
            position: relative;
            color: @c9;
            margin-right: .3rem;
            font-size: @FontSize13;
            &::before{
              content: '';
              display: inline-block;
              border-radius: 100%;
              border: 1px solid #ccc;
              vertical-align: middle;
              width: 20px;
              height: 20px;
              position: relative;
              top: -2px;
              margin-right: @plrPage;
            }
            &:after{
              border: 2px solid @cf;
              border-left: 0;
              border-top: 0;
              content: " ";
              top: 2px;
              left: 8px;
              position: absolute;
              width: 4px;
              height: 8px;
              transform: rotate(45deg) scale(0);
              transition: transform .2s, -webkit-transform .2s;
            }
          }
        }
      }
      .th_property_report-service{
        /deep/ .mint-cell {
          &::before{
            display: none;
          }
          .mint-cell-wrapper{
            // background-size: 120% 0;
            .mint-cell-title{
              padding-left: 0;
            }
          }
        }
      }
      .th_property_report-remark{
        width: 100%;
        height: 6rem;
        display: block;
        padding: 0;
        font-size: .7rem;
        line-height: 1rem;
        word-break: break-all;
        padding: @plrPage;
        box-sizing: border-box;
        color:@c3;
      }
      .th_property_report-remark-length{
        text-align: right;
        font-size: @smallFontSize;
        color: @c9;
        padding-bottom: @plrPage;
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 45%, transparent 50%);
        background-position: bottom;
      }
    }
    .th_property_report-footer{
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
  }
</style>
