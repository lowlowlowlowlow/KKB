import React, { useState, useEffect, useMemo } from "react";

export default function UseMemoPage(props) {
  const [count, setCount] = useState(0);

  /* 没有使用useMemo时
  const expensive = () => {
    console.log("compute");
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
    //只有count改变的时候，当前函数才会重新执行
  };

  下面<p>expensive: {expensive()}</p>
  的时候，则value的变化每次都会
  触发expensive执行（重新渲染，因为在同一个function中），而
  实际上是setCount触发后count改变才需要触发expensive
  则需要使用useMemo
  */


  //当前的计算只和count有关
  const expensive = useMemo(() => {
    console.log("compute");
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
    //只有count改变的时候，当前函数才会重新执行
  }, [count]);

  const [value, setValue] = useState("");

  return (
    <div>
      <h3>UseMemoPage</h3>
      <p>count: {count}</p>
      <p>expensive: {expensive}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <input value={value} onChange={event => setValue(event.target.value)} />
    </div>
  );
}
