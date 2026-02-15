import axiosInstance from "./axiosInstance";

// Add Transaction (Income or Expense)
export const addTransaction = (data) => {
  return axiosInstance.post("/api/transactions/addtransaction", data);
};

// Get all transactions of a user
export const getUserTransactions = (userId) => {
  return axiosInstance.get(`/api/transactions/user/${userId}`);
};

// Dashboard summary
export const getDashboardSummary = (userId) => {
  return axiosInstance.get(
    `/api/transactions/dashboard/summary/${userId}`
  );
};

// Delete transaction
export const deleteTransaction = (transactionId, userId) => {
  return axiosInstance.delete(
    `/api/transactions/deletTransaction/${transactionId}?userId=${userId}`
  );
};
