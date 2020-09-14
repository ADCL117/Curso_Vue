<template>
  <v-app>

    <BarNav></BarNav>

    <v-main>
      <router-view>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import BarNav from './components/BarNav.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),

  components: {
    BarNav
  }

};
</script>
