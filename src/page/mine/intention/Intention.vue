<template>
  <div class="th_intention">
    <th-layout :hiddenFooter="true">
      <div class="th_intention-header" slot="header">
        <th-back-btn></th-back-btn>
        <span>{{$route.meta.title}}</span>
        <router-link class="th_intention-item-img" to="/addIntention">
          <th-img-box :imgUrl="addImg"></th-img-box>
        </router-link>

      </div>
      <div class="th_intention-cont" ref="cont"  v-infinite-scroll="loadMore" infinite-scroll-distance="20">
        <mt-cell
          v-for="(item,i) in list" :key="i"
          :title="'意向'+item.id+'-----'+ item.name"
          @click.native="select(item)"
          >
          <ul class="th_intention-btn">
            <li @click.stop="delect(item.id,i)">
              删除
            </li>
            <li @click.stop="click(item)">
              {{$route.query.source === 'client'?'推客':'找房'}}
            </li>
          </ul>
        </mt-cell>
        <div class="more_loading">
            <span v-show="loading&&!allLoaded">加载中...</span>
            <span v-show="allLoaded">已全部加载</span>
          </div>
      </div>
    </th-layout>
  </div>
</template>
<script>
import {setIntention, delectIntention} from '../../../common/httpClient.js'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
import ThBackBtn from '../../../components/base/backBtn/BackBtn.vue'
import addImg from './imgs/add.png'
export default {
  data () {
    return {
      list: [],
      addImg: addImg,
      // 初始化无限加载相关参数
      pageNo: 1,
      loading: false, // 加载中
      allLoaded: true // 全部加载
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
  components: {
    ThBackBtn,
    ThPropertyList
  },
  created () {
    this.setData()
  },
  activated () {
    this.pageNo = 1
    this.setData()
  },
  methods: {
    loadMore () {
      if (!this.allLoaded) {
        this.loading = true
        ++this.pageNo
        this.getData()
      }
    },
    setData () {
      let data = {
        'accountId': this.userInfo.id,
        'lat': this.location.lat,
        'lng': this.location.lng,
        'pageNo': this.pageNo,
        'pageSize': 50
      }
      setIntention(data).then((res) => {
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
    select (item) {
      if (this.$route.query.isSelect) {
        sessionStorage.setItem('report-content', item.content)
        history.back()
      }
    },
    delect (id, index) {
      let data = {
        'accountId': this.userInfo.id,
        id: id
      }
      delectIntention(data).then((res) => {
        if (res && res.code === 1) {
          this.toast('删除成功')
          this.list.splice(index, 1)
        }
      })
    },
    click (item) {
      let select = {
        'buildingGroupName': item.buildingGroupName, // 楼盘名称
        'districtId': item.districtId, // 区县id
        'streetIds': item.streetIds, // 街道ids
        'lineId': item.lineId, // 地铁id
        'stepIds': item.stepIds, // 地铁站ids
        'eachPrice': item.eachPrice, // 单价
        'totalPrice': item.totalPrice, // 总价
        'firstPayment': item.firstPayment, // 首付
        'moduleType': item.moduleType, // 户型
        'moreIds': item.moreIds, // 更多ids
        'orderBy': item.orderBy // 排序
      }
      localStorage.setItem('select', JSON.stringify(select))
      this.$router.push({path: '/intentionProperty', query: {source: this.$route.query.source}})
    }
  }
}
</script>
<style lang="less" scoped>
.th_intention{
 height: 100%;
 .th_intention-header{
   width: 100%;
    height: 100%;
    line-height: @headerHeight;
    text-align: center;
    font-size: @FontSize17;
    color: @cf;
    .th_intention-item-img{
      width: 1.5rem;
      position: absolute;
      top: 50%;
      right: .5rem;
      transform: translateY(-50%);
    }
 }
 .th_intention-btn{
   width: 5rem;
   height: 1.4rem;
   line-height: 1.4rem;
   color: @cf;
   font-size: @smallFontSize;
   display: flex;
   text-align: center;
   li{
     background-color: @cTheme;
     border-radius: @borderRadius;
     flex: 1;
      &:last-child{
        margin-left: .5rem;
        background-color: @cD14E33;
      }
   }
 }
}
</style>
