import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { httpClient } from "@/libs/axios/axios.config";

export const login = createAsyncThunk("auth/login", async (data: ReqLogin) => {
  return await httpClient
    .post<IUser>("login", data)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(error.message);
      return Promise.reject(new Error(error.message));
    });
});

