const jwt = require('jsonwebtoken');
import axios from 'axios';
import store from '../store';

const helper = {
  isTokenExpired: function() {
    const token = localStorage.getItem('token');

    if (token) {
      return jwt.verify(token, process.env.VUE_APP_JWT_SECRET, function(err, decoded) {
        if (err) {
          localStorage.removeItem('token')
          return false;
        }else {
          axios.defaults.headers.common['Authorization'] = token;
          return true;
        }
      })
    }else {
      return false;
    }
  },

  ifNotAuthenticated: function(to, from, next) {
    if (!store.getters.isAuthenticated) {
      next()
      return
    }
    next('/management/mock/list')
  },

  ifAuthenticated: function(to, from, next) {
    const isTokenExpired = helper.isTokenExpired();

    if (store.getters.isAuthenticated && isTokenExpired) {
      next()
      return
    }
    next('/user/login')
  }
}

export default helper;
