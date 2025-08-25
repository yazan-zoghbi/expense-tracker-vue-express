import { toast } from "vue-sonner";

export interface ExpenseRecord {
  _id: string;
  user: string;
  title: string;
  amount: number;
  category: string;
  label: string;
  date: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const useApi = () => {
  const getAllExpensesRecords = async () => {
    try {
      let response = await fetch("http://localhost:3000/expense/get/all", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.status === 401) {
        const refresh = await refreshToken();

        console.log(refresh.url);

        if (refresh.ok) {
          response = await fetch("http://localhost:3000/expense/get/all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
        } else {
          toast.error(refresh.statusText);
        }
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success("Logged in successfully!");
      return result.data;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const addExpense = async (data) => {
    const response = await fetch("http://localhost:3000/expense/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    toast.success("Logged in successfully!");

    return result.data;
  };

  const updateExpense = async (id: string, data) => {
    try {
      const response = await fetch(`http://localhost:3000/expense/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      return result;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteExpense = async (id: string) => {
    const response = await fetch(`http://localhost:3000/expense/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return toast.success("Expense record has been deleted.");
  };

  const refreshToken = async () => {
    const response = await fetch(`http://localhost:3000/auth/refresh`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    console.log(await response.json());

    return response;
  };

  return {
    getAllExpensesRecords,
    addExpense,
    updateExpense,
    deleteExpense,
    refreshToken,
  };
};
