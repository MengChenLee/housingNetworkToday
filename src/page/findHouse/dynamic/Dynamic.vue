<template>
  <div class="th_dynamic">
    <th-layout :hiddenFooter="true">
      <div class="th_dynamic-cont" ref="cont" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
        <ul>
          <li class="th_dynamic-item" v-for="(item,i) in list" :key="i" >
            <div class="th_dynamic-item-img"><th-img-box :imgUrl="item.userPhoto"></th-img-box></div>
            <div class="th_dynamic-item-box">
              <div class="th_dynamic-item-name">{{item.userName}}</div>
              <div class="th_dynamic-item-cont">{{item.dynamicContent}}</div>
              <ul class="th_dynamic-item-media">
                <li v-if="item.dynamicType === 1">
                  <ul class="th_dynamic-item-imgs">
                    <li v-for="(imgItem,imgIndex) in item.dynamicPhotos" :key="imgIndex" @click="browserPicture(item.dynamicPhotos,imgIndex)">
                      <th-img-box :imgUrl="imgItem.url"></th-img-box>
                    </li>
                  </ul>
                </li>
                <li v-else>
                  <video class="th_dynamic-item-video" :src="item.dynamicVideoUrl" :poster="item.dynamicVideoCover" controls></video>
                </li>
              </ul>
              <div class="th_dynamic-item-time">{{item.createTime | formatTime('YMDHMS_')}}</div>
              <div class="th_dynamic-item-like" :class="{'active':item.likeStatus}" @click="addLikes(item)">点赞({{item.likeNum}})</div>
            </div>
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
import ThDynamicList from '../../../components/dynamicList/DynamicList.vue'
import {setDynamic, addLikes, setInfoListById} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      list: [],
      // 初始化无限加载相关参数
      pageNo: 1,
      loading: false, // 加载中
      allLoaded: true // 全部加载
    }
  },
  components: {
    ThDynamicList
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  mounted () {
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
    getData () {
      let id = Number(this.$route.params.id)
      if (id) {
        let data = {
          'accountId': this.userInfo.id,
          'id': this.$route.params.id,
          'pageNo': this.pageNo,
          'pageSize': 10
        }
        setDynamic(data).then((res) => {
          this.loading = false
          if (res && res.code === 1) {
            let cont = res && res.content
            this.allLoaded = cont.userDynamics.length !== 10
            if (this.pageNo === 1) {
              this.list = cont.userDynamics
            } else {
              this.list.push(...cont.userDynamics)
            }
          } else {
            this.toast(res.msg || '加载失败')
          }
        })
      } else {
        let data = {
          'accountId': this.userInfo.id,
          'mediaType': 3,
          'pageNo': this.pageNo,
          'pageSize': 10
        }
        setInfoListById(data).then((res) => {
          this.loading = false
          if (res && res.code === 1) {
            let cont = res && res.content
            this.allLoaded = cont.userDynamics.length !== 10
            if (this.pageNo === 1) {
              this.list = cont.userDynamics
            } else {
              this.list.push(...cont.userDynamics)
            }
          } else {
            this.toast(res.msg || '加载失败')
          }
        })
      }
    },
    addLikes (item) {
      let data = {
        'accountId': this.userInfo.id,
        'targetId': item.id,
        'targetType': 1
      }
      addLikes(data).then((res) => {
        if (res && res.code === 1) {
          if (res.content === 1) { // 点赞
            item.likeStatus = 1
            item.likeNum++
          } else { // 取消点赞
            item.likeStatus = 0
            item.likeNum--
          }
          this.toast(res.msg)
        } else {
          this.toast(res.msg || '点赞失败')
        }
      })
    },
    browserPicture (list, index) {
      let picList = []
      list.forEach(item => {
        picList.push({
          images: item.url
        })
      })
      this.openPopupVisible(picList, index)
    }
  }
}
</script>

<style lang="less" scoped>
.th_dynamic{
  height: 100%;
  .th_dynamic-item{
    padding:(@plrPage + 1) (@plrPage - 1);
    overflow: hidden;
    font-size: @defaultFontSize;
    color: @c3;
    border-bottom: 1px solid @cD8D8D8 ;
    .th_dynamic-item-img{
      width: 1.9rem;
      border-radius: @borderRadius;
      float: left;
      overflow: hidden;
    }
    .th_dynamic-item-box{
      padding-left:@plrPage + 1;
      overflow:hidden;
      line-height: 1rem;
      .th_dynamic-item-name{
        color:@cTheme;
      }
      .th_dynamic-item-cont{
        padding: 2px 0;
        word-break: break-all;
      }
      .th_dynamic-item-imgs{
        overflow: hidden;
        display: grid;
        grid-template-columns: auto auto auto;
        grid-column-gap: 14px;
        grid-row-gap: 10px;
        li{
          // width: 30%;
          float: left;
        }
      }
        .th_dynamic-item-video{
          max-width: 100%;
          max-height: 12rem;
        }
      .th_dynamic-item-time{
        padding: 2px 0;
        font-size: @FontSize13;
      }
      .th_dynamic-item-like{
        width: 7rem;
        line-height: 1.3rem;
        font-size: @FontSize13;
        border: 1px solid @cD8D8D8;
        color: @c6;
        border-radius: @borderRadius;
        text-align: center;
        &.active{
          background-color: @cD14E33;
          border-color: @cD14E33;
          color: @cf;
        }
      }
    }
  }
}
</style>
