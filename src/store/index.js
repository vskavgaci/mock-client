import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import services from '../services/services';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    authStatus: '',
    pageName: '',
    mocks: [],
    mock: {},
    user: {},
    current_requests: []
  },
  getters: {
    token: (state) => state.token,
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.authStatus,
    pageName: (state) => state.pageName,
    mocks: (state) => state.mocks,
    mock: (state) => state.mock,
    user: (state) => state.user,
    current_requests: (state) => state.current_requests
  },
  mutations: {
    ADD_CURRENT_REQUEST(state, request) {
      state.current_requests.push(request);
    },

    REMOVE_CURRENT_REQUEST(state, index) {
      state.current_requests.splice(index, 1);
    },

    SET_TOKEN(state, token) {
      Vue.set(state, 'token', token)
    },

    HANDLE_AUTH_STATUS(state, data) {
      Vue.set(state, 'authStatus', data)
    },

    SET_PAGE_NAME(state, data) {
      Vue.set(state, 'pageName', data)
    },

    SET_MOCKS(state, data) {
      Vue.set(state, 'mocks', data)
    },

    SET_MOCK(state, data) {
      Vue.set(state, 'mock', data)
    },

    DELETE_MOCK(state, id) {
      const index = state.mocks.findIndex(e => e._id === id);
      state.mocks.splice(index, 1)
    },

    SET_USER(state, data) {
      Vue.set(state, 'user', data)
    }
  },
  actions: {
    setCurrentRequest({ commit, getters }, data) {
      if (data.process) {
        commit('ADD_CURRENT_REQUEST', data);
      } else {
        commit('REMOVE_CURRENT_REQUEST', getters.current_requests.find((request) => request.mutationType === data.mutationType));
      }
    },

    userLogin({commit}, data) {
      commit("HANDLE_AUTH_STATUS", 'loading')
      return services.userLogin(data)
      .then(data => {
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = data.token;
        commit("SET_TOKEN", data.token)
        commit("HANDLE_AUTH_STATUS", 'success')
      })
      .catch(err => {
        commit("HANDLE_AUTH_STATUS", 'error')
        return Promise.reject(err)
      })
    },

    userLogout({commit}) {
      return new Promise((resolve, reject) => {
        commit("SET_TOKEN", "")
        commit("HANDLE_AUTH_STATUS", '')
        localStorage.removeItem('token')
        // remove the axios default header
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },

    userCreate({commit}, data) {
      return services.userCreate(data)
      .then(data => {
        return { status: true }
      })
      .catch(err => {
        return Promise.reject(err)
      })
    },

    mockCreate({commit}, data) {
      return services.mockCreate(data)
      .then(data => {
        return data
      })
      .catch(err => {
        return Promise.reject(err)
      })
    },

    mockList({commit}) {
      return services.mockList()
      .then(data => {
        commit("SET_MOCKS", data)
        return data;
      })
      .catch(err => {
        return Promise.reject(err)
      })
    },

    mockDetail({commit}, id) {
      return services.mockDetail(id)
      .then(data => {
        commit("SET_MOCK", data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    },

    mockEdit({commit}, id) {
      return services.mockEdit(id)
      .then(data => {
        commit("SET_MOCK", data.data)
        return data;
      })
      .catch(err => {
        return Promise.reject(err)
      })
    },

    mockDelete({commit}, id) {
      return services.mockDelete(id)
      .then(data => {
        commit("DELETE_MOCK", id)
        return data;
      })
      .catch(err => {
        return Promise.reject(err)
      })
    },

    userDetail({commit}) {
      return services.userDetail()
      .then(data => {
        commit("SET_USER", data)
        return data;
      })
      .catch(err => {
        return Promise.reject(err)
      })
    },

    userUpdate({commit}, data) {
      return services.userUpdate(data)
      .then(data => {
        commit("SET_USER", data.data)
        return data;
      })
      .catch(err => {
        return Promise.reject(err)
      })
    }
  },
  modules: {
  },
});
