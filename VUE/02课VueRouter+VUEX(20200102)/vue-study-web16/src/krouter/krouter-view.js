/* eslint-disable*/
export default {
  render(h) {
    //获取path对应的component
    const {routeMap, current} = this.$router;
    console.log(routeMap,current);

    this.$vnode.data.isView=true;

    let depth=0
    let parent=this.$parent;

    while(parent){
      const vnodeData=parent.$vnode && parent.$vnode.data
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