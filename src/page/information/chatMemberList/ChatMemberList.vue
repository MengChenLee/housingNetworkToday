<template>
  <div class="th_chat_member_list">
    <th-layout ref="layBox" :hiddenFooter="true">
      <div class="th_chat_member_list-cont" ref="cont">
        <ul>
          <!-- @click="goChat(item.accountId)" -->
          <li v-for="(item,i) in list" :key="i">
            <th-img-text-level class="th_chat_member_list-item">
              <th-img-box class="th_chat_member_list-item-img" :imgUrl="item.avatar || baseIcon" slot="left"></th-img-box>
              <div class="th_chat_member_list-item-cont">
                <div>{{item.userName}}</div>
              </div>
            </th-img-text-level>
          </li>
        </ul>
        <div class="more_loading">
            <span v-show="loading&&!allLoaded">加载中...</span>
            <span v-show="allLoaded">已全部加载</span>
          </div>
      </div>
    </th-layout>
  </div>
</template>
<script>
import {setChatMsnList, setMsnMemberList} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      list: [],
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
  created () {
    this.getData()
  },
  activated () {
    this.groupId = Number(this.$route.params.id)
    this.pageNo = 1
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
    setTitle () {
      // let title = ''
      // document.title = title
      // this.$route.meta.title = title
      // this.$refs.layBox.headerRefresh()
    },
    getData () {
      let data = {
        'accountId': this.userInfo.id,
        'id': this.groupId,
        'pageNo': this.pageNo,
        'pageSize': 10
      }
      setMsnMemberList(data).then((res) => {
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
    },
    /**
     * 暂时不做---------------------------------------------
     */
    goChat (accountId) {
      if (this.userInfo.id === accountId) {
        this.toast('不能私聊自己')
        return false
      }
      let data = {
        'accountId': this.userInfo.id,
        'otherAccountId': accountId,
        'loginToken': this.userInfo.loginToken,
        'pageNo': 1,
        'pageSize': 10
      }
      setChatMsnList(data).then((res) => {
        let cont = res && res.content
        this.$router.push({name: 'chat', params: {id: cont.groupId}})
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_chat_member_list{
  height: 100%;
  color: @c9;
  /*padding-left:  @plrPage;*/
  font-size: @smallFontSize;
  ul{
    li{
      padding: @plrPage @plrPage @plrPage 0;
      border-bottom: 1px solid @cD8D8D8;
      height: 2.5rem;
      .th_chat_member_list-item{
        /deep/ .th_img_text_level-left{
          width: 2.5rem;
        }
        /deep/ .th_img_text_level-right{
          width: calc(100% - 2.5rem);
          span{
            float: right;
          }
         }

        // .th_chat_member_list-item-cont{
        //   height: 100%;
        // }
      }
    }
  }
}
</style>
