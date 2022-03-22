import { IForm } from "../types.d";
import { getNodeBaseUrl } from "./baseApi";
import axios from "axios";

const url = `${getNodeBaseUrl()}/entity`;

export const entityApi = {
  async getEntities() {
    return axios.get<{ Items: IForm[] }>(url);
  },
  async getEntityById(id: IForm["id"]) {
    return axios.get(`${url}/${id}`);
  },
  async editEntity(entity: IForm) {
    return axios.put(url, { ...entity });
  },
  async createEntity(entity: IForm) {
    return axios.post(url, { ...entity });
  },
  async deleteEntity(id: IForm["id"]) {
    return axios.delete(`${url}/${id}`);
  },
};
