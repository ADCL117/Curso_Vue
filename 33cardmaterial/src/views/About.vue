<template>
  <div class="about">

    <h1>
      This is an about page
    </h1>

    <router-link :to="{query: {page: 1}}">
      <v-btn block color="blue" class="mb-3">
        1
      </v-btn>
    </router-link>

    <router-link :to="{query: {page: 2}}">
      <v-btn block color="blue" class="mb-3">
        2
      </v-btn>
    </router-link>

  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },

  watch: {
    "$route.query.page":{
      immediate: true,
      handler(newPage){
        console.log(`La sección a cambiado: ${newPage}`);
      }
    }
  }
}
</script>
