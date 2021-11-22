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
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" v-bind:label="$t('name')" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.description" v-bind:label="$t('description')" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.customer_service_id" v-bind:label="$t('customer')" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.total_price" v-bind:label="$t('totalprice')" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.system_price" v-bind:label="$t('systemprice')"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.is_paid" v-bind:label="$t('bezahlt?')"></v-text-field>
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
      </div>
    </template>
  </v-data-table>
</template>

<script>
  import i18n from '@/plugins/i18n';
  
  export default {
    data: () => ({
      user: JSON.parse(localStorage.getItem('user')),
      dialog: false,
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        customer_service_id: '',
        description: '',
        total_price: 0,
        system_price: 0,
        is_paid: false,
      },
      defaultItem: {
        name: '',
        customer_service_id: '',
        description: '',
        total_price: '',
        system_price: '',
        is_paid: false,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      headers () {
        return [
          {
            text: i18n.t('name'),
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: i18n.t('description'), value: 'description' },
          { text: i18n.t('customerservices'), value: 'customer_service.name' },
          { text: i18n.t('totalprice'), value: 'total_price' },
          { text: i18n.t('systemprice'), value: 'system_price' },
          { text: i18n.t('paidtosystem'), value: 'is_paid' },
          { text: i18n.t('actions'), value: 'action', sortable: false },
        ]
      },
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
          if (this.user.role.permissions[i].name.includes("CAN_ALL") || this.user.role.permissions[i].name.includes('CAN_UPDATE')) {
             flag = false;
          }          
        }
        if (flag === true) {
            this.headers.splice(6, 1);
        }

        // fill data
        this.$api.get(`${process.env.VUE_APP_API_ENDPOINT}admin/receipt`, {
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
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        // console.log('df')
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        // console.log(this.editedItem.is_paid)
        // console.log((this.editedItem.is_paid == 1) ? true : false);
        if (this.editedIndex > -1) {          
          this.$api.post(`${process.env.VUE_APP_API_ENDPOINT}admin/receipt/${this.editedItem.id}`,
          {
            system_price: this.editedItem.system_price,
            is_paid: (this.editedItem.is_paid == 1) ? true : false
          },
          {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
          })
          .then(response => {
            // console.log(response);
            // this.desserts = response.data.data;
            this.loading = false;
            Object.assign(this.desserts[this.editedIndex], this.editedItem);
          })
          .catch(error => {
            console.log(error);
            this.$toasted.global.my_app_error({
                message : error.response.data.message
            });
          });
        } 

        this.close()
      },
    },
  }
</script>