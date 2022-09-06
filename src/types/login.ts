import type { FormInstance } from "element-plus";
import { ref } from "vue";

export interface loginFormInit {
  account: string,
  password: string,
}

export class initData {
  loginForm: loginFormInit = {
    account: '',
    password: ''
  }
  loginFormRef = ref<FormInstance>()
}
// ref和reactive一样,也是用来实现响应式数据的方法
// 由于reactive必须传递一个对象,所以在实际开发中如果只是想让某个变量实现响应式的时候回非常麻烦
// 所以Vue3提供了ref方法实现简单值得监听
// ref 的底层还是reactive