import { ElButton,ElInput } from 'element-plus';
import data from '../data.json'


// componentMap为组件和实例之间的映射关系
function createEditorConfig(){
    const componentList = [];
    const componentMap = {}

    return {
        componentList,
        componentMap,
        register:(component) => {
            componentList.push(component);
            componentMap[component.key] = component;
        }
    }
}
export let registerConfig = createEditorConfig()
const block = data.blocks

console.log('registerConfig :>> ', registerConfig);

registerConfig.register({
    label:'预览',
    preview:()=>'预览',
    render:()=>'渲染内容',
    key:'text'
})

registerConfig.register({
    label:' 按钮',
    preview:()=><ElButton>预览按钮</ElButton>,
    render:()=><ElButton>渲染按钮</ElButton>,
    key:'button'
})

registerConfig.register({
    label:' 输入框',
    preview:()=><ElInput placeholder='预览输入框'></ElInput>,
    render:()=><ElInput placeholder='渲染输入框'></ElInput>,
    key:'input'
})