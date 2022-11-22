import deepcopy from "deepcopy";
import { overlayEmits } from "element-plus";
import { computed, defineComponent, inject,ref } from "vue";
import EditorBlock from './editor-block'
import {menuDragger} from './menuDragger'
import { moveBlock } from "./moveBlock";
import { selectedBlock } from "./selectedBlocks";



export default defineComponent({
    props: {
        modelValue:{ type:Object } 
    },
    emits:['update:modelValue'],  
    setup(props,ctx){
        const data = computed({
            get(){
                return props.modelValue
            },
            set(newValue){
                return ctx.emit('update:modelValue',deepcopy(newValue))
            }
        });
        console.log('1111data.value :>> ', data);

        const containerStyle = computed(() => ({
            width:data.value.container.width + 'px',
            height:data.value.container.height + 'px'
        }))


        const config = inject('config')

        const containerRef = ref(null)
        let currentComponent = null;

        // 1.实现菜单的拖拽功能
        const {dragstart,dragend} = menuDragger(data,currentComponent,containerRef)
        // 2.获取元素的焦点
        const {focusData,blockMouseDown,containerMouseDown} = selectedBlock(data,(e) => {
            console.log('focusData.value.focus :>> ', focusData.value.focus);
            mousedown(e)
        })
        // 3.实现多个元素的拖拽
        const {mousedown} = moveBlock(focusData)
        

        return () => <div class="editor">
            <div className="editor-left">
                {/* 根据注册列表 渲染对应的内容 可以实现H5的拖拽 */}
                {config.componentList.map((component) => (
                    <div className="editor-left-item"
                        draggable
                        onDragstart={e => dragstart(e,component) }
                        onDragend ={dragend}
                    >
                        <span>{component.label}</span>
                        <div className="preview">
                            {component.preview()}
                        </div>
                    </div>
                ))}
            </div>
            <div className="editor-top">菜单栏</div>
            <div className="editor-right">属性控制栏</div>
            <div className="editor-container">
                {/* 负责产生滚动条 */}
                <div className="content-wrapper">
                    {/* 产生内容区域 */}
                    <div className="content" 
                    style={containerStyle.value} 
                    ref={containerRef}
                    onMousedown={containerMouseDown}
                    >
                        {
                            (data.value.blocks.map(block =>(
                                <EditorBlock 
                                    class={block.focus ? 'editor-block-focus':''}
                                    block={block}
                                    onMousedown={(e) => blockMouseDown(e,block)}
                                ></EditorBlock>
                            )))
                        }
                    </div>
                </div>
            </div>
        </div>
    }
})
