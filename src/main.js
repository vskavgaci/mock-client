import Vue from 'vue';
import VueAxios from 'vue-axios';
import VModal from 'vue-js-modal';
import vSelect from 'vue-select';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import tr from 'vee-validate/dist/locale/tr.json';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import MButton from '@/components/partials/MButton';
import 'vue-select/dist/vue-select.css';
import '@/assets/css/style.scss';
const moment = require('moment')
import helper from './helpers/helpers.js';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import Notifications from 'vue-notification'

// Vue Validate Extends Register as Globally
for (const rule in rules) {
  extend(rule, rules[rule]);
}

extend('upCase', (value) => {
  if (value.match(/[A-Z]/g) !== null) {
    return true;
  }

  return '{_field_} field must contain at least 1 upper case.';
});

extend('lowCase', (value) => {
  if (value.match(/[a-z]/g) !== null) {
    return true;
  }

  return '{_field_} field must contain at least 1 lower case.';
});

extend('digit', (value) => {
  if (value.match(/[0-9]/g) !== null) {
    return true;
  }

  return '{_field_} field must contain at least 1 digit.';
});

extend('min', {
  validate(value, { length }) {
    return value.length >= length;
  },
  params: ['length'],
  message: '{_field_} field must have at least {length} characters'
});

extend('required', (value) => {
  if (value && value.length > 0) {
    return true;
  }

  return '{_field_} field is required.';
});

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('MButton', MButton)
Vue.component('v-select', vSelect)
Vue.use(VueAxios, axios)
Vue.use(VModal, { dialog: true })
Vue.use(require('vue-moment'), {
  moment
});
Vue.use(Notifications)
Vue.moment().locale("tr")
Vue.component('Loading', Loading)

helper.isTokenExpired();

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.config.ignoredElements = [/^ion-/];
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
