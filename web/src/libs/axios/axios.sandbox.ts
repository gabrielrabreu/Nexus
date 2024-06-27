import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

const setupAxiosSandbox = (axios: AxiosInstance) => {
  const mock = new MockAdapter(axios);

  mock.onPost("/login").reply(200, {
    id: "1",
    username: "John Doe",
    email: "johndoe@gmail.com",
    avatarUrl: "https://i.pinimg.com/originals/dc/28/a7/dc28a77f18bfc9aaa51c3f61080edda5.jpg",
    accessToken: "5efb5f8a-212b-4b22-a201-ba2958005342",
    darkMode: true,
  });
  
  mock.onPost("/sku").reply(200, {
    id: 999,
    code: "13213",
    name: "nnn",
    price: 2,
    stock: 1
  });
  
  mock.onPut("/sku/12313").reply(200, {
    id: "12313",
    code: "12jk",
    name: "nameejk",
    price: 1233.5,
    stock: 1210,
  });
};

export default setupAxiosSandbox;
