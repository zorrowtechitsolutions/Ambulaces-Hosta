import axios from "axios";

const api = axios.create({
  baseURL: "https://hosta-server.vercel.app/api", // change when deploying
  withCredentials: true,
});

export const ambulanceAPI = {
  register: (data: any) => api.post("/ambulance/register", data),
  login: (data: any) => api.post("/ambulance/login", data),
  profile: () => api.get("/ambulance"),
  update: (id: string, data: any) => api.put(`/ambulance/${id}`, data),
  delete: (id: string) => api.delete(`/ambulance/${id}`),
  getAll: () => api.get("/ambulances"),
};
