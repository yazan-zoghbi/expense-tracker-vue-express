import { defineStore } from "pinia";
import { useApi, type ExpenseRecord } from "../composables/useApi";

export const useExpenseStore = defineStore("recordStore", {
  state: () => ({
    records: [] as ExpenseRecord[],
  }),
  getters: {
    sortedRecordsByLatest: (state) =>
      [...state.records].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    monthlySummaryArray: (state) => {
      const summary = {} as Record<string, number>;

      for (const record of state.records) {
        const date = new Date(record.date);
        const key = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        summary[key] = (summary[key] || 0) + record.amount;
      }

      return Object.entries(summary)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([month, total]) => ({ month, total }));
    },
    categorySummaryByPeriod: (state) => {
      return (startDate: string, endDate: string) => {
        const summary = {} as Record<string, number>;
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();

        for (const record of state.records) {
          const recordDate = new Date(record.date).getTime();
          if (recordDate >= start && recordDate <= end) {
            const category = record.category || "Uncategorized";
            summary[category] = (summary[category] || 0) + record.amount;
          }
        }

        return Object.entries(summary).map(([category, total]) => ({
          category,
          total,
        }));
      };
    },
  },
  actions: {
    async loadExpenses() {
      const { getAllExpensesRecords } = useApi();
      const res = await getAllExpensesRecords();
      this.records = res;
    },
    async addExpense(data: any) {
      const { addExpense } = useApi();
      const res = await addExpense(data);
      this.records.push(res);
    },

    async updateExpense(id: string, data: any) {
      const { updateExpense } = useApi();
      const updatedRecord = await updateExpense(id, data);
      const index = this.records.findIndex((record) => record._id === id);
      if (index !== -1) {
        this.records[index] = updatedRecord;
      }
      await this.loadExpenses();
    },

    async deleteExpense(id: string) {
      const { deleteExpense } = useApi();

      await deleteExpense(id);
      this.records = this.records.filter((record) => record._id !== id);
    },
  },
});
