<template>
  <v-container grid-list-md>

    <v-layout row wrap>

      <v-flex xl12 sm6>

        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"></v-img>
          <v-card-tittle>Lorem, ipsum dolor.</v-card-tittle>
          <v-card-text>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, autem libero odio maiores assumenda veritatis
            animi totam numquam nihil provident? Harum soluta maiores accusamus, quam consectetur nam sed eligendi
            perspiciatis?</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="info" text>Acción</v-btn>
          </v-card-actions>

        </v-card>

      </v-flex>

      <v-flex xl12 sm6>

        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg">
            <v-container>
              <v-layou>
                <v-flex>
                  <span class="headline white--text">Lorem, ipsum dolor.</span>
                </v-flex>
              </v-layou>
            </v-container>
          </v-img>

          <v-card-tittle>Lorem, ipsum dolor.</v-card-tittle>
          <v-card-text>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, autem libero odio maiores assumenda veritatis
            animi totam numquam nihil provident? Harum soluta maiores accusamus, quam consectetur nam sed eligendi
            perspiciatis?</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="info" text>Acción</v-btn>
          </v-card-actions>

        </v-card>

      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
// @ is an alias to /src
export default {


}
</script>
