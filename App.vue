<template>
  <div id="app" class="small-container">
    <p class="error" v-if="error">{{error}}</p>

    <img src="./assets/neverever.png" width="300"> <!-- LOGO -->

    <div id="nav">
      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script src="node.js"></script>
<script src="nodeService.js"></script>
<script>
  import HaasteTable from "@/components/HaasteTable.vue";
  import HaasteForm from "@/components/HaasteForm.vue";
  import navbar from "@/components/navbar";
  import nodeService from "@/nodeService";

  export default {
    name: 'app',
    components: {
      navbar,
      HaasteTable,
      HaasteForm,
      nodeService,
    },
    data() {
      return {
        authenticated: false,
      }
    },
    mounted() {
      if(!this.authenticated) {
        this.$router.replace({ name: "login" });
      }
    },
    methods: {
      setAuthenticated(status) {
        this.authenticated = status;
      },
      logout() {
        this.authenticated = false;
      },
    }
  }
</script>
<style>

  button {
    background: #009435;
    border: 1px solid #009435;
  }

  .small-container {
    max-width: 680px;
  }
</style>
