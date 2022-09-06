import Mock from "mockjs";

const Random = Mock.Random;

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000,
});

Random.extend({
  uuid: function () {
    return this.guid().toLowerCase().replace(/-/g, "");
  },
  nameId: function () {
    return this.name().toLowerCase().replace(" ", ".");
  },
  sysNumber: function (prefix = "XX") {
    const num = this.integer(1, 9999).toString();
    const fill = num.length < 4 ? "0".repeat(4 - num.length) : "";

    return prefix + this.datetime("yyyyMMddHH") + fill + num;
  },
  serialNumber: function () {
    const num = this.integer(1, 9999).toString();
    const fill = num.length < 4 ? "0".repeat(4 - num.length) : "";

    return this.datetime("yyyyMMddHH") + fill + num;
  },
  currencyCode: function () {
    const codes = [
      "AUD",
      "BRL",
      "CAD",
      "CHF",
      "CNY",
      "DKK",
      "EUR",
      "GBP",
      "HKD",
      "JPY",
      "MXN",
      "MYR",
      "NOK",
      "NZD",
      "PHP",
      "RUB",
      "SEK",
      "SGD",
      "THB",
      "USD",
    ];

    return codes[this.integer(0, codes.length - 1)];
  },
});