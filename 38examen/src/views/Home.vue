<template>
  <div class="home">
    <v-container>
      <v-card>
          <v-card-title>
            Login
          </v-card-title>

          <v-form v-if="accederRegistrar" >
            <v-text-field type="text" label="Correo electronico" v-model="correo">
            </v-text-field>

            <v-text-field type="password" label="Contraseña" v-model="password">
            </v-text-field>
          </v-form>

          <v-form v-else>
            <v-text-field type="text" label="Nombre" v-model="nombre">
            </v-text-field>

            <v-text-field type="number" label="Edad" v-model="edad">
            </v-text-field>

            <v-text-field type="text" label="Correo electronico" v-model="correo">
            </v-text-field>

            <v-text-field type="password" label="Contraseña" v-model="password">
            </v-text-field>
          </v-form>

          <v-card-actions>
            
            <v-btn text @click="acceder">
              Acceder
            </v-btn>



            <v-btn v-if="accederRegistrar" text @click="registrarse">
              Registrarse
            </v-btn>

            <v-btn v-else color="blue" text @click="crearNuevoUsuario">
              Crear Cuenta
            </v-btn>
          </v-card-actions>
      </v-card>

      <v-snackbar v-model="snackbar">
        {{mensaje}}
        <v-btn text @click="snackbar=false">
          Cerrar
        </v-btn>
      </v-snackbar>

      
      <v-snackbar v-model="accederCrud">
        <router-link to="/crud">
            <v-btn text>
              Haz click aquí para acceder
            </v-btn>
        </router-link>
      </v-snackbar>

  


    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import {db} from '../main'
import {globAcceso} from '../main'
import router from '../router'

export default {
  data(){
    return {
      
      usuarios: [],
      nombre: null,
      edad: 0,
      correo: null,
      password: null,
      usuarioVal: false,
      usuarioRegistrado: false,
      accederRegistrar: true,
      snackbar: false,
      mensaje: '',
      accederCrud: false
    }
  },

  mounted(){
    this.obtenerUsuarios();
  },

  methods:{

    acceder(){
      this.accederRegistrar = true
      if(this.correo !=null || this.password !=null)
      {
        this.obtenerUsuarios();

        this.usuarios.forEach(element => {
          if(this.correo == element.correo && this.password == element.password)
          {
            this.usuarioVal = true
          }
        });

        if(!this.usuarioVal)
        {
          this.mensaje = 'Usuario no encontrado'
          this.snackbar = true
        }
        else
        {
          if(!globAcceso.valor)
          {
            globAcceso.valor = true
          }
          this.$router.push('/crud')
        }
      }
      else
      {
        this.mensaje = 'Llena todos los campos';
        this.snackbar = false;
      }

      this.password = null;
      this.correo= null;
    },

    registrarse(){
      this.accederRegistrar = false
    },


    crearNuevoUsuario(){
      if(this.nombre!=null && this.edad >=18 && this.correo!=null && this.password!=null)
      {
        this.obtenerUsuarios();
        console.log(`${this.usuarios.length}`);

        for(let i=0; i<this.usuarios.length; i++)
        {
          if(this.correo == this.usuarios[i].correo)
          {
            this.usuarioRegistrado = true
          } 
        
        }

        if(this.usuarioRegistrado)
        {
          this.mensaje = 'Este usuario ya esta registrado'
          this.snackbar = true
        }
        else
        {
          this.agregarUsuario();
        }
      }
      else
      {
        this.mensaje = 'Llena todos los campos';
        this.snackbar = true;
      }

    },

    async obtenerUsuarios(){
      try
      {
        const snapshot = await db.collection('usuarios').get();
        const usuarios = [];
        this.usuarios = [];

        snapshot.forEach(doc => {
          let datoUsuario = doc.data();
          datoUsuario.id = doc.id;
          usuarios.push(datoUsuario);
        })

        usuarios.forEach(element => {

          this.usuarios.push({
            nombre: element.nombre,
            correo: element.correo,
            password: element.password,
            edad: element.edad
          })
        });

        

      }
      catch(error)
      {
        console.log(error);
      }
    },

    async agregarUsuario(){

        try
        {
          await db.collection('usuarios').add({
            nombre: this.nombre,
            edad: this.edad,
            password: this.password,
            correo: this.correo
          })

          this.nombre = null;
          this.edad = 18;
          this.password = null;
          this.correo= null;

        }
        catch(error)
        {
          console.log(error)
        }
    }

  }
}
</script>
