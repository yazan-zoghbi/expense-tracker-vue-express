<template>
  <v-navigation-drawer
    expand-on-hover
    permanent
    rail
    :width="250"
    :rail-width="65"
    :color="colors.surface"
  >
    <v-list
      density="compact"
      :color="colors.primaryDark"
      :base-color="colors.primary"
      nav
    >
      <v-list-item class="mt-5" value="main">
        <template #prepend>
          <v-icon size="32">mdi-home</v-icon>
        </template>
        <v-list-item-title class="text-left text-button text-capitalize"
          >Main</v-list-item-title
        >
      </v-list-item>
      <v-list-item class="mt-5" value="shared">
        <template #prepend>
          <v-icon size="32">mdi-finance</v-icon>
        </template>
        <v-list-item-title class="text-left text-button text-capitalize"
          >Reports</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-layout width="100%">
    <router-view />
  </v-layout>
</template>

<script setup lang="ts">
import { useColors } from "../../composables/useColors";

const { colors } = useColors();
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
}
</style>
