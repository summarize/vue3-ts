
export interface userListInit {
  id: number,
  userName: string,
  role: roleInit[]
}

export interface roleInit {
  role: number,
  roleName: string
}

interface selectDataInit {
  userName: string,
  role: number
}

interface editRowInit {
  id: number,
  userName: string,
  role: number[]
}

interface permissionInit {
  roleId: number,
  roleName: string,
  auth: number[]
}

export class initData {
  userList:userListInit[] = []
  userListCache: userListInit[] = []
  selectData:selectDataInit = {
    userName: '',
    role: 0
  }
  permission: permissionInit[] = []
  editRow:editRowInit = {
    id: 0,
    userName: '',
    role: []
  }
  isShow = false
}