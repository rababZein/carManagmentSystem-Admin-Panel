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
  import router from '../../router';

  export default {
    data: () => ({
      user: JSON.parse(localStorage.getItem('user')),
      dialog: false,
      desserts: [],
    }),
    created () {
      this.initialize()
    },
    computed: {
      headers() {
        return [
          {
            text: i18n.t('name'),
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: i18n.t('description'), value: 'description' },
          { text: i18n.t('workshopservices'), value: 'service.name' },
          { text: i18n.t('customers'), value: 'customer.name' },
          { text: i18n.t('receipts'), value: 'receipt.name' }
        ];
      }
    },
    methods: {
      initialize () {
        this.$api.get(`${process.env.VUE_APP_API_ENDPOINT}admin/customer_service/${this.$route.params.id}`, {
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