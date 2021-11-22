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
       
      </v-toolbar>
    </template>
    <template v-slot:item.services="{ item }">
      <router-link :to="{ name: 'Workshop_services', params: { id: item.id } }">{{$t('workshopservices')}}</router-link>
    </template>
    <template v-slot:item.action="{ item }">
      <div v-for="(permission, index) in user.role.permissions" :key="index">
        <v-icon
          small
          class="mr-2"
          v-if="permission.name == 'CAN_UPDATE'  || permission.name == 'CAN_ALL'"
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
        description: '',
        email: '',
        address: '',
        zip_code: '',
        phone: '',
        work_from: '',
        work_to: '',
        services:'',
        is_active: ''
      },
      defaultItem: {
        name: '',
        description: '',
        email: '',
        address: '',
        zip_code: '',
        phone: '',
        work_from: '',
        work_to: '',
        services: '',
        is_active: ''
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
          { text: i18n.t('email'), value: 'email' },
          { text: i18n.t('address'), value: 'address' },
          { text: i18n.t('zipcode'), value: 'zip_code' },
          { text: i18n.t('phone'), value: 'phone' },
          { text: i18n.t('workfrom'), value: 'work_from' },
          { text: i18n.t('workto'), value: 'work_to' },
          { text: i18n.t('services'), value: 'services' },
          { text: i18n.t('active'), value: 'is_active' },
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
            this.headers.splice(10, 1);
        }

        // fill data
        this.$api.get(`${process.env.VUE_APP_API_ENDPOINT}admin/workshop`, {
          headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
        })
        .then(response => {
          this.desserts = response.data.data;
          // this.desserts.services = '<template scope="props"><a v-bind:href=""></a></template>';
          // console.log(this.desserts);
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
        const answer = confirm('Are you sure you want to activate/deactivate this workshop?')
        if (answer) {
          this.$api.post(`${process.env.VUE_APP_API_ENDPOINT}admin/workshop/activate`,
          {
            id: item.id,
            is_active: !item.is_active
          },
          {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
          })
          .then(response => {
            this.editedItem.is_active = response.data.data.is_active ? 1 : 0;
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
      }
    },
  }
</script>