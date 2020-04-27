<template>
  <div id="app" class="small-container">
    <h1>Never have I ever...</h1>
    <p class="error" v-if="error">{{error}}</p>

    <b-container>
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
    </b-container>

    <!--<haaste-form @add:haaste="addHaaste" />
    <haaste-table
            v-bind:haasteet="haasteet"
            @delete:haaste="deleteHaaste"
            @edit:haaste="editHaaste"
    />-->

  </div>
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
        haasteet: [],
      }
    },
    methods: {

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
