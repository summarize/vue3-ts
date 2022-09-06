export const UserData = {
  user: [
    {
      id: 1,
      userName: "bethel",
      role: [
        {
          role: 1,
          roleName: "超级管理员"
        },
        {
          role: 2,
          roleName: "管理员"
        },
      ]
    },
    {
      id: 2,
      userName: "tom",
      role: [
        {
          role: 2,
          roleName: "管理员"
        },
        {
          role: 3,
          roleName: "业务员"
        },
      ]
    },
    {
      id: 3,
      userName: "luck",
      role: [
        {
          role: 2,
          roleName: "管理员"
        }
      ]
    },
    {
      id: 4,
      userName: "bob",
      role: [
        {
          role: 3,
          roleName: "业务员"
        },
      ]
    },
    {
      id: 5,
      userName: "davi",
      role: [
        {
          role: 4,
          roleName: "客服"
        },
      ]
    }
  ],
  permission: [
    {
      roleName: "超级管理员",
      roleId: 1,
      auth: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
      roleName: "管理员",
      roleId: 2,
      auth: [1, 2, 3, 4, 5, 6]
    },
    {
      roleName: "业务员",
      roleId: 3,
      auth: [1, 2, 3]
    },
    {
      roleName: "客服",
      roleId: 4,
      auth: [1, 2, 4]
    },
    {
      roleName: "财务",
      roleId: 5,
      auth: [1, 2, 3, 4, 5]
    }
  ],
  auth: [
    {
      name: "订单列表",
      roleId: 1,
      viewRole: "",
      roleList: [
        {
          name: "订单列表详情",
          roleId: 4,
          viewRole: "",
          roleList: [
            {
              name: "审核",
              roleId: 5
            }
          ]
        },
        {
          name: "查看",
          roleId: 2
        },
        {
          name: "删除",
          roleId: 3
        }
      ]
    },
    {
      name: "商品列表",
      roleId: 6,
      viewRole: "",
      roleList: [
        {
          name: "商品详情",
          roleId: 9,
          viewRole: "",
          roleList: [
            {
              name: "修改",
              roleId: 10
            }
          ]
        },
        {
          name: "查看",
          roleId: 7
        },
        {
          name: "删除",
          roleId: 8
        }
      ]
    },
    {
      name: "用户列表",
      roleId: 11,
      viewRole: "",
      roleList: [
        {
          name: "用户详情",
          roleId: 14,
          viewRole: "",
          roleList: [
            {
              name: "修改",
              roleId: 15
            }
          ]
        },
        {
          name: "查看",
          roleId: 12
        },
        {
          name: "删除",
          roleId: 13
        }
      ]
    }
  ],
  routes: [
    {
      path: '/order',
      name: 'order',
      view: 'OrderView',
      meta: {
        isMenu: true,
        title: "订单列表",
        icon: 'el-icon-document-copy'
      }
    },
    {
      path: '/product',
      name: 'product',
      view: 'ProductView',
      meta: {
        isMenu: true,
        title: "商品列表",
        icon: 'el-icon-document-copy'
      }
    },
    {
      path: '/user',
      name: 'user',
      view: 'UserView',
      meta: {
        isMenu: true,
        title: "用户列表",
        icon: 'el-icon-user-solid'
      }
    },
    {
      path: '/role',
      name: 'role',
      view: 'RoleView',
      meta: {
        isMenu: true,
        title: "角色列表",
        icon: 'el-icon-s-custom'
      }
    },
    {
      path: '/auth',
      name: 'auth',
      view: 'AuthView',
      meta: {
        isMenu: false,
        title: "权限列表",
        icon: 'el-icon-view'
      }
    }
  ]
}