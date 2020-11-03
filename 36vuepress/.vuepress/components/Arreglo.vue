<template>
    <div>
        <h3>
            Este es un componente
        </h3>

        <ul>
            <li v-for="(item, index) in lista" :key="index">
                {{item.nombre}} - {{item.description}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            lista: [
                {nombre: 'html', description: 'Este es el curso de html.'},
                {nombre: 'css',  description: 'Este es el curso de css.'},
                {nombre: 'js',   description: 'Este es el curso de java script.'}
            ]
        }
    }
}
</script>