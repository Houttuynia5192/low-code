export function moveBlock(focusData){
    let dragState ={
        startX:0,
        startY:0
    }

    const mousedown = (e) => {
        console.log('mousedown :>> ', mousedown);
        dragState = {
            startX:e.clientX,
            startY:e.clientY,  //记录每个block的原始位置 
            startPos:focusData.value.focus.map(({left,top}) => ({left,top}))
        }
        document.addEventListener('mousemove',mousemove);
        document.addEventListener('mouseup',mouseup);
    }

    //最好做个move的防抖
    const mousemove = (e) => {
        console.log('mousemove :>> ', mousemove);
        let { clientX:moveX,clientY:moveY } = e
            let durX = moveX - dragState.startX;
            let durY = moveY - dragState.startY;
            focusData.value.focus.forEach((block,idx) => {
                block.top = dragState.startPos[idx].top + durY;
                block.left = dragState.startPos[idx].left + durX;
            });

    }
    
    const mouseup = (e) => {
        console.log('mouseup :>> ', mouseup);
        document.removeEventListener('mousemove',mousemove);
        document.removeEventListener('mouseup',mouseup);
    }

    return {mousedown}
}