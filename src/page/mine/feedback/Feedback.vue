<template>
  <div class="th_feedback">
    <th-layout>
      <div class="th_feedback-cont" ref="cont">
        <mt-radio
          class="th_feedback-radio"
          title="请选择反馈类型"
          v-model="submitData.type"
          :options="radioList">
        </mt-radio>
        <div class="th_feedback-cont-box" @click="textareaFocus($event)">
          <textarea class="th_textarea" id="th_feedback-cont" v-model="submitData.content" placeholder="请输入反馈内容"></textarea>
        </div>
        <p class="th_feedback-customer-service">客服电话<a href="tel:400-0000-0000">400-0000-0000</a></p>
      </div>
    </th-layout>
    <div class="th_feedback-footer">
      <div class="submit" @click="submit">
        <span>确认</span>
      </div>
    </div>
  </div>
</template>
<script>
import {setBaseInfoList, addFeedback} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      val: '',
      radioList: [],
      submitData: {
        'type': '',
        'content': ''
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      let data = {
        'code': 'feedback'
      }
      setBaseInfoList(data).then((res) => {
        if (res && res.code === 1) {
          res.content.forEach(item => {
            this.radioList.push({label: item.name, value: item.id + ''})
          })
        } else {
          this.toast(res.msg || '获取反馈类型失败')
        }
      })
    },
    textareaFocus (e) {
      e.stopPropagation() || e.preventDefault()
      this.$el.querySelector('#th_feedback-cont').focus()
    },
    submit () {
      let data = {
        accountId: this.userInfo.id,
        content: this.submitData.content,
        typeId: Number(this.submitData.type)
      }
      if (data.content === '') {
        this.toast('请输入反馈内容')
      } else if (this.submitData.type === '') {
        this.toast('请选择反馈类型')
      } else {
        addFeedback(data).then((res) => {
          if (res && res.code === 1) {
            this.submitData.type = ''
            this.submitData.content = ''
            this.toast('反馈提交成功')
            this.$router.push({
              path: '/setting'
            })
          } else {
            this.toast(res.msg || '反馈失败')
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.th_feedback{
  height: 100%;
  .th_feedback-cont{
    height: 100%;
    .th_feedback-radio{
      overflow: hidden;
      & /deep/ .mint-radiolist-title{
        color: @c3;
        font-size: @defaultFontSize;
      }
      & /deep/ .mint-cell{
        width: 50%;
        float: left;
        background-size: 0 0;
        background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
        .mint-cell-wrapper{
          background-size: 0 0;
          background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%) !important;
        }
        .mint-radio-core::after {
          border: 2px solid transparent;
          border-left: 0;
          border-top: 0;
          content: " ";
          top: 3px;
          left: 6px;
          position: absolute;
          width: 4px;
          height: 8px;
          transform: rotate(45deg) scale(0);
          transition: transform .2s;
          border-radius: 0;
        }
        .mint-radio-input:checked + .mint-radio-core{
          background-color: #D14E33;
          border-color: #D14E33;
          &::after{
            background-color: #D14E33;
            border-color: #fff;
            transform: rotate(45deg) scale(1);
          }
        }
      }
    }
    .th_feedback-cont-box{
      padding: .6rem;
      .th_textarea{
        width: 100%;
        height: 4rem;
        display: block;
        font-size: .7rem;
        line-height: 1rem;
        word-break: break-all;
        box-sizing: border-box;
        padding: @plrPage;
        color:@c3;
        box-shadow:0px -1px 0px 0px rgba(0,0,0,0.2);
        border-radius:@borderRadius;
        border:1px solid @cD8D8D8;
        -webkit-appearance: none;
      }
    }
    /deep/ .mint-cell{
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position: bottom;
      background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
      &.th_feedback-cell{
        min-height: 1.8rem;
        .mint-cell-title{
          min-width: 4rem;
          color: @c3;
          flex: 0;
          .mint-cell-text{
            margin-left: .2rem;
          }
        }
        .mint-cell-wrapper{
          background-size: 150% 1px;
          background-position: left -10px top;
        }
        .mint-cell-mask{
          display: none;
        }
        .mint-cell-value{
          min-height: inherit;
          margin: 1px auto;
          flex: 1;
          font-size: @smallFontSize;
          input{
            width: 100%;
            min-height: inherit;
            display: inline-block;
            outline: none;
            border:0;
          }
          .code{
            width: 100%;
            display: flex;
            input{
              flex: 1;
              min-height: inherit;
              display: inline-block;
              outline: none;
              border:0;
            }
            span{
              line-height: 1.8rem;
              font-size: @FontSize13;
              color: @cTheme;
            }
          }
        }
      }
    }
    .th_feedback-customer-service{
      width: 100%;
      padding-bottom: .5rem;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 20;
      color: @c9;
      font-size: @smallFontSize;
      text-align: center;
      a{
        color: @cTheme;
        margin-left: .5rem;
        cursor: default;
      }
    }
  }
  .th_feedback-footer{
    width: 100%;
    height: 55px;
    line-height: 55px;
    color: @cTheme;
    border-top:1px solid @cD8D8D8;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    /*top: ;*/
    z-index: 10;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .submit{
      width: 3.75rem;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      font-size:@FontSize13;
      background-color: @cTheme;
      border-radius: @borderRadius;
      color: @cf;
      font-weight: bold;
      margin-right: .6rem;
    }
  }
}
</style>
