import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

export const setupAxiosSandbox = (axios: AxiosInstance) => {
  const mock = new MockAdapter(axios);

  mock.onPost("/login").reply((config) => {
    const payload = JSON.parse(config.data);
    const response = {
      id: "1",
      username: payload["email"],
      email: payload["email"],
      avatarUrl: "https://i.pinimg.com/originals/dc/28/a7/dc28a77f18bfc9aaa51c3f61080edda5.jpg",
      accessToken: "5efb5f8a-212b-4b22-a201-ba2958005342",
    };
    return [200, response]
  });

  mock.onGet(/\/skus\?.*/).reply((config) => {
    const params = new URLSearchParams(config.url?.split('?')[1]);
    const pageNumber = params.get('pageNumber') ? parseInt(params.get('pageNumber')!) : 1;
    const pageSize = params.get('pageSize') ? parseInt(params.get('pageSize')!) : 10;
  
    const totalItems = 50;
    const totalPages = Math.ceil(totalItems / pageSize);
  
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = [...Array(totalItems).keys()].map(i => ({
      id: `SKU${i + 1}`,
      code: `SKU${i + 1}`,
      name: `Product ${i + 1}`,
      price: (Math.random() * 100).toFixed(2),
      stock: (Math.random() * 10).toFixed(0),
    })).slice(startIndex, endIndex);
  
    const response = {
      items: items,
      pageNumber: pageNumber,
      totalPages: totalPages,
      totalCount: totalItems,
      hasPreviousPage: pageNumber > 1,
      hasNextPage: pageNumber < totalPages,
    };
  
    return [200, response];
  });
  
  mock.onPost("/skus").reply((config) => {
    const payload = JSON.parse(config.data);
    const response = {
      id: payload["code"],
      code: payload["code"],
      name: payload["name"],
      price: payload["price"],
      stock: payload["stock"]
    };
    return [200, response]
  })
  
  mock.onPut(/\/skus\/[^/]+/).reply((config) => {
    const payload = JSON.parse(config.data);
    const response = {
      id: payload["code"],
      code: payload["code"],
      name: payload["name"],
      price: payload["price"],
      stock: payload["stock"]
    };
    return [200, response];
  });
};
