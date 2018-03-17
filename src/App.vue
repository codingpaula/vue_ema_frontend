<template>
  <div id="app">
    <nav class="navbar fixed-top">
      <router-link :to="{ name: 'HelloWorld', params: {} }">Home</router-link>
      <router-link :to="{ name: 'Matrix', params: {} }">Matrix</router-link>
      <router-link :to="{ name: 'Profile', params: {} }">Profile</router-link>
      <router-link :to="{ name: 'LogIn', params: {} }">Log In</router-link>
    </nav>
    <router-view id="main" class="container-fluid"/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#main {
  margin-top: 60px;
}
nav {
  background-color: #2E86AB;
}
nav a {
  color: white;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 200;
}
nav a:hover {
  color: black;
  text-decoration: none;
}
</style>
