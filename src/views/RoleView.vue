<template>
  <div class="select">
    <div class="select-box">
      <el-button
        link
        type="primary"
        @click.prevent="addRole"
      >
        添加角色
      </el-button>
    </div>
    <div class="select-list">
      <el-table :data="permission"
        style="width: 100%"
      >
        <el-table-column prop="roleId" label="roleId" width="180" />
        <el-table-column prop="roleName" label="roleName" width="180" />
        <el-table-column prop="auth" label="auth">
          <template #default="scope">
            <el-button
              link
              v-for="item in scope.row.auth"
              :key="item"
              type="text"
              size="small"
            >
              {{ item }}
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
              编辑权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!--添加角色弹窗-->
    <el-dialog
      title="添加角色"
      v-model="isAdd"
    >
      <div class="mb10">请输入角色名：</div>
      <el-input v-model="roleName" placeholder="rolename" />
      <template v-slot:footer>
        <el-button @click="isAdd = false">取消</el-button>
        <el-button @click="sureAdd" type="primary">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { permission } from '@/api/user';
import { initData, permissionInit } from '@/types/role';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup () {
    const data = reactive(new initData());
    const router = useRouter();

    // 初始化
    onMounted(() => {
      permission().then((res) => {
        data.permission = res.data.permission;
      });
    });

    // 添加角色
    const addRole = () => {
      data.roleName = '';
      data.isAdd = true;
    }

    // 确认添加角色
    const sureAdd = () => {
      const role:permissionInit = {
        roleId: data.permission.length + 1,
        roleName: data.roleName,
        auth: []
      };
      data.permission.push(role);
      data.isAdd = false;
      ElMessage({
        type: "success",
        message: '新增成功'
      });
    }

    // 编辑权限
    const edit = (row: permissionInit) => {
      // console.log('编辑权限', row);
      router.push({
        'name': 'auth',
        query: {
          roleId: row.roleId,
          roleName: row.roleName,
          auth: row.auth.join(',')
        }
        /* params: {
          roleId: row.roleId,
          roleName: row.roleName,
          auth: row.auth
        } */
      });
    }
    return {
      ...toRefs(data),
      addRole,
      sureAdd,
      edit
    }
  }
})
</script>

<style lang="less" scoped>
.select {
  display: flex;
  flex-direction: column;
  height: 100%;
  .select-box {
    margin-bottom: 20px;
  }
  .select-list {
    flex: 1;
    overflow-y: scroll;
  }
}
</style>
