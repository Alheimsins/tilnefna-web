import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#E73445',
    secondary: '#F8AF5D',
    accent: '#6ac4ae',
    error: '#E73445',
    info: '#00b1c7',
    success: '#7FC6B1',
    warning: '#FFC107'
  }
})
