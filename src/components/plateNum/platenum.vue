<template>
  <div class="platenum" id="insert_Plate">
    <div class="maskbg"  @click="hidePlate" :style="{display:this.showPlate !== 3? 'block':'none'}" :class="{transparent:!this.myShowmask}"></div>
    <div :style="{display:this.showPlate===1?'block':'none'}" class="cityPlate">
      <!-- <div class="title">
        <div @click="hidePlate" class="confirmBtn">确定</div>
      </div> -->
      <div class="cancle-btn">
        <span class="text" @click="hidePlate">取消</span>
      </div>
      <div class="platenumCont">
        <div v-for="(citys, index) in this.cityList" :key="index" class="lineList">
          <div v-for="(item, idx) in citys" :key="idx" @touchend="cityremove(item)" @touchstart="citychooseHandler(item)" :class="{'item': true, 'selected already': item === citySelected}">
            {{item}}
            <i v-show="item !== ''" class="itemPop">{{item}}</i>
          </div>
        </div>
      </div>
    </div>

    <div :style="{display:this.showPlate===2?'block':'none'}" class="cityPlate EnglishPlate">
      <div class="title">
        <div @click="hidePlate" class="cancleBtn">取消</div>
        <div @click="hidePlate" class="confirmBtn">确定</div>
      </div>
      <div class="platenumCont">
        <div v-for="(english, index) in this.EnglishList" :key="index" class="lineList">
          <div v-for="(item, idx) in english" :key="idx" @touchend.stop="cityremove" @touchstart.stop="citychooseHandler(item)" :class="{'item': true, 'delete': item === 'delete' ? true :false, 'selected already': item === citySelected}">
            {{item === 'delete' ? '' : item}}
            <i v-show="item !== 'delete'" class="itemPop">{{item}}</i>
            <img v-if="item === 'delete'" src="../imgs/delete_copy.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPlate: this.showP,
      cityList: [
        ['京', '沪', '浙', '苏', '粤', '鲁', '晋', '冀', '豫'],
        ['川', '渝', '辽', '吉', '黑', '皖', '鄂', '湘', '赣'],
        ['闽', '陕', '甘', '宁', '蒙', '津', '贵', '云', '桂'],
        ['琼', '青', '新', '藏', '港', '澳', '', '', '']
      ],
      EnglishList: [
        ['港', '澳', '学', '警', '领'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'P'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'L', 'delete']
      ],
      citySelected: ' ',
      myShowmask: this.showmask,
      cityVal: this.cityV,
      carVal: this.carV
    }
  },
  props: {
    showmask: {
      type: Boolean
    },
    showP: {
      type: Number,
      default: 3
    },
    returnHandler: {
      type: Function
    },
    cityV: {
      type: String
    },
    carV: {
      type: String
    }
  },
  mounted () {
    // window.test = this
  },
  watch: {
    showPlate: function (val) {
      // if (val === 1) {
      //   $(this.$el).find('.cityPlate').eq(0).show()
      //   $(this.$el).find('.EnglishPlate').hide()
      // } else if (val === 2) {
      //   $(this.$el).find('.cityPlate').eq(0).hide()
      //   $(this.$el).find('.EnglishPlate').show()
      // }
    }
  },
  methods: {
    hidePlate (e) {
      this.showPlate = 3
    },
    citychooseHandler (item) {
      if ($(event.currentTarget).hasClass('delete')) {
        this.ondelete()
      }
      if (item === '' || item === 'delete') return
      this.citySelected = item
      this.onchange(item)
    },
    cityremove (item) {
      if (item === '') return
      if (this.showPlate === 1) {
        this.showPlate = 3
      }
      this.citySelected = ' '
    },
    onchange: function (val) {
      // debugger
      if (this.showPlate === 1) {
        this.cityVal = val
      } else if (this.showPlate === 2) {
        if (this.carVal === '请填写车牌号') {
          this.carVal = val
        } else if (this.carVal.length < 7) {
          this.carVal = this.carVal + val
        }
      }
      this.returnHandler(this.cityVal, this.carVal)
    },
    ondelete: function () {
      if (this.showPlate === 2) {
        if (this.carVal === '请填写车牌号') return
        if (this.carVal.length <= 1) {
          this.carVal = '请填写车牌号'
          this.returnHandler(this.cityVal, this.carVal)
          return
        }
        this.carVal = this.carVal.substring(0, this.carVal.length - 1)
        this.returnHandler(this.cityVal, this.carVal)
      }
    }
  }
}
</script>

  <style scoped lang="less">
  .platenum{
    .maskbg{
      position: fixed;
      width: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      background: rgba(0,0,0,0.5);
      z-index: 999;
      &.transparent{
        background: rgba(0,0,0,0);
      }
    }
    .cityPlate{
      position: fixed;
      z-index: 1001;
      width: 100%;
      left: 0;
      bottom: 0;
      .title{
        height: 2.5rem;
        // line-height: 2.5rem;
        // padding: 0 0 0 0.75rem;
        // display: flex;
        // justify-content: flex-end;
        // align-items: center;
        background: #F8F8F8;
        // font-size: 0.8rem;
        .cancleBtn{
          color: #999;
          padding: 0 .75rem;
          line-height: 2.5rem;
          font-size: 0.8rem;
          text-align: center;
          float: left;
          letter-spacing: 1px;
        }
        .confirmBtn{
          color: #333;
          padding: 0 .75rem;
          line-height: 2.5rem;
          font-size: 0.8rem;
          text-align: center;
          float: right;
          letter-spacing: 1px;
        }
      }
      .cancle-btn{
        height: 60px;
        background: transparent;
        position: relative;
        font-size: .8rem;
        .text{
          background: #EEEEEE;
          color: #999;
          position: absolute;
          right: 0;
          bottom: 0;
          height: 30px;
          line-height: 30px;
          width: 50px;
          text-align: center;
          border-top-left-radius: 5px;
          &:before{
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            bottom: 0;
            right: 49px;
            display: inline-block;
            border-top: 10px solid transparent;
            border-left: 15px solid transparent;
            border-bottom: 29px solid #eee;
          }
        }
      }
      .lineList{
        display: flex;
        background: #fff;
        .item{
          flex:1;
          height: 2.3rem;
          border-top: 0.5px solid #eee;
          border-right: 0.5px solid #eee;
          color:rgba(102, 102, 102, 1);
          font-size: 0.85rem;
          line-height: 2.3rem;
          text-align: center;
          position: relative;
          &.selected{
            color:rgba(245, 123, 51, 1);
            position: relative;
            // border-color: transparent;
            // &::after{
            //   position:absolute;
            //   content:'';
            //   border: 1px solid rgba(245, 123, 51, 1);
            //   left: 0;
            //   top: 0;
            //   right: 0;
            //   bottom: 0;
            // }
          }
          &.already{
            .itemPop{
              display: block;
            }
          }
          &.selected{
            &::after{
              height: 2rem;
            }
          }
          .itemPop{
            display: none;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 3px;
            border: 1px solid rgba(237, 132, 48, 0.8);
            background:#fff;
            text-align: center;
            line-height: 2.5rem;
            color:rgba(245, 123, 51, 1);
            position: absolute;
            top: -3.05rem;
            left: -0.1rem;
            font-style:normal;
            box-shadow: 0px 0px 4px rgba(245, 123, 51, 0.6) inset;
          }
          &:first-child{
            .itemPop{
              left: 0;
            }
          }
          &:last-child{
            .itemPop{
              left: -10%;
            }
          }
          &.gray{
            background: rgba(248, 248, 248, 1);
          }
        }
      }
      &.EnglishPlate{
        // border-bottom:2px solid rgba(217, 217, 217, 1);
        .lineList{
          .item{
            font-size:1rem;
            height: 2rem;
            line-height: 2rem;
            .itemPop{
              left:50%;
              margin-left: -1.25rem;
            }
            &:first-child{
              .itemPop{
                left: 70%;
              }
            }
            &:last-child{
              .itemPop{
                left: 30%;
              }
            }
            &.selected{
              &::after{
                height: 2rem;
              }
            }
            &.delete{
              display: flex;
              justify-content: center;
              align-items: center;
              img{
                width: 1.35rem;
                height: 0.875rem;
              }
            }
          }
        }
        .lineList:nth-child(2){
          .item{
            font-size: 1rem;
            // border-bottom: 2px solid rgba(217, 217, 217, 1);
            box-sizing: content-box;
          }
        }
        .lineList:nth-child(3){
          .item{
            font-size: 1rem;
            border-bottom: 5px solid #eee;
            box-sizing: content-box;
          }
        }
      }
    }
  }
</style>
