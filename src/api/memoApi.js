import axiosClient from "./axiosClient";

const memoApi = {
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.get("memo"),
  getOne: (id) => axiosClient.get(`memo/${id}`),
  updateOne: (id, params) => axiosClient.put(`memo/${id}`, params),
  deleteOne: (id) => axiosClient.delete(`memo/${id}`),
};

export default memoApi;
