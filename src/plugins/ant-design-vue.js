import Vue from 'vue'
import { Pagination, Button, LocaleProvider, Input, ConfigProvider, Row, Col, message } from 'ant-design-vue'

Vue.component(LocaleProvider.name, LocaleProvider)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(ConfigProvider.name, ConfigProvider)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.prototype.$message = message
