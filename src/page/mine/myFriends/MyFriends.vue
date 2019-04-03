<template>
  <div class="th_friends">
    <th-layout ref="layBox" :hiddenFooter="true">
      <div class="th_friends-cont" ref="cont"  v-infinite-scroll="loadMore" infinite-scroll-distance="20">
        <div class="th_friends-header">
          <mt-navbar v-model="active">
            <mt-tab-item id="0">全部</mt-tab-item>
            <mt-tab-item id="1">游客</mt-tab-item>
            <mt-tab-item id="2">会员</mt-tab-item>
            <mt-tab-item id="3">VIP会员</mt-tab-item>
          </mt-navbar>
        </div>
        <ul>
          <li v-for="(item,i) in list" :key="i" @click="setIdentity(item.accountId)" >
            <th-img-text-level class="th_friends-item">
              <th-img-box class="th_friends-item-img" :imgUrl="item.avatar || baseIcon" slot="left"></th-img-box>
              <div class="th_friends-item-cont">
                <div>{{item.userName}}</div>
                <div>
                  <!-- 3 vip 4 合伙经纪 5 合伙专员 6 区域合伙人 7城市合伙人 -->
                  <span v-if="item.type===3">vip客户</span>
                  <span v-else-if="item.type===4">合伙经纪</span>
                  <span v-else-if="item.type===5">合伙专员</span>
                  <span v-else-if="item.type===6">区域合伙人</span>
                  <span v-else-if="item.type===7">城市合伙人</span>
                  <span v-else>游客</span>
                </div>
              </div>
            </th-img-text-level>
          </li>
        </ul>
      </div>
    </th-layout>
  </div>
</template>
<script>
import {setMyFriends, setMyFriendsIdentity} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      list: [],
      active: '0',
      groupId: Number(this.$route.params.id),
      baseIcon: window.jrfw.baseIcon,
      // 初始化无限加载相关参数
      pageNo: 1,
      loading: false, // 加载中
      allLoaded: true // 全部加载
    }
  },
  components: {
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  watch: {
    active (val) {
      this.pageNo = 1
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    loadMore () {
      if (!this.allLoaded) {
        this.loading = true
        ++this.pageNo
        this.getData()
      }
    },
    setIdentity (inviteAccountId) {
      this.messageBox.confirm('确定执行此操作?').then(action => {
        let data = {
          'accountId': this.userInfo.id,
          'inviteAccountId': inviteAccountId,
          'type': 3
        }
        setMyFriendsIdentity(data).then((res) => {
        // this.data = res && res.content
          if (res && res.code === 1) {
            this.toast('邀请发送成功')
          } else {
            this.toast(res.msg || '邀请发送失败')
          }
        })
      }).catch(() => {})
    },
    getData () {
      let data = {
        'accountId': this.userInfo.id,
        'pageNo': this.pageNo,
        'pageSize': 10,
        'type': this.active
      }
      setMyFriends(data).then((res) => {
        this.loading = false
        if (res && res.code === 1) {
          let cont = res && res.content
          this.allLoaded = cont.length !== 10
          if (this.pageNo === 1) {
            this.list = cont
          } else {
            this.list.push(...cont)
          }
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_friends{
  height: 100%;
  color: @c9;
  /*padding-left:  @plrPage;*/
  font-size: @smallFontSize;
  .th_friends-cont{
    padding-top:1.8rem;
    .th_friends-header{
      width: 100%;;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      box-shadow:0px 2px 0px 0px @cD8D8D8;
      & /deep/ .mint-navbar{
        height: 1.8rem;
        overflow: hidden;
        .mint-tab-item{
          padding:0;
          color: @c3;
          .mint-tab-item-label{
            font-size: @FontSize15;
            height: 1.8rem;
            line-height: 1.8rem;
          }
          &.is-selected{
            color: @cTheme;
          }
        }
      }
    }
    ul{
      li{
        padding: @plrPage;
        border-bottom: 1px solid @cD8D8D8;
        height: 2.5rem;
        .th_friends-item{
          /deep/ .th_img_text_level-left{
            width: 2.5rem;
          }
          /deep/ .th_img_text_level-right{
            width: calc(100% - 2.5rem);
            span{
              float: right;
            }
          }

          // .th_friends-item-cont{
          //   height: 100%;
          // }
        }
      }
    }
  }

}
</style>
