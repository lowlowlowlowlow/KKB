/* eslint-disable*/
export default {
  render(h) {
    //获取path对应的component
    const {routeMap, current} = this.$router;
    console.log(routeMap,current);

    //判断是否为router-view
    this.$vnode.data.isView=true;
    //计算路由层级
    let depth=0
    let parent=this.$parent;

    while(parent){
      //$vnode只在真实node未存在之前存在，所以console的话会随着真实node出现而消失，console可以看到类似其生命周期
      const vnodeData=parent.$vnode && parent.$vnode.data
      console.log('vn',vnodeData)
      if(vnodeData){
        if(vnodeData.isView){
          depth++
        }
      }
      parent=parent.$parent
      //console.log(depth)
    }
    
    let component =  null;
    // const component = routeMap[current].component || null;
        //console.log(this.$router.matchedList)
    const thisRoute=this.$router.matchedList[depth]

    if(thisRoute){
      component=thisRoute.component
    }
    return h(component)
  }
}