<template>
  <Search />
</template>

<script lang="ts">
import Vue from "vue";
import Search from "./components/Search.vue";

export default Vue.extend({
  name: "App",
  components: {
    Search,
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Noto Sans", sans-serif;
}
body {
  width: 100vw;
  height: 100vh;
}
</style>
