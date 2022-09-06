import Mock from "mockjs";
import { AuthApi } from "@/mock/api/login";

Mock.mock(/\/auth\/login/, "post", AuthApi.login);
Mock.mock(/\/auth\/register/, "post", AuthApi.register);
Mock.mock(/\/auth\/oauth\/token/, "post", AuthApi.token);
Mock.mock(/\/auth\/logout/, "get", AuthApi.logout);
Mock.mock(/\/auth\/password\/reset/, "post", AuthApi.reset);
Mock.mock(/\/auth\/password\/email/, "post", AuthApi.email);