<template>
  <div class="th_dynamic_detail">
    <th-layout :hiddenFooter="true">
      <div class="th_dynamic_detail-box" v-if="info"  ref="cont">
        <div class="th_dynamic_detail-title">
          {{info.headline}}
        </div>
        <ul class="th_dynamic_detail-info">
          <!-- <li>来源：{{info.resource}}</li> -->
          <li>发布时间：{{info.createTime | formatTime}}</li>
        </ul>
        <div class="th_dynamic_detail-cont" v-html="info.content"></div>
      </div>
    </th-layout>
  </div>
</template>

<script>
import ThPromoteList from '../../../components/promoteList/PromoteList.vue'
import {setDynamicDetail} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      id: this.$route.params.id,
      info: null
    }
  },
  components: {
    ThPromoteList
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.setData()
  },
  activated () {
    this.id = this.$route.params.id
    this.setData()
  },
  // watch: {
  //   '$route' (to, from) {
  //     if (to.name === 'dynamicDetail' && to.path !== from.path) {

  //     }
  //   }
  // },
  // beforeRouteUpdate (to, from, next) {
  //   this.id = to.params.id
  //   this.setData()
  //   this.$refs.cont.scrollTop = 0
  //   to.meta.scrollTop = 0
  //   next()
  // },
  methods: {
    setData () {
      let data = {
        'id': this.id
      }
      setDynamicDetail(data).then((res) => {
        let cont = res && res.content
        console.log(cont)
        this.info = cont && cont.buildingNews
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_dynamic_detail{
  height: 100%;
  .th_dynamic_detail-box{
    padding: 0 @plrPage;
    .th_dynamic_detail-title{
      color: @c3;
      line-height: 1.5rem;
      font-size: @FontSize15;
      font-weight: bold;
    }
    .th_dynamic_detail-info{
      color: @c9;
      font-size: @smallFontSize;
      margin: .5rem 0 1rem;
      li{
        display: inline-block;
      }
    }
    .th_dynamic_detail-cont{
      color: @c4C4C4C;
      font-size: @defaultFontSize;
      /deep/ img{
        max-width: 100%;
        max-height: 100%;
      }
      /deep/ p{
        overflow: hidden;
        // white-space:normal;
        // word-break: break-all;
      }
    }
  }
}
</style>
