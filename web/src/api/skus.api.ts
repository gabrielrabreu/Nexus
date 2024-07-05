import { httpClient } from "@/libs/axios/axios.config"

export const listSkus = async (pageNumber: number, pageSize: number) => {
  return await httpClient
    .get<IPagedList<ISku>>(`skus?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((response) => {
      return response.data;
    });
}

export const addSku = async (data: ISkuForm) => {
  return await httpClient
    .post<ISku>("skus", data)
    .then((response) => {
      return response.data;
    });
}

export const editSku = async (id: string, data: ISkuForm) => {
  return await httpClient
    .put<ISku>(`skus/${id}`, data)
    .then((response) => {
      return response.data;
    });
}