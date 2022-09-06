<template>
  <div class="select">
    <div class="select-box">
      <el-form :inline="true"
        :model="orderForm" class="demo-form-inline"
      >
        <el-form-item label="order number">
          <el-input v-model="orderForm.number" placeholder="order number" type="number" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchOrder">search</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="select-list">
      <el-table :data="orderList"
        style="width: 100%"
      >
        <el-table-column prop="uuid" label="id" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="explain" label="explain" />
      </el-table>
    </div>
    <div class="select-pagination">
      <el-pagination
        :page-size="10"
        layout="prev, pager, next"
        :total="paginate.account"
        :current-page="paginate.page"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { order } from '@/api/order';
import { useRouter } from 'vue-router';
import { initData } from '../types/order';

export default defineComponent({
  setup () {
    const data = reactive(new initData());
    const router = useRouter();

    // 订单查询
    const searchOrder = () => {
      if (data.orderForm.number) {
        order({ number: data.orderForm.number, limit: 10, page: data.paginate.page }).then(res => {
          data.orderList = res.data.orderList
          data.paginate.account = res.data.paginate.total
          data.paginate.page = res.data.paginate.current_page
        });
      } else {
        data.orderList = [];
        data.paginate.account = 0;
        data.paginate.page = 1;
      }
    }

    // 翻页
    const currentChange = (e: any) => {
      data.paginate.page = e;
      searchOrder();
    }

    return {
      ...toRefs(data),
      searchOrder,
      currentChange
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