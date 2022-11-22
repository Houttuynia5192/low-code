<template>
    <div>
      <p>
        {{num}}
      </p>
      <button class="yyds" @click="add" ref='op' id="@@">按钮</button>
      <button @click="num--">按钮</button>
    </div>
    
  </template>
  <script>
    import { ref,defineComponent,onMounted } from 'vue'
  
    
    export default defineComponent({
      setup(){
        let num = ref(20)
        
        const add = () => {
          num.value++
        }

        let op = ref(null)

        onMounted(() => {
          
          console.log(op.value.innerText);
        })
          return {
            num,
            add,
            op
          }
  
      }
    })
  </script>
  
  <style scoped lang="scss">
  
  </style>
  