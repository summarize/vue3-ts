import type { FormInstance } from "element-plus";
import { ref } from 'vue';

export interface order {
  number: number | string
}

interface orderListInit {
  uuid: string,
  name: string,
  explain: string,
  category_uuid: string
}

interface paginateInit {
  account: number,
  page: number
}

export class initData {
  orderForm: order = {
    number: '',
  }
  orderList: orderListInit[] = []
  paginate: paginateInit = {
    account: 0,
    page: 1
  }
  orderFormRef = ref<FormInstance>()
}