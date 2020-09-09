<template>
  <div class="home">

    <v-layout>
      <v-flex xs12>

        <v-card>
          <v-date-picker v-model="fecha" full-width locale="es-mx" :min="mini" :max="maxi" @change="getDolar(fecha)"></v-date-picker>
        </v-card>

        <v-card color="error" dark>
          <v-card-text class="display-1 text-sm-center">
            {{valor}}
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>


  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import {mapMutations} from "vuex";

export default {
  data(){
    return{
      fecha: new Date().toISOString().substr(0,10),
      mini: '1984',
      maxi: new Date().toISOString().substr(0,10),
      valor: null
    }
  },
  methods:{

    ...mapMutations(['mostrarLoading','ocultarLoading']),

    async getDolar(day){
      let ddmmyy = day.split('-').reverse().join('-');
      try{
        this.mostrarLoading({title: 'Por favor espere', color:'secondary'})
        let datos = await axios.get(`https://mindicador.cl/api/dolar/${ddmmyy}`)
        if(datos.data.serie.length > 0){
          this.valor = await datos.data.serie[0].valor
        } else{
          this.valor = 'Sin resultados'
        }
        
      } catch (error){
        console.log(error);
      }
      finally{
        this.ocultarLoading()
      }

    }
  },
  created(){
    this.getDolar(this.fecha)
  }

}
</script>
