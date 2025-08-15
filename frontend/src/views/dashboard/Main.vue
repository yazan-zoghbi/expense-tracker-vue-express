<script setup lang="ts">
import Toolbar from "../../components/Toolbar.vue";
import ExpensesList from "../../components/widgets/ExpensesList.vue";
</script>

<template>
  <v-container class="wrapper rounded-lg ma-5">
    <Toolbar></Toolbar>
    <v-layout class="mt-5 ma-5">
      <v-row>
        <v-col cols="6">
          <ExpensesList></ExpensesList>
        </v-col>
        <v-col cols="6"></v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<style scoped>
.wrapper {
  width: 1600px;
  background-color: var(--color-surface);
}
</style>
