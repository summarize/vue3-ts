export interface permissionInit {
  roleId: number,
  roleName: string,
  auth: number[]
}


export class initData {
  permission: permissionInit[] = []
  isAdd = false
  roleName: string = ''
}