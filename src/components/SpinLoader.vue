<template>
      <div class="loader">
      <svg
        class="ring"
        width="76"
        height="76"
        viewBox="0 0 76 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M38 74C18.1178 74 2 57.8822 2 38C2 18.1178 18.1178 2 38 2C57.8822 2 74 18.1178 74 38C74 45.4006 71.7669 52.2796 67.9378 58"
          stroke="url(#paint0_linear)"
          stroke-width="3"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="2"
            y1="38"
            x2="74"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FF6647" />
            <stop offset="1" stop-color="#D6008F" />
          </linearGradient>
        </defs>
      </svg>
    </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({

})
</script>

<style scoped>
.loader {
  width: 343px;
  height: 222px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ring {
  margin: 0 auto;
  -webkit-animation: spin 3s linear infinite;
  -moz-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>