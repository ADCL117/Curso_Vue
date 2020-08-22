Vue.component('padre', {
 template:
 `
  <div class="p-5 bg-dark text-white">
   <h2>Componente Padre: {{numPadre}}</h2>
   <button class="btn btn-danger" @click="numPadre++">+</button>
   <hijo :num="numPadre"></hijo>
  </div>
 `,
 data(){
  return {
   numPadre: 0
  }
 }
})
