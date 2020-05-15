import Vue from 'vue'
import { Button,Icon,Carousel,CarouselItem,Input,Message,Table,TableColumn,Checkbox,MessageBox ,Card,Pagination,Col  } from 'element-ui'
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
Vue.prototype.$alert=MessageBox.alert
Vue.use(Button)
Vue.use(Icon)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Checkbox)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Col)

