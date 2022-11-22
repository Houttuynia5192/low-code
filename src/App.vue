<template>
  <div class="app"> 
    <Editor v-model="state"></Editor>
  </div>
</template>
<script>
  import { ref,provide } from 'vue';
  import data from './data.json'
  import Editor from './packages/editor'
  import { registerConfig } from './until/editor-config';

  export default {
    components:{
      Editor
    },
    setup(){
        const state = ref(data);

        provide('config',registerConfig)

        return {
          state
        }
    }
  }
</script>

<style scoped lang="scss">

</style>
