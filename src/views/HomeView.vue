<template>
  <div class="home">
    <el-container>
      <el-header height="80px" class="header">
        <div>
          <el-row>
            <el-col :span="8">
              <img src="../assets/logo.png" alt="" height="60">
            </el-col>
            <el-col :span="8">
              <h2>后台管理系统</h2>
            </el-col>
            <el-col :span="8" class="username-box">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link username">
                  bethel
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="layout">退出系统</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <!-- <span class="username">bethel</span> -->
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            router
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
          >
            <el-menu-item v-for="item in list" :key="item.path" :index="item.path" :title="item.meta.title">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'HomeView',
  components: { ArrowDown },
  setup () {
    const router = useRouter();
    const list = router.getRoutes().filter(item => item.meta.isMenu);
    // console.log(list);
    const handleCommand = (e:any) => {
      if (e === 'layout') {
        // 退出系统
        localStorage.removeItem('token');
        router.push('login');
        ElMessage({
          type: 'success',
          message: '退出成功'
        });
      }
    }
    return {
      list,
      handleCommand
    }
  }
});
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  :deep(.el-container) {
    height: 100%;
    overflow: hidden;
  }
  :deep(.el-header) {
    background: #545c64;
    h2 {
      height: 100%;
      text-align: center;
      line-height: 60px;
      color: #fff;
    }
    .username {
      color: #fff;
      display: block;
      padding-top: 30px;
      cursor: pointer;
    }
    .username-box {
      text-align: right;
      line-height: 60px;
    }
  }
  .el-aside {
    height: 100%;
    .el-menu {
      height: calc(100vh - 80px);
    }
  }
  .el-main {
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
