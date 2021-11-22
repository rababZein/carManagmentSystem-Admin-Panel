<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ $t('managment') }}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="500px">
          <template  v-slot:activator="{ on }">
            <div v-for="(permission, index) in user.role.permissions" :key="index">
              <v-btn v-if="permission.name == 'CAN_CREATE' || permission.name == 'CAN_ALL'"  color="primary" dark class="mb-2" v-on="on">{{ $t('newitem') }}</v-btn>
            </div>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" v-bind:label="$t('name')" :rules="nameRules" required></v-text-field>
                  </v-col>
                  </v-row>
                  <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-textarea v-model="editedItem.description" v-bind:label="$t('description')"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">{{$t('cancel')}}</v-btn>
              <v-btn color="blue darken-1" text @click="save">{{$t('save')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <div v-for="(permission, index) in user.role.permissions" :key="index">
        <v-icon
          small
          class="mr-2"
          v-if="permission.name == 'CAN_UPDATE' || permission.name == 'CAN_ALL'"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          v-if="permission.name == 'CAN_DELETE' || permission.name == 'CAN_ALL'"
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
      </div>
    </template>
  </v-data-table>
</template>

<script>
  import i18n from '@/plugins/i18n';

  export default {
    data: () => ({
      dialog: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 10 characters',
      ],
      user: JSON.parse(localStorage.getItem('user')),
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        description: '',
      },
      defaultItem: {
        name: '',
        description: '',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? i18n.t('newitem') : i18n.t('edititem')
      },
      headers() { 
        return [
          {
            text: i18n.t('name'),
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: i18n.t('description'), value: 'description' },
          { text: i18n.t('actions'), value: 'action', sortable: false },
        ];
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        // actions in header
        var flag = true;
        for(var i=0; i <  this.user.role.permissions.length; i++) {
          if (this.user.role.permissions[i].name.includes("CAN_ALL") || this.user.role.permissions[i].name.includes('CAN_UPDATE') || this.user.role.permissions[i].name.includes('CAN_DELETE')) {
             flag = false;
          }          
        }
        if (flag === true) {
            this.headers.splice(2, 1);
        }

        // fill data
        this.$api.get(`${process.env.VUE_APP_API_ENDPOINT}admin/car_model`, {
          headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
        })
        .then(response => {
          this.desserts = response.data.data;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.$toasted.global.my_app_error();
        });
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        console.log(item.id);
        this.dialog = true;
        console.log('df');
        // console.log(JSON.parse(localStorage.getItem('user')).role.permissions[0]);
        // console.log(this.user)
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        // console.log(item);
        const answer = confirm('Are you sure you want to delete this item?')
        if (answer) {
          this.$api.delete(`${process.env.VUE_APP_API_ENDPOINT}admin/car_model/${item.id}`,
          {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
          })
          .then(response => {
            console.log(response);
            // this.desserts = response.data.data;
            this.loading = false;
            this.desserts.splice(index, 1);
          })
          .catch(error => {
            console.log(error);
            this.$toasted.global.my_app_error({
                message : error.response.data.message
            });
          });
        }
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        console.log(this.editedItem.id);
        if (this.editedIndex > -1) {
          this.$api.patch(`${process.env.VUE_APP_API_ENDPOINT}admin/car_model/${this.editedItem.id}`,
          {
            name: this.editedItem.name,
            description: this.editedItem.description
          },
          {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
          })
          .then(response => {
            // console.log(response);
            // this.desserts = response.data.data;
            this.loading = false;
            this.close();
            Object.assign(this.desserts[this.editedIndex], this.editedItem);
          })
          .catch(error => {
            console.log(error);
            this.$toasted.global.my_app_error({
                message : error.response.data.message
            });
          });
        } else {
          this.$api.post(`${process.env.VUE_APP_API_ENDPOINT}admin/car_model`,
          {
            name: this.editedItem.name,
            description: this.editedItem.description
          },
          {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
          })
          .then(response => {
            console.log(response);
            this.editedItem = response.data.data;
            this.loading = false;
            this.close();
            this.desserts.push(this.editedItem);
          })
          .catch(error => {
            console.log(error);
            this.$toasted.global.my_app_error({
                message : error.response.data.message
            });
          });
        }
        
      },
    },
  }
</script>