export function menuDragger(data,currentComponent,containerRef){
    currentComponent = null;
    const dragenter = (e) =>{
        e.dataTransfer.dropEffect = 'move'; //h5拖动的图表
    }
    
    const dragover = (e) =>{
        e.preventDefault();
    }
    
    const dragleave = (e) =>{
        e.dataTransfer.dropEffect = 'none';
    }
    
    const drop = (e) =>{
        
       let blocks =  data.value.blocks;  //内部已近渲染的组件
       console.log('e :>> ', e);
       data.value = {...data.value,blocks:[
           ...blocks,
           {
            top:e.offsetY,
            left:e.offsetX,
            zIndex:1,
            key:currentComponent.key,
            alignCenter:true, //拖动的时候进行一个居中效果;
           }
       ]
       }
    console.log('data.value :>> ', data.value);
    }
    
    const dragstart = (e,component) => {
        //enter   添加移动标识
        containerRef.value.addEventListener('dragenter',dragenter);
        // over   阻止默认事件 否则不能出发drop
        containerRef.value.addEventListener('dragover',dragover);
        // leave 添加禁用标识
        containerRef.value.addEventListener('dragleave',dragleave);
        // drop 在画布上添加一个组件
        containerRef.value.addEventListener('drop',drop);
    
        currentComponent = component;
    }
    
    const dragend = (e) =>{
        containerRef.value.removeEventListener('dragenter',dragenter);
        containerRef.value.removeEventListener('dragover',dragover);
        containerRef.value.removeEventListener('dragleave',dragleave);
        containerRef.value.removeEventListener('drop',drop);
    }

    return {
        dragstart,dragend
    }
}