import { defineStore } from "pinia";

export const productStore = defineStore('product', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2
  },
  actions: {
    increment () {
      this.counter++
    },
    randomCounter () {
      this.counter = Math.round(Math.random() * 100);
    },
    initCounter () {
      this.counter = 0;
    }
  }
})