<template>
  <div id="app" class="small-container">
    <h1>Never have I ever...</h1>
    <p class="error" v-if="error">{{error}}</p>

    <div id="nav">
      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div>

    <!--<b-container>
      <b-row>
        <b-col>
          <navbar />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <router-view/>
        </b-col>
      </b-row>
    </b-container>-->

    <!--<haaste-form @add:haaste="addHaaste" />
    <haaste-table
            v-bind:haasteet="haasteet"
            @delete:haaste="deleteHaaste"
            @edit:haaste="editHaaste"
    />

  </div>-->
</template>

<script src="node.js"></script>
<script src="nodeService.js"></script>
<script>
  import HaasteTable from "@/components/HaasteTable.vue";
  import HaasteForm from "@/components/HaasteForm.vue";
  import navbar from "@/components/navbar";

  export default {
    name: 'app',
    components: {
      navbar,
      HaasteTable,
      HaasteForm,
    },
    data() {
      return {
        authenticated: false,
        mockAccount: {
          username: "admin",
          password: "admin"
        }
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
      }
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
