<template>
    <div>
        <h1>Galería de Fotos</h1>
        <router-link :to="{name: 'fotos', params: {id:item} }" v-for="(item, index) of arregloFotos" :key="index">
            <button>foto {{item}}</button>
        </router-link>

        <Foto></Foto>
        <button @click="irHome">Home</button>
        <button @click="hisAnterior">Anterior</button>
        <button @click="hisSiguiente">Siguiente</button>

    </div>
</template>

<script>
import Foto from "@/components/Foto.vue"
export default {
    name: 'Fotos',
    components:{
        Foto
    }, 
    data(){
        return {
            arregloFotos: [1,2,3]
        }
    },
    methods:{
        irHome(){
            this.$router.push('/')
        },
        hisAnterior(){
            this.$router.go(-1)
        },
        hisSiguiente(){
            this.$router.go(1)
        }
    }
}
</script>