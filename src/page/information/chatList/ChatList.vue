<template>
  <div class="th_chat_list">
    <th-layout ref="layBox" :hiddenFooter="true">
      <div class="th_chat_list-cont" ref="cont"  v-infinite-scroll="loadMore" infinite-scroll-distance="20">
        <ul>
          <li v-for="(item,i) in list" :key="i" @click="goChat(item.id, item.groupType, str (item.groupName))">
            <th-img-text-level class="th_chat_list-item">
              <th-img-box class="th_chat_list-item-img" :imgUrl="item.picPath || baseIcon" slot="left"></th-img-box>
              <div class="th_chat_list-item-cont">
                <p>
                  {{item.groupName}}
                  <span>{{item.lastMsnDate  | formatTime('YMDHMS')}}</span>
                </p>
                <div>{{item.lastMsn}}</div>
              </div>
            </th-img-text-level>
            <i class="unReadInfo" v-if="item.unReadNum">{{item.unReadNum > 99 ? '99+' : item.unReadNum}}</i>
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
import {setMyList} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      list: [],
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
  mounted () {
    this.getData()
  },
  // activated () {
  //   this.pageNo = 1
  //   this.getData()
  // },
  methods: {
    loadMore () {
      if (!this.allLoaded) {
        this.loading = true
        ++this.pageNo
        this.getData()
      }
    },
    getData () {
      let data = {
        'accountId': this.userInfo.id,
        'pageNo': this.pageNo,
        'pageSize': 10
      }
      setMyList(data).then((res) => {
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
    str (groupName) {
      let index = groupName.indexOf('-')
      return groupName.substring(index + 1, groupName.length)
    },
    goChat (id, groupType, groupName) {
      this.$router.push({name: 'chat', params: {id: id}, query: {groupType: groupType, groupName: groupName}})
    }
  }
}
</script>

<style lang="less" scoped>
.th_chat_list{
  height: 100%;
  color: @c9;
  /*padding-left:  @plrPage;*/
  font-size: @smallFontSize;
  ul{
    li{
      padding: @plrPage;
      border-bottom: 1px solid @cD8D8D8;
      height: 2.5rem;
      position: relative;
      .th_chat_list-item{
        /deep/ .th_img_text_level-left{
          width: 2.5rem;
        }
        /deep/ .th_img_text_level-right{
          width: calc(100% - 2.5rem);
          span{
            float: right;
          }
         }
      }
      .unReadInfo{
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        background-color: #D14E33;
        font-size: 12px;
        color: #ffffff;
        border-radius: 50%;
        position: absolute;
        top: 2px;
        left: 47px;
        text-align: center;
      }
    }
  }
}
</style>
