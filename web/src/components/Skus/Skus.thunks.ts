import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import httpClient from "@/libs/axios/axios.config";

export const fetchAll = createAsyncThunk("sku/fetch", async () => {
  return await httpClient
    .get<ISkuPagedList>("skus?pageNumber=1&pageSize=100")
    .then((response) => {
      return response.data.items;
    })
    .catch((error) => {
      toast.error(error.message);
      return Promise.reject(new Error(error.message));
    });
})

export const add = createAsyncThunk("sku/add", async (data: ISkuForm) => {
  return await httpClient
    .post<ISku>("skus", data)
    .then((response) => {
      toast.success("Sku added successfully");
      return response.data;
    })
    .catch((error) => {
      toast.error(error.message);
      return Promise.reject(new Error(error.message));
    });
});

export const update = createAsyncThunk("sku/update", async ({ id, data }: { id: string, data: ISkuForm }) => {
  return await httpClient
    .put<ISku>(`skus/${id}`, data)
    .then((response) => {
      toast.success("Sku updated successfully");
      return response.data;
    })
    .catch((error) => {
      toast.error(error.message);
      return Promise.reject(new Error(error.message));
    });
});