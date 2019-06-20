import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import './styles.scss'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
