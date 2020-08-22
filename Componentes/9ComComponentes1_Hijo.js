Vue.component('hijo', {
 template:
 `
  <div class="py-5 bg-success">
   <h4>Componente Hijo: {{num}}</h4>
  </div>
 `,
 props:['num']

})
