<template>
  <v-row class="fill-height">
    <v-col>

      <v-sheet height="64">
        <v-toolbar flat>
          
          <v-btn outlined class="mr-4" clor="grey darken-2" @click="dialog=true">
            Agregar Evento
          </v-btn>

          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Hoy
          </v-btn>

          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>

          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>

          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-menu bottom right>

            <template v-slot:activator="{ on, attrs }">

              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>

            </template>

            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Día</v-list-item-title>
              </v-list-item>

              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>

              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mes</v-list-item-title>
              </v-list-item>

              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 días</v-list-item-title>
              </v-list-item>
            </v-list>

          </v-menu>

        </v-toolbar>
      </v-sheet>

      <v-sheet height="600">
        <v-calendar locale="es" ref="calendar" color="primary" v-model="focus" :weekdays="weekday" :short-weekdays="false" :events="events" :event-color="getEventColor" :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay" @change="getEvents">
        </v-calendar>

        <!-- Ventana modal Agregar Evento -->
        <v-dialog v-model="dialog">
          <v-card>

            <v-container>
              <v-form @submit.prevent="addEvent">

                <v-text-field type="text" label="Nombre del evento" v-model="name">
                </v-text-field>

                <v-text-field type="text" label="Detalles del evento" v-model="details">
                </v-text-field>

                <v-text-field type="date" label="Inicio del evento" v-model="start">
                </v-text-field>

                <v-text-field type="date" label="Fin del evento" v-model="end">
                </v-text-field>

                <v-text-field type="color" label="Color del evento" v-model="color">
                </v-text-field>

                <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog=false">
                  Agregar Evento
                </v-btn>
                  
              </v-form>
            </v-container>

          </v-card>
        </v-dialog>


        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>

          <v-card color="grey lighten-4" min-width="350px" flat>

            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon @click="deleteEvent(selectedEvent)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>

              <v-toolbar-title v-html="selectedEvent.name">
              </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-form v-if="edit !== selectedEvent.id">
                {{selectedEvent.name}} - {{selectedEvent.details}}
              </v-form>

              <v-form v-else>
                <v-text-field type="text" label="Editar Nombre" v-model="selectedEvent.name">
                </v-text-field>

                <textarea-autosize type="text" style="width: 100%" v-model="selectedEvent.details" :min-height="100">
                </textarea-autosize>
              </v-form>             
            </v-card-text>

            <v-card-actions>
              <v-btn v-if="edit !== selectedEvent.id" @click.prevent="editEvent(selectedEvent.id)">
                Editar
              </v-btn>

              <v-btn v-else @click.prevent="updateEvent(selectedEvent)">
                Guardar Cambios
              </v-btn>

              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>

          </v-card>

        </v-menu>

      </v-sheet>


      <v-snackbar v-model="snackbar">
        {{mensaje}}
        <v-btn text color="pink" @click="snackbar=false">
          Cerrar
        </v-btn>
      </v-snackbar> 

    </v-col>
  </v-row>
</template>

<script>
import {db} from '../main'

  export default {
    data: () => ({
      focus: '',
      type: 'month',

      typeToLabel: 
      {
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        '4day': '4 Días',
      },

      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,

      weekday: [1,2,3,4,5,6,0],

      dialog: false,
      edit: null,

      events: [],

      eventosFireBase: [],
      snackbar: false,
      mensaje: '',
      name: null,
      details: null,
      start: null,
      end: null,
      color: '#1976D2',
    }),

    mounted () {
      this.$refs.calendar.checkChange()
    },

    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },

      getEventColor (event) {
        return event.color
      },

      setToday () {
        this.focus = ''
      },

      prev () {
        this.$refs.calendar.prev()
      },

      next () {
        this.$refs.calendar.next()
      },

      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {this.selectedOpen = true}, 10)
        }

        if (this.selectedOpen)
        {
          this.selectedOpen = false
          setTimeout(open, 10)
        } 
        else
        {
          open()
        }

        nativeEvent.stopPropagation()
      },

      updateRange ({ start, end }) {
        const events = []
        
        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000

        for (let i = 0; i < this.eventosFireBase.length; i++) {
          
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)
          

          events.push({
              id:       this.eventosFireBase[i].id,
              name:     this.eventosFireBase[i].name,
              details:  this.eventosFireBase[i].details,
              start:    this.eventosFireBase[i].start,
              end:      this.eventosFireBase[i].end,
              color:    this.eventosFireBase[i].color
          })
        }
        this.events = events
      },

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },

      async getEvents(){
        try
        {
          const snapshot = await db.collection('eventos').get();
          const events = [];

          snapshot.forEach(doc => {
            let datosEvento = doc.data();
            datosEvento.id = doc.id;
            events.push(datosEvento)
          });


          for(let i=0; i<events.length; i++){

            this.eventosFireBase.push({
              id:       events[i].id,
              name:     events[i].name,
              details:  events[i].details,
              start:    events[i].start,
              end:      events[i].end,
              color:    events[i].color
            })
          }

          this.events = this.eventosFireBase;
          this.eventosFireBase = [];
        }
        catch(error){
          console.log(error);
        }
      },

      async addEvent(){
        try
        {
          if(this.name!=null && this.start!=null && this.end!=null)
          {
            await db.collection('eventos').add({
              name:     this.name,
              details:  this.details,
              start:    this.start,
              end:      this.end,
              color:    this.color
            })

            this.name = null;
            this.details = null;
            this.start = null;
            this.end = null;
            this.color = '#1976D2'
          }
          else
          {
            this.mensaje = 'Debes llenar todos los campos'
            this.snackbar = true;
          }
        }
        catch(error)
        {
          console.log(error)
        }
      },

      async deleteEvent(evento){
        try
        {
          await db.collection('eventos').doc(evento.id).delete();
          this.selectedOpen = false;
          this.getEvents();
        }
        catch(error)
        {
          console.log(error);
        }
      },

      editEvent(id){
        this.edit = id;
      },

      async updateEvent(evento){
        try
        {
          await db.collection('eventos').doc(evento.id).update({
            name: evento.name,
            details: evento.details
          })

          this.selectedOpen = false;
          this.edit = null;
        }
        catch(error)
        {
          console.log(error);
        }
      },


 
    },
  }
</script>