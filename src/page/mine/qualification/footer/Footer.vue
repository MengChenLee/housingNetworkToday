<template>
    <div class="footer" @click="click">
      <span>{{footerText}}</span>
    </div>
</template>

<script>
export default {
  props: {
    footerText: {
      type: String
    }
  },
  data () {
    return {
      options: [
        {
          label: '优惠通知我',
          value: 'discount'
        },
        {
          label: '开盘通知我',
          value: 'sale'
        },
        {
          label: '订阅动态',
          value: 'news'
        }
      ],
      popupVisible: false,
      value: []
    }
  },
  components: {
  },
  computed: {

  },
  mounted () {

  },
  created () {
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.footer{
    width: 100%;
    height: @headerHeight;
    line-height: @headerHeight;
    .lineargGradient();
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    text-align: center;
    color: @cf;
    font-size: @FontSize15;
    font-weight: bolder;
}
</style>
