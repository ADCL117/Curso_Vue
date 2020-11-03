<template>
    <v-container>
        <v-card>
            <v-card-title>
                Usuarios
            </v-card-title>


            <v-form v-if="mod">
                <v-text-field type="text" label="Nombre" v-model="nombre">
                </v-text-field>

                <v-text-field type="number" label="Edad" v-model="edad">
                </v-text-field>

                <v-text-field type="password" label="Contraseña" v-model="password">
                </v-text-field>

                <v-btn text color="blue" @click="guardar">
                    Guardar Cambios
                </v-btn>

                <v-btn text color="blue" @click="noModificar">
                    Cancelar
                </v-btn>
            </v-form>


            <v-form v-if="accederRegistrar">
                <v-text-field type="text" label="Nombre" v-model="nombre">
                </v-text-field>

                <v-text-field type="number" label="Edad" v-model="edad">
                </v-text-field>

                <v-text-field type="text" label="Correo electronico" v-model="correo">
                </v-text-field>

                <v-text-field type="password" label="Contraseña" v-model="password">
                </v-text-field>

                <v-btn text color="blue" @click="crearNuevoUsuario">
                    Agregar
                </v-btn>

                <v-btn text color="blue" @click="noAgregar">
                    Cancelar
                </v-btn>
            </v-form>

            <v-simple-table v-else>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Nombre
                            </th>

                            <th class="text-left">
                                Correo
                            </th>

                            <th class="text-left">
                                Edad
                            </th>

                            <th class="text-left">
                                Contraseña
                            </th>

                            <th class="text-left">
                                Modificar
                            </th>

                            <th class="text-left">
                                Eliminar
                            </th>
                        </tr>

                    </thead>

                    <tbody>
                        <tr v-for="(item, index) in usuarios" :key="index">
                        <td>
                            {{item.nombre}} 
                        </td>

                        <td>
                             {{item.correo}} 
                        </td>

                        <td> 
                             {{item.edad}}
                        </td>

                        <td>
                         {{item.password}}
                        </td>

                        <td>
                            <v-icon color="blue" @click="modificar(item)">
                                mdi-pencil
                            </v-icon>
                        </td>

                        <td>
                            <v-icon color="red" @click="eliminar(item.id)">
                                mdi-delete
                            </v-icon>
                        </td>

                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
       
            <v-card-actions>
                <v-btn color="blue" @click="agregar">
                    Agregar
                </v-btn>

                <v-btn color="blue" @click="cerrarSes">
                    Cerrar Sesión
                </v-btn>
            </v-card-actions>


        </v-card>



        <v-snackbar v-model="snackbarEliminar">
            {{mensaje}}
            <v-btn text @click="eliminarElemento()">
              Eliminar
            </v-btn>

            <v-btn text @click="snackbar=false">
              Cancelar
            </v-btn>
        </v-snackbar>

        <v-snackbar v-model="snackbar">
            {{mensaje}}

            <v-btn text @click="snackbar=false">
              Cancelar
            </v-btn>
        </v-snackbar>

    </v-container>
</template>

<script>
// @ is an alias to /src
import {db} from '../main'
import {globAcceso} from '../main';

export default {
    data(){
        return {
            usuarios: [],
            mod: false,
            nombre: null,
            edad: 18,
            password: null,
            correo: null,
            mensaje: '',
            snackbar: false,
            snackbarEliminar: false,
            idUsuario: null,
            accederRegistrar: false,
        }
    },

    mounted(){
        this.obtenerUsuarios()
    },

    methods:{
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
                        id: element.id,
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


        validarNum(num)
        {
            var nume = /^[0-9]+$/;
            let res = false
            if(nume.test(num) == true)
            {
                res = true
            }
            return res;
        },

        modificar(usuario){
            this.mod=true
            this.idUsuario = usuario.id
            this.nombre= usuario.nombre;
            this.password= usuario.password;
            this.edad= usuario.edad;
            
        },

        eliminar(idUsuario){
            this.mensaje = '¿Estas seguro de querer eliminar esta cuenta?'
            this.snackbarEliminar = true
            this.idUsuario = idUsuario
        },


        async eliminarElemento(){
            
            try
            {
                await db.collection('usuarios').doc(this.idUsuario).delete();
                this.obtenerUsuarios();
            }
            catch(error)
            {
                console.log(error)
            }
            
        },

        async guardar(){
            try
            {
                if(this.validarNum(this.edad))
                {
                    await db.collection('usuarios').doc(this.idUsuario).update({
                        nombre: this.nombre,
                        password: this.password,
                        edad: this.edad,
                    })
                    this.mod = false;
                    this.obtenerUsuarios();
                }

            }
            catch(error)
            {
                console.log(error);
            }
        },

        noModificar(){
            this.mod = false
        },


        noAgregar(){
            this.accederRegistrar = false
        },

        agregar(){
            this.accederRegistrar = true;
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
                    this.accederRegistrar = false
                }
            }
            else
            {
                this.mensaje = 'Llena todos los campos';
                this.snackbar = true;
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
        },

        cerrarSes(){
          globAcceso.valor = false
          this.$router.push('/')
        }

    }
}
</script>