import Mock from "mockjs";
// import { randomInteger } from "@/utils/random";
import { successWithData } from "@/mock/data/response";
import { UserData } from "@/mock/data/user";

export const UserApi = {
  userList: (options) => {
    const data = {};
    const response = Mock.mock(successWithData);
    data.userList = Mock.mock(UserData.user);
    response.data = data;
    return response;
  },
  permission: (options) => {
    const data = {};
    const response = Mock.mock(successWithData);
    data.permission = Mock.mock(UserData.permission);
    response.data = data;
    return response;
  },
  auth: (options) => {
    const data = {};
    const response = Mock.mock(successWithData);
    data.auth = Mock.mock(UserData.auth);
    response.data = data;
    return response;
  },
  getRoutes: (options) => {
    const data = {};
    const response = Mock.mock(successWithData);
    data.routes = Mock.mock(UserData.routes);
    response.data = data;
    return response;
  }
}