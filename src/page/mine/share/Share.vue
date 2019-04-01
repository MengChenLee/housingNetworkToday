<template>
  <div class="th_share">
    <th-layout :hiddenFooter="true">
      <div class="th_share-cont" ref="cont">
        <th-property-list :propertyList="list"></th-property-list>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {getBuildingsClient} from '../../../common/httpClient.js'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
export default {
  data () {
    return {
      list: []
    }
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  components: {
    ThPropertyList
  },
  mounted () {
    this.getData()
  },
  created () {
  },
  methods: {
    getData () {
      if (!this.$route.query.accountId || !this.$route.query.buildingGroupIds) {
        this.toast('推客信息丢失')
        return
      }
      let data = {
        'accountId': this.$route.query.accountId,
        'buildingGroupIds': this.$route.query.buildingGroupIds,
        'latitude': this.location.lat,
        'longitude': this.location.lng
      }
      getBuildingsClient(data).then((res) => {
        if (res && res.code === 1) {
          let cont = res && res.content
          this.list = cont
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_share{
 height: 100%;
}

</style>
