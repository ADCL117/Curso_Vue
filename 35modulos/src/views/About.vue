<template>
  <div class="about">

    <h1>
      This is an about page
    </h1>

    <h2 v-for="(item, index) in listaTareas" :key="index">
      {{item}}
    </h2>

    <h3>
      {{contador}}
    </h3>

    <v-btn color="blue" @click="aumentarContador(1)">
      +
    </v-btn>

    <h3>
      {{title}}
    </h3>

  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  computed:{
    ...mapState('modTareas', ['listaTareas']),
    ...mapState(['title']),
    ...mapState('modContador', ['contador'])
  },
  methods: {
    ...mapMutations('modContador', ['aumentarContador'])
  } 
}
</script>
