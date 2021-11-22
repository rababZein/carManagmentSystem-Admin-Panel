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
      defaultItem: {
        customer_service_id: '',
        rate_customer: '',
        rate_workshop: ''
      },
    }),
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    computed: {
      headers () {
        return [
          {
            text: i18n.t('customerservice'),
            align: 'left',
            sortable: false,
            value: 'customer_service.name',
          },
          { text: i18n.t('ratecustomer'), value: 'rate_customer' },
          { text: i18n.t('rateworkshop'), value: 'rate_workshop' },
        ]
      },
    },
    methods: {
      initialize () {
        this.$api.get(`${process.env.VUE_APP_API_ENDPOINT}admin/rate`, {
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
    },
  }
</script>