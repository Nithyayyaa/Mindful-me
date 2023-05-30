import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = { ...state.user, ...payload };
    },
  },
  actions: {
    login: (context, payload) => {
      context.commit("setUser", payload);
    },
  },
  modules: {},
});
