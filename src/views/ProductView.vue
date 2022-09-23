<template>
  <div>商品列表</div>
  <div>
    <el-button
      type="primary"
      @click="increment"
      >
      数字增加
    </el-button>
    <el-button
      type="primary"
      @click="randomCounter"
      >
      数字随机
    </el-button>
    <el-button
      type="primary"
      @click="initCounter"
      >
      数字清零
    </el-button>
  </div>
  <div>
    {{ store.counter }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { productStore } from '@/pinia/product';
import { initData } from '@/types/product';
// import { mapState, mapActions } from 'pinia'; // pinia 没有mapGetters 与 mapMutations

export default defineComponent({
  setup () {
    const data = reactive(new initData()); 
    const store = productStore();
    const increment = () => {
      store.increment();
    }
    const randomCounter = () => {
      store.randomCounter();
    }
    const initCounter = () => {
      store.initCounter();
    }
    return {
      ...toRefs(data),
      store,
      increment,
      randomCounter,
      initCounter
    }
  },
  /* computed: {
    ...mapState(productStore, ['counter', 'doubleCounter'])
  },
  methods: {
    ...mapActions(productStore, ['increment', 'randomCounter', 'initCounter'])
  } */
})
</script>
