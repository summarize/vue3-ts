import Mock from "mockjs";
import {
  success,
  successWithData,
  successWithMessage,
} from "@/mock/data/response";
import { AuthData } from "@/mock/data/login";

export const AuthApi = {
  login: () => {
    const response = Mock.mock(successWithData);
    response.data = Mock.mock(AuthData.login);
    return response;
  },
  register: () => {
    const response = Mock.mock(success);
    return response;
  },
  token: () => {
    const response = Mock.mock(successWithData);
    response.data = Mock.mock(AuthData.token);
    return response;
  },
  logout: () => {
    const response = Mock.mock(success);
    return Mock.mock(response);
  },
  reset: () => {
    const response = Mock.mock(successWithMessage);
    return response;
  },
  email: () => {
    const response = Mock.mock(successWithMessage);
    return response;
  },
};