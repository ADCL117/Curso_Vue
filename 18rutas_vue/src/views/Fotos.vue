<template>
    <div>
        <h1>Galería de Fotos</h1>
        <Foto></Foto>
    </div>
</template>

<script>
import Foto from "@/components/Foto.vue"
export default {
    name: 'Fotos',
    components:{
        Foto
    }
}
</script>