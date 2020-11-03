<template>
    <v-container grid-list-md>
        <v-layout row wrap>

            <v-flex md6>
                <v-card class="mb-3" v-for="(item, index) in listaTareas" :key="index">
                    <v-card-text>

                        <v-chip label color="pink" text-color="white" class="ml-0">
                            <v-icon left>
                                label
                            </v-icon>

                            {{item.title}}
                        </v-chip> 

                        <p>
                            {{item.description}}
                        </p>

                        <v-btn class="mr-3" color="warning" @click="editar(index)">
                            Editar
                        </v-btn>

                        <v-btn color="error" @click="eliminarTarea(item.id)">
                            Eliminar
                        </v-btn>

                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex md6 v-if="formAgregar">
                <v-card class="mb-3 pa-3">

                    <v-form @submit.prevent="agregarTarea">
                        <v-text-field label="Título de la tarea" v-model="title">
                        </v-text-field>

                        <v-textarea label="Descripción de tarea" v-model="description">
                        </v-textarea>

                        <v-btn block color="success" type="submit">
                            Agregar Tarea
                        </v-btn>

                    </v-form>

                </v-card>
            </v-flex>

            <v-flex md6 v-if="!formAgregar">
                <v-card class="mb-3 pa-3">

                    <v-form @submit.prevent="editarTarea">
                        <v-text-field label="Título de la tarea" v-model="title">
                        </v-text-field>

                        <v-textarea label="Descripción de tarea" v-model="description">
                        </v-textarea>

                        <v-btn block color="warning" type="submit">
                            Editar Tarea
                        </v-btn>

                    </v-form>

                </v-card>
            </v-flex>

        </v-layout>

        <v-snackbar v-model="snackbar">
            {{mensaje}}
            <v-btn text color="pink" @click="snackbar=false">
                Cerrar
            </v-btn>
        </v-snackbar> 
        
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            listaTareas: [
                {id: 1, title: 'Título Tarea #1', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'+
                'Odio, expedita? Excepturi consequuntur harum asperiores similique aliquam dicta recusandae ea hic debitis'+
                'aliquid! Asperiores saepe enim tenetur, impedit assumenda recusandae sint?'},

                {id: 2, title: 'Título Tarea #2', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'+
                'Odio, expedita? Excepturi consequuntur harum asperiores similique aliquam dicta recusandae ea hic debitis'+
                'aliquid! Asperiores saepe enim tenetur, impedit assumenda recusandae sint?'}
            ],
            title: '',
            description: '',
            snackbar: false,
            mensaje: '',
            formAgregar: true,
            indexTarea: ''
        }
    },

    methods:{
        agregarTarea(){
            if(this.title === '' || this.description === '')
            {
                this.snackbar = true
                this.mensaje = '¡Llena todos los campos!'
            }
            else
            {
                this.listaTareas.push({
                    id: Date.now(),
                    title: this.title, 
                    description: this.description
                })

                this.title = ''
                this.description = ''
                this.snackbar = true
                this.mensaje = 'Tarea Agregada'
            }
        }, 
        eliminarTarea(id){
            this.listaTareas = this.listaTareas.filter(e => e.id != id)
        },
        editar(index){
            this.formAgregar = false
            this.title = this.listaTareas[index].title
            this.description = this.listaTareas[index].description
            this.indexTarea = index
        },
        editarTarea(){
            this.listaTareas[this.indexTarea].title = this.title
            this.listaTareas[this.indexTarea].description = this.description
            this.formAgregar = true
            this.title = ''
            this.description = ''
            this.snackbar = true
            this.mensaje = 'Tarea Editada'
        }
    }
}
</script>