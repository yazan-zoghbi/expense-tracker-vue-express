<template>
  <v-dialog v-model="isFormOpen" max-width="500">
    <v-card rounded="lg">
      <v-card-title class="px-5 mt-5">Add new record</v-card-title>
      <v-form @submit.prevent="submitForm" class="pa-5">
        <v-spacer></v-spacer>
        <v-text-field
          v-model="formData.title"
          type="text"
          label="Title"
          variant="outlined"
        />
        <v-number-input
          v-model="formData.amount"
          label="Amount"
          variant="outlined"
          control-variant="hidden"
          prefix="$"
        ></v-number-input>

        <v-text-field
          v-model="formData.category"
          type="text"
          label="Category"
          variant="outlined"
        />
        <v-text-field
          v-model="formData.label"
          type="text"
          label="Label"
          append-inner-icon="mdi-magnify"
          variant="outlined"
        />

        <v-date-input
          v-model="formData.date"
          label="Date"
          prepend-icon=""
          variant="outlined"
          persistent-placeholder
        ></v-date-input>

        <v-textarea v-model="formData.note" label="Note" variant="outlined" />

        <v-card-actions>
          <v-btn type="submit" :loading="isSubmitting">Save</v-btn>
          <v-btn @click="closeForm">Close</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useExpenseFormController } from "../composables/useExpenseForm";

const { isFormOpen, isSubmitting, formData, closeForm, submitForm } =
  useExpenseFormController();
</script>
