import { computed, defineComponent, inject, onMounted,ref } from "vue";
import { ElButton } from "element-plus";

export default defineComponent({
    props:{
        block:{type:Object}
    },
    setup(props){
        const blockStyle = computed(() => ({
            top:`${props.block.top}px`,
            left:`${props.block.left}px`,
            zIndex:`${props.block.zIndex}`
        }))

        const config = inject('config');

        const blockRef = ref(null)
        onMounted(() => {
           let {offsetWidth,offsetHeight} = blockRef.value;
           if (props.block.alignCenter){ //仅在拖拽放下后居中
                props.block.left = props.block.left - offsetWidth / 2;
                props.block.top = props.block.top - offsetHeight / 2;  //原则上重新派发事件
                props.block.alignCenter = false;
           }
        })

        return () =>{
            // 通过block的type属性直接获取对应的组件
            const component = config.componentMap[props.block.key];
            // 获取render函数
            const RenderComponent = component.render();
            return <div class='editor-block' style={blockStyle.value} ref={blockRef}>
                {RenderComponent}
            </div>
            
        }
    }

})