<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">TECMF - PUC-RIO - BRAZIL</h6>
      <h4 class="card-title">Felipe Lopes</h4>
      <h6 class="category text-gray">felipeservicos@gmail.com</h6>
      <p class="card-description">
        This app is open source for any modifications. Thanks and Credits
        for this frontend to #CREATIVE TIM.
      </p>

    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/vcard_image.png"),
    },
  },
  data() {
    return {};
  },
};
</script>
<style></style>
