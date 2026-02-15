import axiosInstance from "./axiosInstance";

export const loginUser = (data) => {
  return axiosInstance.post("/api/users/login", data);
};

export const registerUser = (data) => {
  return axiosInstance.post("/api/users/register", data);
};
