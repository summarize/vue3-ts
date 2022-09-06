import Mock from "mockjs";
import { OrderApi } from "@/mock/api/order";

Mock.mock(/\/order\/list/, "get", OrderApi.orderList);