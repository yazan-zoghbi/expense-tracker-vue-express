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
