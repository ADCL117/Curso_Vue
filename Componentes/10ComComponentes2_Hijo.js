Vue.component('hijo',{
 template:
 `
  <div class="py-5 bg-success">
   <h4>Componente hijo: {{num}}</h4>
   <h4>Nombre: {{nombre}}</h4>
  </div>
 `,
 props: ['num'],
 data(){
  return{
   nombre: 'David'
  }
 },
 mounted(){
  this.$emit('nombreHijo', this.nombre);
 }
})
