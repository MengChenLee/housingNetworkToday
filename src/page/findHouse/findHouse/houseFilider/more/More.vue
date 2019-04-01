<template>
  <div class="th_more">
    <div class="th_more-box" v-if="selectList && selectList.list">
        <th-more-type v-for="(item, i) in selectList.list" :key="i" :selectList="item"></th-more-type>
    </div>
    <div class="btn">
      <ul>
        <li>
          <div @click="clean">清空</div>
        </li>
        <li>
          <div @click="submit">确定</div>
        </li>
      </ul>
    </div>
    </div>
</template>

<script>
import ThMoreType from './moreType/MoreType.vue'
export default {
  props: {
    select: {
      type: Object
    },
    selectList: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  watch: {
    selectList: {
      handler (val) {
        // console.log('selectList', val)
        // this.setSelectList()
      },
      deep: true
    }
  },
  components: {
    ThMoreType
  },
  computed: {

  },
  mounted () {
    // console.log(this.more)
  },
  created () {
  },
  methods: {
    clean () {
      this.submit(false)
    },
    submit (flag = true) {
      let arr = []
      this.selectList.list.forEach(element => {
        if (element.select && flag) {
          element.select.length && arr.push(element.select.join(','))
        } else if (element.select && !flag) {
          element.select = false
        }
      })
      this.$set(this.select, 'moreIds', arr.length ? arr.join(',') : '')
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.th_more{
  height: 19.5rem;
    background-color: @cf;
    box-sizing: border-box;
    padding-bottom: 3rem;
    position: relative;
    .th_more-box{
      height: 100%;
      padding: 0 @plrPage;
      overflow: auto;
      .th_more-moudel{
        position: relative;
        padding-bottom: @plrPage/2;
        .th_more-list{
          overflow: hidden;
          .th_more-item{
            min-width: 3.625rem;
            text-align: center;
            float: left;
            border-radius: @borderRadius;
            font-size:@smallFontSize;
            color: @c9;
            background-color: @cF0F0F0;
            margin:0 .375rem .5rem;
          }
        }
        &:after{
          content: " ";
          width: calc(100% + @plrPage);
          border-bottom: 1px solid @cD8D8D8;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
    .btn{
      height: 3rem;
      padding: .75rem .75rem;
      box-sizing: border-box;
      text-align: center;
      ul{
        overflow: hidden;
        li{
          width: 50%;
          float: left;
          padding: 0 .5rem;
          box-sizing: border-box;
          div{
            border: 1px solid @cD8D8D8;
            border-radius: @borderRadius;
          }
          &:last-child{
            div{
              color: @cf;
              .lineargGradient(180deg)
            }
          }
        }
      }
    }
  }

</style>
