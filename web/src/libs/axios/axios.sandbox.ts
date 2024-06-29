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
};
