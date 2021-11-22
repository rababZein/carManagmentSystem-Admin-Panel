import Vue from 'vue';
import Router from 'vue-router';

// import Dashboard from '../pages/Dashboard.vue';
import Dashboard from '../pages/users/Index.vue';
import Login from '../pages/core/Login.vue';
import Users from '../pages/users/Index.vue';
import Services from '../pages/services/Index.vue';
import Roles from '../pages/roles/Index.vue';
import CarModels from '../pages/carModels/Index.vue';
import CarTypes from '../pages/carTypes/Index.vue';
import Workshops from '../pages/workshops/Index.vue';
import Workshop_services from '../pages/workshop_services/Index.vue';
import Customers from '../pages/customers/Index.vue';
import Customer_services from '../pages/customer_services/Index.vue';
import Receipts from '../pages/receipts/Index.vue';
import Rates from '../pages/rates/Index.vue';
import Error from '../pages/core/Error.vue';



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        breadcrumb: [
          { name: 'Dashboard' }
        ]
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        breadcrumb: [
          { name: 'Users' }
        ]
      }
    },
    {
      path: '/services',
      name: 'Services',
      component: Services,
      meta: {
        breadcrumb: [
          { name: 'Services' }
        ]
      }
    },
    {
      path: '/roles',
      name: 'Roles',
      component: Roles,
      meta: {
        breadcrumb: [
          { name: 'Roles' }
        ]
      }
    },
    {
      path: '/carTypes',
      name: 'CarTypes',
      component: CarTypes,
      meta: {
        breadcrumb: [
          { name: 'CarTypes' }
        ]
      }
    },
    {
      path: '/carModels',
      name: 'CarModels',
      component: CarModels,
      meta: {
        breadcrumb: [
          { name: 'CarModels' }
        ]
      }
    },
    {
      path: '/workshops',
      name: 'Workshops',
      component: Workshops,
      meta: {
        breadcrumb: [
          { name: 'Workshops' }
        ]
      }
    },
    {
      path: '/workshop_servicess/:workshop_id',
      name: 'Workshop_services',
      component: Workshop_services,
      meta: {
        breadcrumb: [
          { name: 'Workshop_services' }
        ]
      }
    },
    {
      path: '/customer_services/:customer_id',
      name: 'Customer_services',
      component: Customer_services,
      meta: {
        breadcrumb: [
          { name: 'Customer_services' }
        ]
      }
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers,
      meta: {
        breadcrumb: [
          { name: 'Customers' }
        ]
      }
    },
    {
      path: '/receipts',
      name: 'Receipts',
      component: Receipts,
      meta: {
        breadcrumb: [
          { name: 'Receipts' }
        ]
      }
    },
    {
      path: '/rates',
      name: 'Rates',
      component: Rates,
      meta: {
        breadcrumb: [
          { name: 'Rates' }
        ]
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: Error,
      meta: {
        allowAnonymous: true
      }
    },
  ]
});
