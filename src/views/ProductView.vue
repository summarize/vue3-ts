<template>
  <div>composition api</div>
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
  <div>
    <p>ref:</p>
    <el-button
      type="primary"
      @click="addCount"
      >
      数字增加
    </el-button>
    <p>{{ count }}</p>
  </div>
  <div>
    <p>hooks</p>
    <p v-show="x > -1 && y > -1">用户鼠标坐标：</p>
    <p v-show="x > -1 && y > -1">{{ x }} {{ y }}</p>
  </div>
  <br />
  <div>
    <p>利用ref使输入框自动获取焦点</p>
    <input type="text" ref="inputRef" />
  </div>
  <br />
  <div>
    <p>shallowReactive: {{ s1 }}</p>
    <p>shallowRef: {{ s2 }}</p>
    <el-button
      type="primary"
      @click="update1"
      >
      更新
    </el-button>
  </div>
  <br />
  <div>
    <h2>toRaw markRow</h2>
    <p>{{ s3 }}</p>
    <p>{{ s3.a }}</p>
    <el-button @click="testToRaw">测试toRaw</el-button>
    <el-button @click="testMarkRaw">测试markRaw</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, shallowReactive, shallowRef, toRefs, ref, isReactive, onMounted, toRaw, markRaw } from 'vue';
import { productStore } from '@/pinia/product';
import { initData } from '@/types/product';
// import { mapState, mapActions } from 'pinia'; // pinia 没有mapGetters 与 mapMutations

/* 
  在组件中引入并使用自定义hook
  自定义hook的作用类似于vue2中的mixin技术
  自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂
*/
import mousePosition from '@/hooks/product';

export default defineComponent({
  setup (props, { attrs, slots, emit, expose }) {
    /* reactive: 
          作用: 定义多个数据的响应式
          const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
          响应式转换是“深层的”：会影响对象内部所有嵌套的属性
          内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
          reactive 对象取出的所有属性值都是非响应式的,利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性
    */
    // const data = reactive(new initData()); 
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
    // ref 定义一个响应式数据
    const count = ref(1); // 相当于 const count = reactive({ value: 1});
    const addCount = () => {
      count.value++;
    }

    // ref 获取元素
    const inputRef  = ref<HTMLElement | null>(null);
    onMounted(() => {
      console.log(inputRef);
      inputRef.value && inputRef.value.focus();
    })

    // hooks 
    const {x, y} = mousePosition();

    // shallowReactive 只处理了对象内最外层属性的响应式(也就是浅响应式)
    // shallowRef 只处理了value的响应式, 不进行对象的reactive处理
    const s1 = shallowReactive({ a: 1, b: { c: 2 }});
    const s2 = shallowRef({ a: 1, b: { c: 2 }});
    const update1 = () => {
      s1.a++;
      s1.b.c++;
      s2.value.a++;
      s2.value.b.c++;
      console.log(isReactive(s1), isReactive(s1.a), isReactive(s1.b));
    }

    /* toRaw:
        返回由 reactive 或 readonly 方法转换成响应式代理的普通对象。
        这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新
    */
    /* markRaw: 
        标记一个对象，使其永远不会转换为代理。返回对象本身。
    */
    const s3 = reactive<any>({ a: 1, b: { c: 1 }});
    const testToRaw = () => {
      const s3r = toRaw(s3);
      s3r.a++;
    }
    const testMarkRaw = () => {
      const s3m = markRaw(s3);
      s3m.a++;
    }

    /*
    toRefs:
        将响应式对象中所有属性包装为ref对象, 并返回包含这些ref对象的普通对象
        应用: 当从合成函数返回响应式对象时，toRefs 非常有用，
        这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用
        (reactive的响应式功能是赋值给对象，如果展开对象，会让属性丢失响应能力。
        toRefs可以保证对象展开的所有属性都是响应式的)
    */
    return {
      // ...toRefs(data),
      store,
      increment,
      randomCounter,
      initCounter,
      count,
      addCount,
      inputRef,
      x,
      y,
      s1,
      s2,
      update1,
      s3,
      testToRaw,
      testMarkRaw
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
