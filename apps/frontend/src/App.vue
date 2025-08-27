<script setup>
import { useRoute } from "vue-router";
import AuthForm from "./components/AuthForm.vue";

const route = useRoute();
</script>

<template>
  <v-app>
    <v-main class="background ma-0 pa-0">
      <Toaster position="top-right" richColors />
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.background {
  background-color: var(--color-background);
}
</style>
