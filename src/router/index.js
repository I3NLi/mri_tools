import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../pages/Home';
import DrugsChecker from '../pages/DrugsChecker';
import PatientDashboard from '../pages/PatientDashboard';
import BodyTemperature from '../pages/BodyTemperature';
import BloodPressure from '../pages/BloodPressure';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/drugsChecker',
    name: 'DrugsChecker',
    component: DrugsChecker,
  },
  {
    path: '/patientDashboard',
    name: 'PatientDashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PatientDashboard,
  },
  {
    path: '/bodyTemperature',
    name: 'BodyTemperature',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BodyTemperature,
  },
  {
    path: '/bloodPressure',
    name: 'BloodPressure',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BloodPressure,
  },


];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
