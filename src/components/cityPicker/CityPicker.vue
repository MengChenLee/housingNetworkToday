<template>
    <mt-popup
        class="th_city_picker"
        v-model="popupVisible"
        position="bottom">
        <mt-picker
            :showToolbar="true"
            :visibleItemCount="7"
            :slots="myAddressSlots"
            value-key="name"
            @change="onMyAddressChange">
                <ul class="cityPicker-btn">
                    <li @click="click">取消</li>
                    <li @click="click">确定</li>
                </ul>
        </mt-picker>
    </mt-popup>
</template>

<script>
// import myaddress from '../assets/pca.json'
import {setCityList} from '../../common/httpClient.js'
export default {
  name: 'App',
  data () {
    return {
      popupVisible: false,
      address: null, // 省市区接口数据
      // myaddress: [], // 省市区页面数据
      myAddressSlots: [
        {
          flex: 1,
          values: [], // 省份数组
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }
        // {
        //   divider: true,
        //   content: '-',
        //   className: 'slot4'
        // },
        // {
        //   flex: 1,
        //   values: [],
        //   className: 'slot5',
        //   textAlign: 'center'
        // }
      ],
      myAddressProvince: '省',
      myAddressCity: '市',
      myAddresscounty: '区/县'

    }
  },
  components: {
  },
  watch: {
    address: {
      handler (val) {
        // console.log(111, val)
        localStorage.setItem('cityPickerList', JSON.stringify(val))
      },
      deep: true
    }
  },
  mounted () {
    // 设置初始值
    // this.setCityList().then(provinceList => { // 省
    //   this.address = provinceList
    //   this.myAddressSlots[0].values = this.address
    // this.setCityList(this.address[0].id).then(cityList => { // 市
    //   this.address[0].child = cityList
    //   this.myAddressSlots[2].values = cityList
    //   this.setCityList(this.address[0].id).then(countyList => { // 区/县
    //     this.address[0].child[0].child = countyList
    //     this.myAddressSlots[4].values = countyList
    //   })
    // })
    // })
  },
  methods: {
    setCityList (parentId = 0) {
      let postData = {
        key: '99bf91bec40f5b30645d2612edced65aab2c27b7',
        parentId: parentId
      }
      return setCityList(postData).then(res => {
        return res.content
      })
    },
    open () {
      this.popupVisible = true
    },
    async onMyAddressChange (picker, values) {
      if (this.address) {
        if (values[0]) { // 选择了省，设置市
          if (!this.address[values[0].index].child) {
            await this.setCityList(values[0].id).then(list => { // 市
              list.forEach((item, index) => {
                item.index = index
              })
              this.$set(this.address[values[0].index], 'child', list)
            })
          }
          picker.setSlotValues(1, this.address[values[0].index].child)
        }
        // if (values[1] && values[0].id === values[1].parentId) { // 选择了市，设置区县
        //   if (!this.address[values[0].index].child[values[1].index].child) {
        //     await this.setCityList(values[1].id).then(list => { // 区县
        //       list.forEach((item, index) => {
        //         item.index = index
        //       })
        //       this.$set(this.address[values[0].index].child[values[1].index], 'child', list)
        //     })
        //   }
        //   picker.setSlotValues(2, this.address[values[0].index].child[values[1].index].child)
        // }
      } else {
        await this.setCityList().then(list => { // 省
          list.forEach((item, index) => {
            item.index = index
          })
          this.address = list
          picker.setSlotValues(0, list)
        })
      }
      this.myAddressProvince = values[0]
      this.myAddressCity = values[1]
      this.myAddresscounty = values[2]
    },
    click (flag) {
      this.popupVisible = false
      this.$emit('click', this.myAddressProvince, this.myAddressCity, this.myAddresscounty)
    }
  }
}
</script>

<style lang="less" scoped>
.th_city_picker{
  width: 100%;
  .cityPicker-btn{
      font-size: 16px;
      color: #26a2ff;
      text-align: center;
      overflow: hidden;
      border-bottom: solid 1px #eaeaea;
      li{
          width: 50%;
          height: 40px;
          line-height: 40px;
          float: left;
      }
  }
}

</style>
