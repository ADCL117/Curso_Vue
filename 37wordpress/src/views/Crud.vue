<template>
    <v-data-table :headers="headers" :items="entradas" sort-by="id" class="">

        <template v-slot:top>
            <v-toolbar flat>

                <v-toolbar-title>
                    CRUD WORDPRESS
                </v-toolbar-title>

                <v-divider class="mx-4" inset vertical>
                </v-divider>

                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            Nueva Entrada
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title>
                            <span class="headline">
                                {{ formTitle }}
                            </span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="editedItem.title" label="Título">
                                        </v-text-field>
                                    </v-col>
   
                                    <v-col cols="12">
                                        <v-text-field type="text" v-model="editedItem.content" label="Contenido">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>

                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="headline">
                            ¿Estas seguro de que quieres borrar este elemento?
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn color="blue darken-1" text @click="closeDelete">
                                Cancelar
                            </v-btn>

                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                                OK
                            </v-btn>

                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" color="blue" @click="editItem(item)">
                mdi-pencil
            </v-icon>

            <v-icon small color="red" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>

    </v-data-table>
</template>

<script>
    export default{

        data: () => ({
            config:
            {
                headers:
                {
                    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3Byb3llY3Rvc1wvMzdXb3JkcHJlc3MiLCJpYXQiOjE2MDM4NDk0MjEsIm5iZiI6MTYwMzg0OTQyMSwiZXhwIjoxNjA0NDU0MjIxLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.HSP_tJMsGdxz9ETmrv9ZRpWVwcvHTWpbdTYF1SvNsVA'
                }
            },

            dialog: false,
            dialogDelete: false,
            headers:
            [
                { text: 'Dessert (100g serving)', align: 'start', sortable: false, value: 'title',},
                { text: 'id', value: 'id' },
                { text: 'content (g)', value: 'content' },
                { text: 'date (g)', value: 'date' },
                { text: 'status (g)', value: 'status' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            entradas: [],
            editedIndex: -1,
            editedItem:
            {
                title: '',
                id: '',
                content: '',
                date: '',
                status: '',
            },

            defaultItem:
            {
                title: '',
                id: '',
                content: '',
                date: '',
                status: '',
            },
        }),

        computed: {
            formTitle(){
                return this.editedIndex === -1 ? 'Nueva Entrada' : 'Editar Entrada'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },

            dialogDelete (val) {
                val || this.closeDelete()
            },
        },

        created () {
            this.initialize()
        },

        methods: {
            limpiar(value){
                return value.replace(/<\/?[^>]+(>|$)/g, "")
            },

            async initialize () {
                try
                {
                    const entradasDB = await this.axios.get('wp/v2/posts');
                    //console.log(entradasDB.data);

                    await entradasDB.data.forEach(element => {
                        console.log(element);
                        let item = {}
                        item.id = element.id;
                        item.title = element.title.rendered;
                        item.content = this.limpiar(element.content.rendered);
                        item.date = element.date;
                        item.status = element.status;
                        this.entradas.push(item)
                    });
                }
                catch(error)
                {
                    console.log(error);
                }
            },

            editItem (item) {
                this.editedIndex = this.entradas.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                this.editedIndex = this.entradas.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            async deleteItemConfirm () {
                try
                {
                    await this.axios.delete(`wp/v2/posts/${this.editedItem.id}`, this.config)
                    this.entradas.splice(this.editedIndex, 1)
                    this.closeDelete()
                }
                catch(error)
                {
                    console.log(error);
                }
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            async save () {
                if (this.editedIndex > -1) 
                {
                    //Editar
                    try
                    {
                        const entradaEditada = await this.axios.post(`wp/v2/posts/${this.editedItem.id}`, this.editedItem, this.config)
                        Object.assign(this.entradas[this.editedIndex], this.editedItem)
                        console.log(this.editedItem);
                    }
                    catch(error)
                    {
                        console.log(error);
                    }
                } 
                else 
                {
                    console.log(this.editedItem);

                    const entrada = {
                        title: this.editedItem.title,
                        content: this.editedItem.content,
                        status: 'publish'
                    }

                    try
                    {
                        const entradaDB = await this.axios.post('wp/v2/posts', entrada, this.config)
                        console.log(entradaDB.data)

                        this.editedItem.id = entradaDB.data.id;
                        this.editedItem.date = entradaDB.data.date;
                        this.editedItem.status = entradaDB.data.status;
                        this.entradas.push(this.editedItem);
                    }
                    catch(error)
                    {
                        console.log(error);
                    }
                }
                this.close()
            },
        },
    }
</script>