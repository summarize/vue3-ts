export interface listInit {
  name: string,
  roleId: number,
  viewRole?: string,
  roleList?: listInit []
}

export class initData {
  roleName: string
  roleId: number
  auth: number[]
  list: listInit[] = []
  tree: any
  constructor(roleName:string, roleId: number, auth:number[]) {
    this.roleName = roleName
    this.roleId = roleId
    this.auth = auth
  }
}