import ThCell from './cell'
import ThImgTextlevel from './imgTextlevel'
import ThImgBox from './imgBox'
import ThLayout from './layout'

export default {
  install (Vue, options) {
    [
      ThImgBox,
      ThImgTextlevel,
      ThLayout,
      ThCell
    ].forEach(item => {
      Vue.use(item, options)
    })
  }
}
