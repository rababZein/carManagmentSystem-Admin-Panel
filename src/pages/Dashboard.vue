<template>

  <v-container fluid grid-list-xl>
    <div v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular indeterminate :size="50" :width="3" color="green"></v-progress-circular>
      </div>
    </div>
    <v-layout row wrap>
      <v-flex xs4 v-for="(item, index) in users" :key="index" mb-2>
        <v-card max-width="344" class="mx-auto">
          <v-card-title>{{item.name}}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: null,
      loading: true
    }
  },
  mounted() {
    this.$api.user
      .getItems()
      .then(response => {
        this.users = response.data.data;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>

<style>

</style>
