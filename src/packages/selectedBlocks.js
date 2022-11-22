import {computed} from 'vue';

export function selectedBlock(data,callback) {
    // 获取选中和未选中的block数量
    const focusData = computed(() => {
        let focus =[]
        let unfocus =[]
        data.value.blocks.forEach(block => (block.focus ? focus:unfocus).push(block))
            return{focus,unfocus}
       })

    const clearBlcokFocus = () =>{
        data.value.blocks.forEach(block => block.focus = false) //清除focus
    }

    const containerMouseDown = () =>{
        clearBlcokFocus() //点击画布清除focus属性
    }

    const blockMouseDown = (e,block) =>{
        e.preventDefault();
        e.stopPropagation()
       if(e.shiftKey) {
            block.value.focus.length <= 1?block.foucs = true:block.focus = !block.focus       
       }else{
            if(!block.focus){
                clearBlcokFocus()
                block.focus = true
            }else{
                block.focus = false
            }
       }
       callback(e)
   }

   return {focusData,blockMouseDown,containerMouseDown}
}