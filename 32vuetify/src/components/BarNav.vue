<template>
    <v-container>

            <v-app-bar app class="warning">

                <v-app-bar-nav-icon @click="dibujar = !dibujar"></v-app-bar-nav-icon>
                <v-toolbar-title>Vuetify</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn class="success">ingreso</v-btn>
                <v-btn class="error">salir</v-btn>
            </v-app-bar>

            <v-navigation-drawer app v-model="dibujar" temporary dark>
                <v-layout mt-4 column align-center>
                    <v-flex>
                        <v-avatar>
                            <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="">
                        </v-avatar>
                    </v-flex>

                    <v-flex>
                       <p class="white--text mt-3 headline">Juanito Pérez</p> 
                    </v-flex>
                </v-layout> 

                <v-layout column>
                    <v-flex >
                        <v-btn color="success" block :to="{name: 'Home'}" class="mb-3">
                            Home
                        </v-btn>

                        <v-btn color="success" block :to="{name: 'Tareas'}">
                            Lista de Tareas
                        </v-btn>

                    </v-flex>
                </v-layout> 
            </v-navigation-drawer>

    </v-container>
</template>

<script>
export default {
    name: 'BarNav',
    data(){
        return {
            dibujar: true
        };
    }
};
</script>