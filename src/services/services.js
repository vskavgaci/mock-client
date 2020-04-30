import axios from "axios/index";
import store from '../store/index.js';

export default {
  userLogin(data) {
    store.dispatch('setCurrentRequest', {
      'mutation_type': 'userLogin',
      'process': true
    })
    return axios.post('/users/login', data)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response.data))
    .finally(() => {
      store.dispatch('setCurrentRequest', {
        'mutation_type': 'userLogin',
        'process': false
      })
    });
  },

  userCreate(data) {
    store.dispatch('setCurrentRequest', {
      'mutation_type': 'userCreate',
      'process': true
    })
    return axios.post('/users/create', data)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response.data))
    .finally(() => {
      store.dispatch('setCurrentRequest', {
        'mutation_type': 'userCreate',
        'process': false
      })
    });
  },

  userDetail() {
    store.dispatch('setCurrentRequest', {
      'mutation_type': 'userDetail',
      'process': true
    })
    return axios.get('/users/profile')
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response.data))
    .finally(() => {
      store.dispatch('setCurrentRequest', {
        'mutation_type': 'userDetail',
        'process': false
      })
    });
  },

  userUpdate(data) {
    store.dispatch('setCurrentRequest', {
      'mutation_type': 'userUpdate',
      'process': true
    })
    return axios.put('/users/profile', data)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response.data))
    .finally(() => {
      store.dispatch('setCurrentRequest', {
        'mutation_type': 'userUpdate',
        'process': false
      })
    });
  },

  mockCreate(data) {
    store.dispatch('setCurrentRequest', {
      'mutation_type': 'mockCreate',
      'process': true
    })
    return axios.post('/mocks/create', data)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response.data))
    .finally(() => {
      store.dispatch('setCurrentRequest', {
        'mutation_type': 'mockCreate',
        'process': false
      })
    });
  },

  mockList() {
    store.dispatch('setCurrentRequest', {
      'mutation_type': 'mockList',
      'process': true
    })
    return axios.get('/mocks')
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response.data))
    .finally(() => {
      store.dispatch('setCurrentRequest', {
        'mutation_type': 'mockList',
        'process': false
      })
    });
  },

  mockDetail(id) {
    store.dispatch('setCurrentRequest', {
      'mutation_type': 'mockDetail',
      'process': true
    })
    return axios.get('/mocks/'+ id)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response.data))
    .finally(() => {
      store.dispatch('setCurrentRequest', {
        'mutation_type': 'mockDetail',
        'process': false
      })
    });
  },

  mockEdit(data) {
    store.dispatch('setCurrentRequest', {
      'mutation_type': 'mockCreate',
      'process': true
    })
    return axios.put('/mocks/'+ data.id, data)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response.data))
    .finally(() => {
      store.dispatch('setCurrentRequest', {
        'mutation_type': 'mockCreate',
        'process': false
      })
    });
  },

  mockDelete(id) {
    store.dispatch('setCurrentRequest', {
      'mutation_type': 'mockDelete',
      'process': true
    })
    return axios.delete('/mocks/'+ id)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response.data))
    .finally(() => {
      store.dispatch('setCurrentRequest', {
        'mutation_type': 'mockDelete',
        'process': false
      })
    });
  },
};
