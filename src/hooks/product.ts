import { ref, onMounted, onUnmounted } from 'vue';

/* 收集用户鼠标点击的坐标 */

export default function mousePosition () {
  const x = ref(-1);
  const y = ref(-1);

  // 用户点击收集坐标
  const updatePosition = (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  // 挂载后绑定监听
  onMounted(() => {
    document.addEventListener('click', updatePosition);
  });

  // 卸载后取消监听
  onUnmounted(() => {
    document.removeEventListener('click', updatePosition);
  });

  return {
    x,
    y
  }
}