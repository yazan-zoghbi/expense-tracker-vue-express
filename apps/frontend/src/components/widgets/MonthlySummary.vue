<template>
  <v-card class="mx-auto mb-5" height="400">
    <v-toolbar :color="colors.primary">
      <v-toolbar-title>Monthly Summary</v-toolbar-title>
    </v-toolbar>
    <div class="pa-5 h-75">
      <canvas ref="canvas"></canvas>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Chart from "../../plugins/chart";
import { useExpenseStore } from "../../stores/expenseStore";
import { useColors } from "../../composables/useColors";

const { colors } = useColors();

const canvas = ref<HTMLCanvasElement | null>(null);

const store = useExpenseStore();

onMounted(async () => {
  if (!canvas.value) return;
  await store.loadExpenses();

  const summary = store.monthlySummaryArray;

  const currentYear = new Date().getFullYear();

  const labels = Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, "0");
    return `${currentYear}-${month}`;
  });

  const displayLabels = labels.map((label) => {
    const monthIndex = parseInt(label.split("-")[1], 10) - 1;
    return new Date(0, monthIndex).toLocaleString("default", {
      month: "short",
    });
  });

  const data = labels.map((label) => {
    const match = summary.find((item) => item.month === label);
    return match ? match.total : 0;
  });

  new Chart(canvas.value, {
    type: "bar",
    data: {
      labels: displayLabels,
      datasets: [
        {
          label: "Monthly Expenses",
          data: data,
          backgroundColor: "rgba(66, 184, 131, 0.5)",
          borderColor: "#42b883",
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        title: { display: false, text: "Monthly Expense Summary" },
      },
    },
  });
});
</script>
