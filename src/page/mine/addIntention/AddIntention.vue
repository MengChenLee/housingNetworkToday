<template>
  <div class="th_add_intention">
    <th-layout>
      <div class="th_add_intention-cont" ref="cont">
        <div class="th_add_intention-text-Box">
          <ul class="th_add_intention-text">
            <li v-for="(item,i) in content.split(',')" :key="i">{{item}}</li>
          </ul>
        </div>
        <div class="th_add_intention-report">
          <span>是否通知我</span>
          <input type="radio" name="report" id="yes" :value="0" v-model="report"><label for="yes">否</label>
          <input type="radio" name="report" id="no" :value="1" v-model="report"><label for="no">是</label>
        </div>
        <textarea class="th_add_intention-name" v-model="name" placeholder="请输入备注" maxlength="30"></textarea>
        <div class="th_add_intention-name-length">{{name.length}}/30</div>
        <div class="th_add_intention-select"><th-filider-select :select="select"></th-filider-select></div>
      </div>
      <div class="th_add_intention-footer" @click="submit" slot="footer">
        <span>确定</span>
      </div>
    </th-layout>
  </div>
</template>
<script>
import {addIntention} from '../../../common/httpClient.js'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
import ThFiliderSelect from '../../../components/filiderSelect/FiliderSelect.vue'
export default {
  data () {
    return {
      intentionList: [],
      'content': '',
      'name': '',
      'report': 0,
      select: {
        'districtId': 0, // 区县id
        'streetIds': '', // 街道ids
        'lineId': 0, // 地铁id
        'stepIds': '', // 地铁站ids
        'eachPrice': '', // 单价
        'totalPrice': '', // 总价
        'firstPayment': '', // 首付
        'moduleType': '', // 户型
        'moreIds': '', // 更多ids
        'orderBy': '' // 排序
      }
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
  watch: {
    select: {
      handler (val) {
        let content = this.location.city || this.location.selectCity
        val.areaText && (content += `,${val.areaText}`)
        val.lineText && (content += `,${val.lineText}`)
        val.totalPrice && (content += `,${val.totalPrice}`)
        val.eachPrice && (content += `,${val.eachPrice}`)
        val.firstPayment && (content += `,${val.firstPayment}`)
        val.moduleType && (content += `,${val.moduleType}`)
        val.moreText && (content += `,${val.moreText}`)
        val.orderText && (content += `,${val.orderText}`)
        this.content = content
      },
      deep: true
    }
  },
  components: {
    ThPropertyList,
    ThFiliderSelect
  },
  created () {
    this.content = this.location.city || this.location.selectCity
  },

  methods: {
    submit () {
      let data = Object.assign(this.select, {
        'accountId': this.userInfo.id,
        cityIds: this.location.cityId || this.location.selectCityId,
        'content': this.content.split(',').join(' '),
        'name': this.name,
        'report': this.report,
        'buildingGroupName': ''
      })
      delete data.areaText
      delete data.lineText
      delete data.moreText
      delete data.orderText
      addIntention(data).then((res) => {
        // picPath 购房资格全解 结果页显示
        if (res && res.content) {
          this.toast('添加成功')
          history.back()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.th_add_intention{
 height: 100%;
 .th_add_intention-cont{
   .th_add_intention-text-Box{
     height: 8rem;
     overflow: auto;
     .th_add_intention-text{
       width: 100%;
       display: flex;
       flex-wrap:wrap;
       color: @cTheme;
       font-size: @smallFontSize;
       line-height: 1rem;
       text-align: center;
       padding: @plrPage/2;
       box-sizing: border-box;
       li{
         height: 1rem;
         width:calc((100% - @plrPage*5)/5);
         border: 1px solid rgba(51,71,209,.7);
         border-radius: @borderRadius;
         .lineClamp(1);
        //  display: block;
        //  flex:1;
         margin: @plrPage/2;
         padding: 0 @plrPage;
         box-sizing: border-box;
       }
     }
   }
   .th_add_intention-report{
     text-align: right;
     font-size: @FontSize13;
     line-height: 2rem;
     padding:0 .5rem 0 @plrPage;
     border-top:1px solid @cD8D8D8;
     border-bottom:1px solid @cD8D8D8;
     span{
       color: @cTheme;
      font-weight: bolder;
       float: left;
     }
     input[type='radio'] {
        display: none;
        -webkit-appearance: none;
        &:checked + label{
          &::before{
            background-color: @cD14E33;
            border-color: @cD14E33;
          }
          &::after{
            transform: rotate(45deg) scale(1);
          }
        }
      }
    label{
      position: relative;
      color: @c9;
      margin-right: .3rem;
      &::before{
        content: '';
        display: inline-block;
        border-radius: 100%;
        border: 1px solid #ccc;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        position: relative;
        top: -2px;
        margin-right: @plrPage;
      }
      &:after{
        border: 2px solid @cf;
        border-left: 0;
        border-top: 0;
        content: " ";
        top: 2px;
        left: 8px;
        position: absolute;
        width: 4px;
        height: 8px;
        transform: rotate(45deg) scale(0);
        transition: transform .2s, -webkit-transform .2s;
      }
    }
   }
   .th_add_intention-name{
      width: 100%;
      display: block;
      padding: 0;
      font-size: .7rem;
      line-height: 1rem;
      word-break: break-all;
      padding: @plrPage;
      box-sizing: border-box;
      color:@c3;
   }
   .th_add_intention-name-length{
     text-align: right;
     font-size: @smallFontSize;
     color: @c9;
   }
   .th_add_intention-select{
     border-top:1px solid @cD8D8D8;
     position: relative;
     height: calc(100% - 13rem);
     .th_filider_select{
       position: static;
       /deep/ .mint-tab-container{
        width: 100%;
        height: calc(100% - 2rem);
        position: absolute;

      }
     }

   }
 }
 .th_add_intention-footer{
   width: 100%;
    height: @footerHeight;
    line-height: @footerHeight;
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    text-align: center;
    color: @cTheme;
    font-size: @FontSize15;
    font-weight: bolder;
    border-top:1px solid @cD8D8D8;
  }
}
</style>
