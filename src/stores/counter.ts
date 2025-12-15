import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { onMounted, onUnmounted } from 'vue'


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useEchoDataStore = defineStore('testecho',()=>{

const receivedMessage = ref('')
  onMounted(() => {
    window.Echo.channel('test')
    .subscribed(() => {
      console.log('Subscribed to test channel');
    })
    .listen('.test.event', (e: any) => {
      console.log('EVENT:', e);
      receivedMessage.value = e.message;
    })
    .error((err: any) => {
      console.error('Channel error:', err);
    });
  });

  onUnmounted(() => {
    window.Echo.leave('test')
  })
return {receivedMessage}
})