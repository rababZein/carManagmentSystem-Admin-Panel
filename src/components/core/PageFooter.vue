<template>
  <v-footer height="auto" dark inset app  :color="$root.themeColor">
    <v-card
      flat
      tile
      :color="$root.themeColor"
      class="text-xs-center">
      <v-card-text class="white--text">
        &copy; {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    }
  }
}
</script>

<style>

</style>
