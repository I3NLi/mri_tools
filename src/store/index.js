import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notImplemented: false,
    patient: {
      name: 'Patient Mustmann',
      age: 47,
      sex: 'Male',
      allergyHistory: 'Penicillin; ',
      diagnostic: 'Atypical pneumonia; Coronavirus infection',
      doctorAdvice: 'No smoking and drinking;  Measure body temperature every hour;',
      note: 'Strong infection risk!!',
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
