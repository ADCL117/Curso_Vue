<template>
  <v-container grid-list-md>

    <v-layout row wrap>

      <v-flex xl12 sm6>

        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"></v-img>
          <v-card-title>Lorem, ipsum dolor.</v-card-title>
          <v-card-text>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, autem libero odio maiores assumenda veritatis
            animi totam numquam nihil provident? Harum soluta maiores accusamus, quam consectetur nam sed eligendi
            perspiciatis?</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="info" text @click="barra = true">Acción</v-btn>
          </v-card-actions>

        </v-card>

      </v-flex>

      <v-flex xl12 sm6>

        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg">
            <v-container>
              <v-layout>
                <v-flex>
                  <span class="headline white--text">Lorem, ipsum dolor.</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>

          <v-card-title>Lorem, ipsum dolor.</v-card-title>
          <v-card-text>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, autem libero odio maiores assumenda veritatis
            animi totam numquam nihil provident? Harum soluta maiores accusamus, quam consectetur nam sed eligendi
            perspiciatis?</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="info" text @click="dialog = true">Acción</v-btn>
          </v-card-actions>

        </v-card>

      </v-flex>

    </v-layout>

    <!-- Dialog -->
      <v-dialog v-model="dialog" width="500" persistent>
        <v-card>
          <v-card-title> Este es el título </v-card-title>
          <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, temporibus esse? Et, tempore nam quam
          fugit consectetur eaque! In quas alias vero adipisci. Eius possimus blanditiis odit. Natus,
          cumque quia?</v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-btn @click="dialog = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>

    <!-- Fin Dialaog -->

    <v-dialog v-model="barra" width="500">
      <v-card color="primary" dark>
        <div class="text-center"> Por favor espere </div>
        <v-progress-linear indeterminate color="white" class="mb-0">
        </v-progress-linear >
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
// @ is an alias to /src
export default {
  data(){
    return {
      dialog: false,
      barra: false
    }
  }

}
</script>
