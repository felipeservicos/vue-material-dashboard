<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Docs and References</h4>
        <p class="category">Here some documentation about this app</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <md-content>This application is divided between backend and frontend</md-content>
          
          <md-content>For Frontend:</md-content>
          A dashboard template was used using the Vue.JS framework as technology.

            The code was reused and integrated into the backend module which is the core of the application.
            
Documentation for the frontend: https://github.com/felipeservicos/vue-material-dashboard
          

  


          <md-content>For Backend:</md-content>

          For the backend, the java language was used.

Basically, this core module calculates the dimensions of Vapnik Chervonenkis and minimum samples for each type of machine learning algorithm.

All code documentation and manuals can be found here: https://github.com/felipeservicos/PacLearningModuleCalculator


A demo of the application is running here: xxxxxxxx


The code documentation (JavaDoc) can be read here: xxxxxxxxxxx


        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      username: null,
      disabled: null,
      emailadress: null,
      lastname: null,
      firstname: null,
      address: null,
      city: null,
      country: null,
      code: null,
      aboutme:
        "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.",
    };
  },
};
</script>
<style></style>
