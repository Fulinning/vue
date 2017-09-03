// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import VueI18n from 'vue-i18n'
import i18n from './i18n'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueI18n)

const locales = i18n
Vue.config.lang = 'zh';

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
