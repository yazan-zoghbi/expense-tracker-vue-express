<template>
  <v-app>
    <v-main>
      <Toaster position="top-right" richColors />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRoute } from "vue-router";
import AuthForm from "./components/AuthForm.vue";

const route = useRoute();
</script>
