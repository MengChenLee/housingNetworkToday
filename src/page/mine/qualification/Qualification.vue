<template>
  <div class="th_qualification">
    <th-layout :hiddenFooter="!footerText">
      <div class="th_qualification-cont" ref="cont" :class="{ing:ing}">
        <th-chat-item :chatData="quesList" :popupVisible="popupVisible" @click="getAns"></th-chat-item>
        <!-- <div @click="goUrl">购房资格全解</div> -->
      </div>
      <th-footer slot="footer" :footerText="footerText" @click="submit"></th-footer>
    </th-layout>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <mt-picker :slots="slots" valueKey="title" @change="onValuesChange"></mt-picker>
      <ul class="submit">
        <li @click="selectAns">确定</li>
      </ul>
    </mt-popup>
    <!--<div class="modulePicker" v-show="popupVisible">
      <div class="pickers" v-for="(item, index) in values" :key="index">
        <span class="picker">{{item.title}}</span>
      </div>
    </div>-->
  </div>
</template>
<script>
import {setQualification} from '../../../common/httpClient.js'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
import ThChatItem from './chatItem/ChatItem.vue'
import ThFooter from './footer/Footer.vue'
export default {
  data () {
    return {
      quesList: [
        {
          ques: '你好，欢迎使用购房资格测试，请按照步骤回答下列问题，我们将帮您测试是否符合购房资格'
        }
      ],
      footerText: '开始测试',
      ing: false,
      reportHtml: '',
      slots: [ // popup的值
        {
          values: [],
          defaultIndex: 0
        }
      ],
      changeFlag: false,
      popupVisible: false,
      value: '', // popup选择的值
      values: []
    }
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  watch: {
    quesList: {
      handler (val) {
        if (!val.length) return
        let lastItem = val[val.length - 1]
        // console.log(lastItem)
        if (lastItem.ansList && lastItem.ansList.length) {
          this.popupVisible = true
          this.values = lastItem.ansList
          this.$set(this.slots[0], 'values', lastItem.ansList)
          this.$set(this.slots[0], 'defaultIndex', 0)
        }
        // 滚动条滚到底部
        this.$nextTick(() => {
          this.$refs.cont.scrollTop = this.$refs.cont.scrollHeight
        })
        sessionStorage.setItem('quesList', JSON.stringify(val))
      },
      deep: true
    }
  },
  components: {
    ThPropertyList,
    ThChatItem,
    ThFooter
  },
  activated () {
    const quesList = sessionStorage.getItem('quesList')
    quesList && (this.quesList = JSON.parse(quesList))
    if (this.quesList.length === 0) {
      this.footerText = ''
    } else if (this.quesList.length > 1) {
      this.footerText = '重新测试'
    }
    let lastItem = this.quesList[this.quesList.length - 1]
    if (lastItem.type === 'selectCity') {
      lastItem.type = ''
      this.ing = true
      this.reportHtml = `城市：${this.location.selectCity || this.location.city}<br/>`
      this.quesList.push({ques: this.location.selectCity || this.location.city, isOwner: true, reportHtml: this.reportHtml})
      this.setData()
    }
  },
  mounted () {
    this.wxShare({
      title: '今日房网-购房资格测试',
      link: 'http://h5.jrfw360.com/qualification',
      desc: '一键测试，资格知晓'
    })
  },
  methods: {
    getAns (ans) {
      this.reportHtml += `${ans.title}<br/>`
      this.quesList.push({ques: ans.title, isOwner: true, reportHtml: this.reportHtml})
      if (ans.end === 2) {
        this.ing = false
        this.footerText = '重新测试'
        this.reportHtml += `<a href="${this.picPath}">购房资格全解</a>`
        this.quesList.push({ques: ans.result, type: 'isReport', reportHtml: this.reportHtml})
        return
      }
      // console.log(ans.id)
      this.setData(ans.parentId, ans.id)
    },
    setData (id = 0, parentId = 0) {
      let data = {
        'cityId': this.location.selectCityId || this.location.cityId,
        'content': 'string',
        'end': 0, // 为2则结束
        'id': id,
        'parentId': parentId,
        'report': 0, // 为2则记录 问题1：答案
        'result': 'string',
        'status': 0,
        'title': 'string'
      }
      setQualification(data).then((res) => {
        let cont = res.content
        if (cont.title) {
          this.reportHtml = `${this.reportHtml}${cont.title.title}：`
          this.quesList.push({ques: cont.title.title, ansList: cont.ansList, reportHtml: this.reportHtml})
          // picPath 购房资格全解 结果页显示
          this.picPath = cont && cont.picPath
        } else {
          this.toast('当前城市未配置测试题')
        }
      })
    },
    submit () {
      if (this.footerText === '开始测试') {
        this.quesList.push({ques: this.footerText, isOwner: true})
        this.quesList.push({ques: '请问您需要购房的城市是哪里？', type: 'selectCity'})
        this.footerText = ''
      } else if (this.footerText === '重新测试') {
        // this.$set(this.quesList, 'length', 0)
        this.quesList = []
        this.quesList.push({ques: '你好，欢迎使用购房资格测试，请按照步骤回答下列问题，我们将帮您测试是否符合购房资格'})
        this.quesList.push({ques: this.footerText, isOwner: true})
        this.quesList.push({ques: '请问您需要购房的城市是哪里？', type: 'selectCity'})
        this.footerText = ''
      }
    },
    goUrl () {
      let url = 'http://img.jrfw360.com/manage/1543921291609.jpg'
      this.$router.push({path: '/myIframe', query: {title: '购房资格全解', url: encodeURIComponent(url)}})
    },
    onValuesChange (picker, values) {
      this.changeFlag = true
      // console.log(picker)
      this.value = values[0]
    },
    selectAns () {
      if (!this.changeFlag) {
        this.value = this.slots[0].values[0]
      }
      this.getAns(this.value)
      this.popupVisible = false
      this.changeFlag = false
    }
  }
}
</script>
<style lang="less" scoped>
.th_qualification{
 height: 100%;
 background-color: @cF5F5F5;
 .th_qualification-cont{
   background-color: @cF5F5F5;
  box-sizing: border-box;
  &.ing{
    padding-bottom: 12rem;
  }
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
 /deep/ .v-modal{
    opacity: 0;
  }

}
</style>
