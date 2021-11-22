




// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import App from './App';
import App from './App.vue'

import router from './router';
import vuetify from './plugins/vuetify';

import 'vuetify/dist/vuetify.min.css';
import 'font-awesome/css/font-awesome.css';

import Vuetify from 'vuetify';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './styles/global.css';

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';
import fullCalendar from 'vue-fullcalendar';
import { setupComponents } from './config/setup-components';

import swatches from 'vue-swatches';
import "vue-swatches/dist/vue-swatches.min.css"

// import api from './module/api'

import i18n from '@/plugins/i18n';
import FlagIcon from 'vue-flag-icon';

Vue.use(FlagIcon);
Vue.use(VueChartkick, { adapter: Chart });
Vue.component('full-calendar', fullCalendar);
Vue.component('swatches', swatches);

setupComponents(Vue);

Vue.use(Vuetify);

Vue.config.productionTip = false

Vue.prototype.$api = axios


import Toasted from 'vue-toasted';

Vue.use(Toasted)

// options to the toast
let options = {
  type: 'error',
  icon: 'error_outline',
  action: {
    text: 'Cancel',
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    }
  }
};

// register the toast with the custom message
Vue.toasted.register('my_app_error',
  (payload) => {

    // if there is no message passed show default message
    if (!payload.message) {
      return "Oops.. Something Went Wrong.."
    }

    // if there is a message show it with the message
    return "Oops.. " + payload.message;
  },
  options
)






// new Vue({
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')
/* eslint-disable no-new */
new Vue({
  vuetify,
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    themeColor: '#1D2939',
    userEmail: 'admin@yopmail.com',
    userPassword: '123456'
  }
})

console.log(localStorage.getItem('token'))
if (!localStorage.getItem('token')) {
  window.location.href = "/admin/#/login"

} else {
  axios.get(`${process.env.VUE_APP_API_ENDPOINT}admin/user`, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  })
  .then(response => {

  })
  .catch(error => {
    console.log(( (error.response.status != 200)));
    if (error.response.status != 200) {
      // window.location.href = 'http://localhost:8080/#/login';
      // window.location.href = `${process.env.VUE_APP_ENDPOINT}#/login`;
      router.push('/login');
      console.log('yarab');
    }
  });
}
