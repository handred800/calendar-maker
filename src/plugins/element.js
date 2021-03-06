import Vue from 'vue'
import {
  Upload,
  Button,
  DatePicker,
  Input,
  InputNumber,
  ColorPicker,
  Link,
  Collapse,
  CollapseItem,
  Form,
  FormItem,
  Switch,
  Select,
  Option,
  OptionGroup,
  RadioGroup,
  RadioButton,
  Tooltip,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Scrollbar,
  Icon,
  Loading,
  Notification
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/zh-TW'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Button)
Vue.use(Upload)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(ColorPicker)
Vue.use(Link)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Tooltip)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Scrollbar)
Vue.use(Icon)
Vue.use(Loading)
Vue.prototype.$notify = Notification
