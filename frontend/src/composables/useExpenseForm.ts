import { ref } from "vue";
import { toast } from "vue-sonner";
import { useExpenseStore } from "../stores/expenseStore";

const isFormOpen = ref(false);
const isSubmitting = ref(false);
const formData = ref({
  title: "",
  amount: 0,
  category: "",
  label: "",
  date: "",
  note: "",
});

const expense_id = ref("");

const formMode = ref<"create" | "edit">("create");

export function useExpenseFormController() {
  const store = useExpenseStore();

  function openForm() {
    formMode.value = "create";
    isFormOpen.value = true;
  }

  function closeForm() {
    isFormOpen.value = false;
  }

  function editForm(record) {
    formMode.value = "edit";
    isFormOpen.value = true;

    formData.value = { ...record };

    expense_id.value = record._id;
  }

  async function submitForm() {
    isSubmitting.value = true;

    try {
      if (!formData.value.title || formData.value.amount <= 0) {
        throw new Error("Please fill out all required fields.");
      }

      if (formMode.value === "edit") {
        await store.updateExpense(expense_id.value, formData.value);
      } else {
        console.log(formData.value);

        await store.addExpense(formData.value);
      }

      closeForm();
      formData.value = {
        title: "",
        amount: 0,
        category: "",
        label: "",
        date: "",
        note: "",
      };

      formMode.value = "create";

      return { success: true };
    } catch (error: any) {
      toast.error(error.message || "Failed to add expense.");
      console.log(error);
      return { success: false };
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    isFormOpen,
    isSubmitting,
    formData,
    openForm,
    closeForm,
    submitForm,
    editForm,
    expense_id,
  };
}
