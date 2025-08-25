<template>
  <v-card class="mx-auto mb-5" max-width="500" min-height="600">
    <v-toolbar :color="colors.primary">
      <v-btn icon="mdi-menu"></v-btn>

      <v-toolbar-title>Latest Expneses</v-toolbar-title>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-checkbox-marked-circle"></v-btn>
    </v-toolbar>

    <div v-if="expensesRecords.length === 0">
      <p class="text-body-2">No expenses found. Start by adding one above</p>
    </div>
    <div v-else>
      <v-list
        v-model:selected="selected"
        select-strategy="leaf"
        :color="colors.primaryDark"
        :base-color="colors.primary"
      >
        <v-list-item
          v-for="record in expensesRecords"
          :key="record._id"
          :value="record._id"
          active-class="selected-item"
          class="text-left py-3"
        >
          <div class="d-flex align-center ga-3">
            <div>
              <div class="pa-4 category-icon rounded-circle">
                <v-icon class="" icon="mdi-food"></v-icon>
              </div>
            </div>

            <div>
              <v-chip class="mb-3" rounded="lg">{{ record.label }}</v-chip>
              <v-list-item-subtitle
                class="mb-1 text-high-emphasis opacity-100"
                >{{ record.title }}</v-list-item-subtitle
              >

              <v-list-item-subtitle class="text-high-emphasis">{{
                record.note
              }}</v-list-item-subtitle>
            </div>
          </div>

          <template v-slot:append="{ isSelected }">
            <v-list-item-action class="flex-column ga-3 align-end">
              <small class="text-high-emphasis opacity-60">{{
                formatTimeDifference(record.date)
              }}</small>

              <small class="text-high-emphasis opacity-60 text-error"
                >USD -{{ formatAmount(record.amount) }}
              </small>

              <small class="text-high-emphasis">
                <div class="d-flex ga-3">
                  <v-btn
                    icon="mdi-pencil"
                    size="sm"
                    variant="text"
                    @click="editForm(record)"
                  />
                  <v-btn
                    class="text-error"
                    icon="mdi-delete"
                    size="sm"
                    variant="text"
                    @click="store.deleteExpense(record._id)"
                  />
                </div>
              </small>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useColors } from "../../composables/useColors";

import { computed, onMounted, shallowRef } from "vue";
import { useExpenseStore } from "../../stores/expenseStore";
import { useExpenseFormController } from "../../composables/useExpenseForm";

const selected = shallowRef([2]);

const { colors } = useColors();

const { editForm } = useExpenseFormController();

const store = useExpenseStore();

onMounted(() => store.loadExpenses());

const expensesRecords = computed(() => store.sortedRecordsByLatest);

function formatTimeDifference(recordDate: string): string {
  const ms = new Date(recordDate).getTime() - Date.now();
  const absMs = Math.abs(ms); // handle past/future
  const totalSeconds = Math.floor(absMs / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);

  // if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  // if (minutes) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  // if (seconds || parts.length === 0)
  //  parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);

  return ms < 0 ? `${parts.join(", ")} ago` : `in ${parts.join(", ")}`;
}

function formatAmount(amount?: number): string {
  if (typeof amount !== "number") return "0";
  return amount.toLocaleString();
}
</script>

<style scoped>
.widget {
  border: 1px solid;
  border-color: var(--color-border);
}

.selected-item {
  color: var(--color-text);
}

.expense-value {
  color: var(--color-border);
}

.category-icon {
  background-color: var(--color-background);
}
</style>
