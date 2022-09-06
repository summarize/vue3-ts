import $http from "@/http";

interface orderData {
  number: number | string,
  limit: number,
  page: number
}

export const order = (data: orderData) => $http({
  url: "order/list",
  method: "get",
  data
})