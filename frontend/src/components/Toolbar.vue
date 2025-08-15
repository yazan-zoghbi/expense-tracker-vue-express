<script setup lang="ts">
import { useColors } from "../composables/useColors";

const { colors } = useColors();
</script>

<template>
  <v-toolbar :color="colors.surface">
    <v-toolbar-title text="Toolbar"></v-toolbar-title>
    <v-btn
      variant="tonal"
      :color="colors.primary"
      :base-color="colors.primaryLight"
      prepend-icon="mdi-plus-box-outline"
      text="Add record"
    >
    </v-btn>
  </v-toolbar>
</template>
