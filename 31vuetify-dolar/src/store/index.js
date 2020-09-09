import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:{
      title: '',
      estado: false,
      color: 'secondary'
    }
  },
  mutations: {
    mostrarLoading(state, payload){
      state.loading.title = payload.title
      state.loading.estado = true
      state.loading.color = payload.color
    },

    ocultarLoading(state){
      state.loading.estado = false
    }
  },
  actions: {
  },
  modules: {
  }
})
