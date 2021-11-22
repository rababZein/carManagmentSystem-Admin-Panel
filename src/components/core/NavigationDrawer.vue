<template>
  <v-navigation-drawer
    v-model="toggle"
    fixed app>
    <v-toolbar flat dark :color="$root.themeColor" class="toolbar">
      <router-link :to="{ name: 'Dashboard' }">
        <img src="../../../static/car-logo.png" width="36px"></img>
      </router-link>
      <router-link :to="{ name: 'Dashboard' }" class="text">
         REPARRANDO
      </router-link>
    </v-toolbar>
    <v-list>
      <v-list-tile @click="changeRoute('Dashboard', 1)">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-title :class="[{'active': selectedIndex === 1}, 'item-title' ]" >{{$t('dashboard')}}</v-list-tile-title>
      </v-list-tile>

    <v-list-group
      prepend-icon="account_circle"
      @click="changeRoute('Users', 1)">
      <v-list-tile slot="activator" @click="changeRoute('Users', 1)">
        <v-list-tile-title class="item-title">{{$t('users')}}</v-list-tile-title>
      </v-list-tile>
    </v-list-group>

    <!--Services -->
    <v-list-group
      prepend-icon="category"
      @click="changeRoute('Services', 1)">
      <v-list-tile slot="activator" @click="changeRoute('Services', 1)">
        <v-list-tile-title class="item-title">{{$t('services')}}</v-list-tile-title>
      </v-list-tile>
    </v-list-group>

    <!--Roles -->
    <v-list-group
      prepend-icon="accessibility_new"
      @click="changeRoute('Roles', 1)">
      <v-list-tile slot="activator" @click="changeRoute('Roles', 1)">
        <v-list-tile-title class="item-title">{{$t('roles')}}</v-list-tile-title>
      </v-list-tile>
    </v-list-group>

    <!--Car Models -->
    <v-list-group
      prepend-icon="local_car_wash"
      @click="changeRoute('CarModels', 1)">
      <v-list-tile slot="activator"  @click="changeRoute('CarModels', 1)">
        <v-list-tile-title class="item-title">{{$t('carmodels')}}</v-list-tile-title>
      </v-list-tile>
    </v-list-group>

    <!--Car Types -->
    <v-list-group
      prepend-icon="directions_car"
      @click="changeRoute('CarTypes', 1)">
      <v-list-tile slot="activator" @click="changeRoute('CarTypes', 1)">
        <v-list-tile-title class="item-title">{{$t('cartypes')}}</v-list-tile-title>
      </v-list-tile>
    </v-list-group>

    <!--Workshops -->
    <v-list-group 
      v-for="(permission, index) in user.role.permissions" :key="index"
      v-if="permission.name == 'CAN_UPDATE' || permission.name == 'CAN_VIEW' || permission.name == 'CAN_ALL'"
      prepend-icon="work"
      @click="changeRoute('Workshops', 1)">
      <v-list-tile  slot="activator" @click="changeRoute('Workshops', 1)">
        <v-list-tile-title class="item-title">{{$t('workshops')}}</v-list-tile-title>
      </v-list-tile>
    </v-list-group>

    <!--Customer -->
    <v-list-group
      v-for="(permission, index) in user.role.permissions" :key="index"
      v-if="permission.name == 'CAN_UPDATE' || permission.name == 'CAN_VIEW' || permission.name == 'CAN_ALL'"
      prepend-icon="airline_seat_recline_normal"
      @click="changeRoute('Customers', 1)">
      <v-list-tile slot="activator" @click="changeRoute('Customers', 1)">
        <v-list-tile-title class="item-title">{{$t('customers')}}</v-list-tile-title>
      </v-list-tile>
    </v-list-group>

    <!--Receipts -->
    <v-list-group 
      v-for="(permission, index) in user.role.permissions" :key="index"
      v-if="permission.name == 'CAN_UPDATE' || permission.name == 'CAN_VIEW' || permission.name == 'CAN_ALL'"
      prepend-icon="receipt"
      @click="changeRoute('Receipts', 1)">
      <v-list-tile slot="activator" @click="changeRoute('Receipts', 1)">
        <v-list-tile-title class="item-title">{{$t('receipts')}}</v-list-tile-title>
      </v-list-tile>
    </v-list-group>

    <!--Rates -->
    <v-list-group
      v-for="(permission, index) in user.role.permissions" :key="index"
      v-if="permission.name == 'CAN_VIEW' || permission.name == 'CAN_ALL'"
      prepend-icon="rate_review"
      @click="changeRoute('Rates', 1)">
      <v-list-tile slot="activator" @click="changeRoute('Rates', 1)">
        <v-list-tile-title class="item-title">{{$t('rates')}}</v-list-tile-title>
      </v-list-tile>
    </v-list-group>

    <!-- Logout-->
    <v-list-group prepend-icon="fingerprint"
    @click="logout()">
        <v-list-tile  slot="activator" @click="logout()">
          <v-list-tile-title class="item-title">{{$t('logout')}}</v-list-tile-title>
        </v-list-tile>
    </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    toggle: {
        type: Boolean,
        required: false,
        default: true
    }
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      selectedIndex: 1,
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ]
    }
  },

  methods: {
    changeRoute(routeName, selectedIndex) {
      const vm = this;

      vm.selectedIndex = selectedIndex;

      return vm.$router.push({ name: routeName });
    },
    logout(){
      localStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>

<style>
  .toolbar {
    font-weight: bold;
    font-size: 18px;
  }

  .toolbar .text {
    padding-left: 15px;
    color: white;
    text-decoration:none;
  }

  .item-title {
    font-size: 17px;
    font-weight: 500;
  }
  .item-sub-title {
    font-size: 15px;
    font-weight: 500;
  }

  .active {
    font-weight: bold;
  }
</style>
