import $http from '@/http';

export const userList = () => $http({
  url: "/user/list",
  method: "get"
});

export const permission = () => $http({
  url: "/permission/list",
  method: "get"
});

export const auth = () => $http({
  url: "/auth/list",
  method: "get"
});

export const getRoutes = () => $http({
  url: "/routes/list",
  method: "get"
});