<template>
  <v-card class="mx-auto mb-5" min-height="600">
    <v-toolbar :color="colors.primary">
      <v-toolbar-title>Category Summary</v-toolbar-title>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-calendar</v-icon>
          </v-btn>
        </template>

        <v-date-picker
          v-model="selectedDate"
          @input="menu = false"
          color="primary"
          multiple="range"
        ></v-date-picker>
      </v-menu>
    </v-toolbar>
    <div class="d-flex justify-center ga-3 mt-5">
      <span>selected date:</span><span>{{ formatDate(selectedDate[0]) }}</span>
      <span>to</span
      ><span>{{ formatDate(selectedDate[selectedDate.length - 1]) }}</span>
    </div>
    <div class="pa-5 h-75">
      <canvas style="height: 400px" ref="canvas"></canvas>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useColors } from "../../composables/useColors";
import { useExpenseStore } from "../../stores/expenseStore";
import Chart from "../../plugins/chart";

const menu = ref(false);
const selectedDate = ref([]);
const canvas = ref<HTMLCanvasElement | null>(null);
const chartInstance = ref<any>(null);

const { colors } = useColors();
const store = useExpenseStore();

// Chart update logic
const updateChart = async (start: string, end: string) => {
  if (!canvas.value) return;

  const summary = store.categorySummaryByPeriod(start, end);
  const labels = summary.map((item) => item.category);
  const data = summary.map((item) => item.total);

  if (chartInstance.value) chartInstance.value.destroy();

  chartInstance.value = new Chart(canvas.value, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          label: "Expenses",
          data,
          backgroundColor: [
            "#42b883",
            "#ffcd56",
            "#ff6384",
            "#36a2eb",
            "#9966ff",
            "#4bc0c0",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        title: { display: false },
      },
    },
  });
};

const formatDate = (date: Date): string => date.toISOString().split("T")[0];

// Initial chart render
onMounted(async () => {
  await store.loadExpenses();

  if (Array.isArray(selectedDate.value) && selectedDate.value.length > 0) {
    const startDate = formatDate(selectedDate.value[0]);
    const endDate = formatDate(
      selectedDate.value[selectedDate.value.length - 1]
    );

    updateChart(startDate, endDate);
  }
});

// Watch for date changes
watch(selectedDate, (range) => {
  if (!Array.isArray(range) || range.length === 0) return;

  const startDate = formatDate(range[0]);
  const endDate = formatDate(range[range.length - 1]);

  console.log("Selected range:", startDate, "to", endDate);
  updateChart(startDate, endDate);
});
</script>
