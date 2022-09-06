<template>
  <div class="select">
    <div class="select-box">
      <el-form :inline="true"
        :model="selectData" class="demo-form-inline"
      >
        <el-form-item label="username">
          <el-input v-model="selectData.userName" placeholder="username" />
        </el-form-item>
        <el-form-item label="role">
          <el-select
            v-model="selectData.role"
          >
            <el-option
              label="全部"
              :value="0"
            />
            <el-option
              v-for="item in permission"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchUser">search</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="select-list">
      <el-table :data="userList"
        style="width: 100%"
      >
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="userName" label="userName" width="180" />
        <el-table-column prop="role" label="role">
          <template #default="scope">
            <el-button
              link
              v-for="item in scope.row.role"
              :key="item.role"
              type="text"
              size="small"
            >
              {{ item.roleName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="edit(scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!--编辑弹窗-->
    <el-dialog
      title="编辑用户"
      v-model="isShow"
    >
      <el-form :inline="true"
        :model="editRow" class="demo-form-inline"
      >
        <el-form-item label="username">
          <el-input v-model="editRow.userName" placeholder="username" />
        </el-form-item>
        <el-form-item label="role">
          <el-select
            v-model="editRow.role"
            multiple
          >
            <el-option
              v-for="item in permission"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer> <!-- #footer 是 v-slot:footer 的缩写 -->
        <el-button @click="isShow = false">取消</el-button>
        <el-button @click="sureEdit" type="primary">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { userList, permission } from '@/api/user';
import { useRouter } from 'vue-router';
import { initData, userListInit, roleInit } from '../types/user';

export default defineComponent({
  setup () {
    const data = reactive(new initData());
    const router = useRouter();

    // 初始数据加载
    onMounted(() => {
      userList().then((res:any) => {
        // console.log('user', res);
        data.userList = res.data.userList;
        // 缓存数据
        data.userListCache = res.data.userList;
      });
      permission().then((res:any) => {
        // console.log('permission', res);
        data.permission = res.data.permission;
      })
    });

    // 搜索用户
    const searchUser = () => {
      let arr:userListInit[] = [];
      // 同时不存在时直接赋值缓存数据
      if (!data.selectData.userName && !data.selectData.role) {
        data.userList = data.userListCache;
        return;
      }
      // 筛选用户名
      if (data.selectData.userName) {
        arr = data.userListCache.filter((i:any) => i.userName.indexOf(data.selectData.userName) >= 0);
      }
      // 在筛选用户名的数据基础上筛选role
      if(data.selectData.role) {
        arr = (data.selectData.userName ? arr : data.userListCache).filter((i:any) => i.role.find((i1:any) => i1.role === data.selectData.role));
      }
      data.userList = arr;
    }

    // 编辑用户
    const edit = (row:userListInit) => {
      data.editRow = {
        id: row.id,
        userName: row.userName,
        role: row.role.map((i:any) => i.role)
      }
      data.isShow = true;
    }

    // 确定编辑
    const sureEdit = () => {
      let target:any = data.userList.find((i:any) => i.id === data.editRow.id);
      let targetCache:any = data.userListCache.find((i:any) => i.id === data.editRow.id);
      target.userName = data.editRow.userName;
      targetCache.userName = data.editRow.userName;
      let role:roleInit[] = [];
      data.permission.forEach((i:any) => {
        if (data.editRow.role.indexOf(i.roleId) >= 0) {
          role.push({ role: i.roleId, roleName: i.roleName })
        }
      });
      target.role = role;
      targetCache.role = role;

      data.isShow = false;
    }

    return {
      ...toRefs(data),
      searchUser,
      edit,
      sureEdit
    }
  }
})
</script>
<style lang="less" scoped>
.select {
  display: flex;
  flex-direction: column;
  height: 100%;
  .select-list {
    flex: 1;
    overflow-y: scroll;
  }
}
</style>