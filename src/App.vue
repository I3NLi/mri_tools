<template>
<div id="app">
  <router-view />
  <mu-dialog title="Not Implemented" :open.sync="$store.state.notImplemented">
    Waiting for implementation
    <mu-button slot="actions" flat color="primary" @click="$store.state.notImplemented=false">Close</mu-button>
  </mu-dialog>
</div>
</template>

<script>
export default {
  name: 'App',
  methods: {

  },
};
</script>
<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
