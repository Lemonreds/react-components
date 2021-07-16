import { useRef, useEffect } from 'react';

/**
 * @hook 为了解决在函数组件，如果你使用了addEventListener绑定监听函数，
 * 由于闭包的产生，监听函数内只能取到初次的组件state，而取不到最新组件state。
 *
 * @example
 * const [state,setState] = useState('str')
 * const testFn ()=>{
 *  // state 永远是 'str'
 * }
 * document.addEventListener('test', testFn);
 *
 * @after
 * const [state,setState] = useState('str')
 * const queryRef = useLatestRef(state);
 * const testFn ()=>{
 *  // queryRef.current 是最新值
 * }
 */
const useLatestRef = params => {
  const ref = useRef(params);

  useEffect(() => {
    ref.current = params;
  }, [params]);

  return ref;
};

export default useLatestRef;
