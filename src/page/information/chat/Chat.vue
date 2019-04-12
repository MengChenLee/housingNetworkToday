<template>
  <div class="th_chat" :style="{height: `${screenHeight}px`}">
    <th-layout>
      <div class="th_chat-header" slot="header">
        <th-back-btn></th-back-btn>
        <span>{{$route.query.groupName}}</span>
        <router-link class="th_chat-item-img" :to="'/chatMemberList/'+groupId">
          ···
        </router-link>
      </div>
      <div class="contBox" id="contBox">
        <div class="th_chat-cont" ref="cont" id="cont" @scroll="loadMore" v-show="reFresh">
          <div class="more_loading">
            <span v-show="loading&&!allLoaded">加载中...</span>
            <span v-show="allLoaded">已全部加载</span>
          </div>
          <th-chat-item :chatData="list" :accountId='userInfo.id'></th-chat-item>
        </div>
      </div>
    </th-layout>
    <th-footer slot="footer" @send="send" class="th-footer" @scrollTop="scrollTopSend"></th-footer>
  </div>
</template>
<script>
// , getCompanyMsnList, setGroupMsnList, setChatMsnList
import {sendMsn, setMsnListById} from '../../../common/httpClient.js'
import ThChatItem from './chatItem/ChatItem.vue'
import ThBackBtn from '../../../components/base/backBtn/BackBtn.vue'
import ThFooter from './footer/Footer.vue'
export default {
  data () {
    return {
      groupId: '',
      groupType: '',
      list: [],
      listRelize: [],
      ing: true,
      // 初始化无限加载相关参数setMsnListById,
      pageNo: 1,
      otherAccountId: this.$route.query.accountId || '',
      bulidingGroupId: '',
      loading: false, // 加载中
      reFresh: false,
      allLoaded: true, // 全部加载
      data: {}
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  components: {
    ThChatItem,
    ThFooter,
    ThBackBtn
  },
  created () {
    this.buidingGroupId = this.$route.params.id
    this.groupType = this.$route.query.groupType
  },
  mounted () {
  },
  updated () {
    this.scrollTop()
  },
  activated () {
    this.groupId = this.$route.params.id
    this.otherAccountId = this.$route.query.accountId || ''
    this.pageNo = 1
    this.setMsnListById()
    this.scrollTop()
  },
  methods: {
    scrollTop () {
      if (this.pageNo === 1) {
        this.$nextTick(() => {
          let container = this.$el.querySelector('#cont')
          container.scrollTop = container.scrollHeight
        })
      } else {
        this.$nextTick(() => {
          let container = this.$el.querySelector('#cont')
          container.scrollTop = container.offsetHeight - container.scrollTop
        })
      }
    },
    scrollTopSend () {
      this.$nextTick(() => {
        let container = this.$el.querySelector('#cont')
        container.scrollTop = container.scrollHeight
      })
    },
    loadMore () {
      if (this.$refs.cont.scrollTop < 20 && !this.allLoaded && !this.loading) {
        this.loading = true
        ++this.pageNo
        this.setMsnListById()
      }
    },
    setMsnListById () {
      this.reFresh = false
      let data = {
        'accountId': this.userInfo.id,
        'groupId': this.groupId,
        'pageNo': this.pageNo,
        'pageSize': 15
      }
      setMsnListById(data).then((res) => {
        this.loading = false
        if (res && res.code === 1) {
          this.reFresh = true
          let cont = res && res.content
          this.allLoaded = cont.msnList.length !== 15
          if (this.pageNo === 1) {
            this.list = cont.msnList
          } else {
            this.list.splice(0, 0, ...cont.msnList)
          }
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    send (sendData) {
      // private Long accountId;
      // private Long otherAccountId;
      // private Long chatId;
      // private Long targetId;//楼盘资源id
      // private Integer targetType;// 1 文字 2图片 3语音 4 楼盘 5 视频 5地理位置
      // private String picPath;// 图片url /楼盘图片/语音URL/视频URL
      // private String content;// 文字 或 楼盘标题 或地址
      // private String description;// 楼盘标签
      // private String lat;
      // private String lng;
      // private Integer groupType;// 1 在线咨询 2 公司房聊 3私聊 4报备利益链群聊
      // console.log(this.groupId)
      let data = {
        'accountId': this.userInfo.id,
        'groupId': this.groupId
      }
      sendMsn(Object.assign(data, sendData)).then((res) => {
        let cont = res && res.content
        this.list.push(cont)
        this.scrollTopSend()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.th_chat{
  height: 100%;
  position: relative;
  .th-footer{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }
  .th_chat-header{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    /* justify-content: normal; */
    align-items: center;
    width: calc(100% - 20px);
    line-height: @headerHeight;
    text-align: center;
    font-size: @FontSize17;
    color: @cf;
    padding: 0 10px;
    transform: translateZ(0);
    span{
      display: flex;
      width: 100%;
      justify-content: center;
    }
    .th_chat-item-img{
      width: 1.5rem;
      position: absolute;
      top: 50%;
      right: 0;
      font-size: @FontSize18;
      font-family: '宋体';
      color: @cf;
      font-weight: bolder;
      letter-spacing: -10px;
      text-indent: -10px;
      text-align: center;
      transform: translate(-10px,-50%);
    }
  }
  .contBox{
    background-color: @cF5F5F5;
  }
  .th_chat-cont{
    /*box-sizing: border-box;*/
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
