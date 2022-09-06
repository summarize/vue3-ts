import Mock from "mockjs";
import { UserApi } from "@/mock/api/user";

Mock.mock(/\/user\/list/, "get", UserApi.userList);
Mock.mock(/\/permission\/list/, "get", UserApi.permission);
Mock.mock(/\/auth\/list/, "get", UserApi.auth);
Mock.mock(/\/routes\/list/, "get", UserApi.getRoutes)