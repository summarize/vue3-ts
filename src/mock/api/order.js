import Mock from "mockjs";
import { randomInteger } from "@/utils/random";
import { getPaginate } from "@/mock/data/paginate";
import { successWithData } from "@/mock/data/response";
import { OrderData } from "@/mock/data/order";

export const OrderApi = {
  orderList: (options) => {
    const data = {};
    const response = Mock.mock(successWithData);
    let num = randomInteger(0, 100);
    data.orderList = Mock.mock(OrderData.orderList(10)).orderList;
    response.data = data;
    const paginate = getPaginate(options.body, options.url);
    if (paginate !== null) {
      num = paginate.to - paginate.from + 1;
      data.paginate = paginate;
    }
    return response;
  },
}