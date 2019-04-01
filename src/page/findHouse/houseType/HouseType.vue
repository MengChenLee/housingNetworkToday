<template>
  <div class="th_house_type">
    <th-layout :hiddenFooter="true">
      <div class="th_house_type-cont"  ref="cont">
        <th-houseType-list :houseTypeList="list"></th-houseType-list>
      </div>
    </th-layout>
  </div>
</template>

<script>
import ThHouseTypeList from '../../../components/houseTypeList/HouseTypeList.vue'
import {setHouseType} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    ThHouseTypeList
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  mounted () {

  },
  created () {
    this.setData()
  },
  methods: {
    setData () {
      let data = {
        'id': this.$route.params.id,
        'accountId': this.userInfo.id
      }
      setHouseType(data).then((res) => {
        let cont = res && res.content
        this.list = cont
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_house_type{
  height: 100%;
  /*<!--padding: 0 @plrPage;-->*/
}
</style>
