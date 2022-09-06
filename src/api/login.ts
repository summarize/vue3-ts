import $http from "@/http";

interface loginData {
  account: string,
  password: string,
}

export const login = (data:loginData) => $http({
  url: "auth/login",
  method: "post",
  data
})