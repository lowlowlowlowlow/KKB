/* eslint-disable */
export default {
  
  render(h) {
    //获取path对应的component
    const {routeMap, current} = this.$router;
    //console.log(routeMap,current);
    console.log(this.$router)
    //render函数返回一个vnode，所以可以理由this.$vnode获取其内容
    
    this.$vnode.data.isView=true;

    let viewDepth = 0;

    let parent = this.$parent;

    console.log('vnode.data',this.$vnode.data)
    while(parent){
      if(parent.$vnode && parent.$vnode.data){
        if(parent.$vnode.data.isView){
          viewDepth++
        }
      }
      parent=parent.$parent
    }
    
    // const component = routeMap[current].component || null;
    const component =  null;
    const thisRoute=this.$router.matchedList[viewDepth]
    if(thisRoute){
      component=thisRoute.component
    }
    return h(component)
  }
}