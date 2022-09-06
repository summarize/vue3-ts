<template>
  <div>
    <el-tree
      show-checkbox
      node-key="roleId"
      ref="tree"
      :data="list"
      :props="{
        children: 'roleList',
        label: 'name'
      }"
      :default-checked-keys="auth"
      :check-strictly="true"
      @check-change="checkChange"
      class="mb10"
    />
    <div>
      <el-button
        link
        type="primary"
        @click.prevent="sure"
      >
        确认修改
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { initData } from '@/types/auth';
import { auth } from '@/api/user';
import { ElMessage } from 'element-plus';

export default defineComponent({
  setup () {
    // route 是跳转的路由对象，是一个局部的对象，可以得到跳转的路由的信息，例如params,query,path,router,name, matched 等；
    // router 是全局路由的实例对象，包含了所有路由包含的关键对象及属性，提供了一些方法可以操作页面跳转等。
    const route = useRoute();
    const router = useRouter();
    // const params = route.params; // 刷新页面无法保存参数

    const query:any = route.query;

    const data = reactive(new initData(query.roleName, query.roleId, query.auth.split(',').map((i:any) => +i)));

    // 初始化数据
    onMounted(() => {
      auth().then(res => {
        data.list = res.data.auth
      })
    });

    // 点击节点
    const checkChange = (e:any) => {
      console.log(data.tree.getCheckedKeys());
    }

    // 确认修改
    const sure = () => {

      router.push({
        name: 'role',
        params: {
          roleId: data.roleId,
          auth: data.tree.getCheckedKeys()
        }
      });
      ElMessage({
        type: 'success',
        message: '修改成功'
      });
    }
    
    return {
      ...toRefs(data),
      checkChange,
      sure
    }
  }
})
</script>
