import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { locale as en } from '@/lang/i18n/en.js'
import { locale as ch } from '@/lang/i18n/ch.js'
Vue.use(VueI18n)
let messages = {}
messages = { ...messages, en, ch }
const lang = localStorage.getItem('language') || 'ch'
const i18n = new VueI18n({
  locale: lang,
  messages
})
export default i18n
