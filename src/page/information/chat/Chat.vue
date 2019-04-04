<template>
  <div class="th_chat">
    <th-layout>
      <div class="th_chat-header" slot="header">
        <th-back-btn></th-back-btn>
        <span>{{$route.meta.title}}</span>
        <router-link class="th_chat-item-img" :to="'/chatMemberList/'+groupId">
          ···
        </router-link>
      </div>
      <div class="contBox" id="contBox">
        <div class="th_chat-cont" ref="cont" @scroll="loadMore">
          <div class="more_loading">
            <span v-show="loading&&!allLoaded">加载中...</span>
            <span v-show="allLoaded">已全部加载</span>
          </div>
          <th-chat-item :chatData="list" :accountId='userInfo.id'></th-chat-item>
        </div>
      </div>
      <th-footer slot="footer" @send="send"></th-footer>
    </th-layout>
  </div>
</template>
<script>
import {sendMsn, setMsnListById} from '../../../common/httpClient.js'
import ThChatItem from './chatItem/ChatItem.vue'
import ThBackBtn from '../../../components/base/backBtn/BackBtn.vue'
import ThFooter from './footer/Footer.vue'
export default {
  data () {
    return {
      groupId: '',
      list: [],
      ing: true,
      // 初始化无限加载相关参数setMsnListById,
      pageNo: 1,
      otherAccountId: this.$route.query.accountId || '',
      bulidingGroupId: '',
      loading: false, // 加载中
      allLoaded: true // 全部加载
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  watch: {
  },
  components: {
    ThChatItem,
    ThFooter,
    ThBackBtn
  },
  created () {
    this.groupId = this.$route.params.id
    console.log(this.groupId)
    this.setMsnListById()
  },
  mounted () {
    this.scrollTop()
  },
  updated () {
    this.scrollTop()
  },
  activated () {
    this.scrollTop()
    this.groupId = this.$route.params.id
    this.otherAccountId = this.$route.query.accountId || ''
    this.pageNo = 1
    this.setMsnListById()
  },
  methods: {
    scrollTop () {
      this.$nextTick(() => {
        let container = this.$el.querySelector('#contBox')
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
      let data = {
        'accountId': this.userInfo.id,
        'groupId': this.groupId,
        'pageNo': this.pageNo,
        'pageSize': 15
      }
      setMsnListById(data).then((res) => {
        this.loading = false
        if (res && res.code === 1) {
          let cont = res && res.content
          this.allLoaded = cont.msnList.length !== 15
          if (this.pageNo === 1) {
            this.list = cont.msnList
            this.$nextTick(() => {
              this.$refs.cont.scrollTop = this.$refs.cont.scrollHeight
            })
          } else {
            let scrollHeight = JSON.parse(JSON.stringify(this.$refs.cont.scrollHeight))
            this.list.splice(0, 0, ...cont.msnList)
            this.$nextTick(() => {
              this.$refs.cont.scrollTop = this.$refs.cont.scrollHeight - scrollHeight
            })
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
      // console.log(this.groupId)
      let data = {
        'accountId': this.userInfo.id,
        'groupId': this.groupId
      }
      sendMsn(Object.assign(data, sendData)).then((res) => {
        let cont = res && res.content
        this.list.push(cont)
        this.$nextTick(() => {
          this.$refs.cont.scrollTop = this.$refs.cont.scrollHeight
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.th_chat{
  height: 100%;
  .th_chat-header{
    height: 100%;
    line-height: @headerHeight;
    text-align: center;
    font-size: @FontSize17;
    color: @cf;
    padding: 0 10px;
    .th_chat-item-img{
      width: 1.5rem;
      position: absolute;
      top: 50%;
      right: .5rem;
      color: @cf;
      transform: translateY(-50%);
    }
  }
  .contBox{
    background-color: @cF5F5F5;
  }
  .th_chat-cont{
    box-sizing: border-box;
    /*overflow-y: scroll;*/
  }
}
</style>
