<script setup lang="ts">
import Toolbar from "../../components/Toolbar.vue";
import ExpensesList from "../../components/widgets/ExpensesList.vue";
import ExpenseForm from "../../components/ExpenseForm.vue";
import MonthlySummary from "../../components/widgets/MonthlySummary.vue";
import CategorySummary from "../../components/widgets/CategorySummary.vue";
</script>

<template>
  <v-container class="wrapper rounded-lg ma-5">
    <Toolbar></Toolbar>
    <v-layout class="d-flex flex-column mt-5 ma-5">
      <ExpenseForm></ExpenseForm>
      <v-row class="justify-space-between">
        <v-col class="pa-5" cols="5">
          <ExpensesList></ExpensesList>
        </v-col>
        <v-col class="pa-5" cols="7">
          <CategorySummary></CategorySummary>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-5" cols="12">
          <MonthlySummary></MonthlySummary>
        </v-col>
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
