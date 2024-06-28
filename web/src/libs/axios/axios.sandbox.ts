import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

const setupAxiosSandbox = (axios: AxiosInstance) => {
  const mock = new MockAdapter(axios);

  mock.onPost("/login").reply((config) => {
    const payload = JSON.parse(config.data);
    const response = {
      id: "1",
      username: payload["email"],
      email: payload["email"],
      avatarUrl: "https://i.pinimg.com/originals/dc/28/a7/dc28a77f18bfc9aaa51c3f61080edda5.jpg",
      accessToken: "5efb5f8a-212b-4b22-a201-ba2958005342",
      darkMode: false,
    };
    return [200, response]
  })

  mock.onGet(/\/skus\?.*/).reply(() => {
    const response = {
      items: [
        {
          id: "SKU001",
          code: "SKU001",
          name: "Product A",
          price: 29.99,
          stock: 150
        },
        {
          id: "SKU002",
          code: "SKU002",
          name: "Product B",
          price: 49.99,
          stock: 200
        },
        {
          id: "SKU003",
          code: "SKU003",
          name: "Product C",
          price: 19.99,
          stock: 300
        }
    ]};
    
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

export default setupAxiosSandbox;
