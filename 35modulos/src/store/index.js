import Vue from 'vue'
import Vuex from 'vuex'
import modTareas from '@/store/tareas'
import modContador from '@/store/contador'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Texto desde index.js'
  },

  mutations: {

  },

  actions: {

  },

  modules: {
    modTareas,
    modContador
  }
})
