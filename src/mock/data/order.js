export const OrderData = {
  order: {
    uuid: "@uuid",
    name: "@cword(2,8)",
    category_uuid: "@uuid",
    explain: "@cword(10,50)",
  },
  orderList: (n = 100) => {
    const mockData = {};
    const key = "orderList|" + n;
    mockData[key] = [OrderData.order];
    return mockData;
  },
}