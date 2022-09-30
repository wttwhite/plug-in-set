import PageBoxList from '../../packages/pageListBox/lib/index.esm.js'
import Pagination from '../../packages/pagination/lib/index.esm.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default ({ Vue }) => {
  Vue.use(PageBoxList)
  Vue.use(Pagination)
  Vue.use(ElementUI, {
    size: 'small',
  })
}