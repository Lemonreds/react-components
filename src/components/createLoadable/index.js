import React, { useState, useEffect } from 'react';

// loader组件，控制动态引入的状态
function Loader({ loader, loading, delay, loadedComponentProps }) {
  // import进来的模块内容
  const [loaded, setLoaded] = useState(null);
  // err引入发生的错误,isLoading是否正在加载中
  const [err, setErr] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const load = () => {
    loader()
      .then(_loaded => {
        // log =>{__esModule: true, Symbol(Symbol.toStringTag): "Module", default: ƒ}
        setLoaded(_loaded);
      })
      .catch(_err => {
        setErr(_err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    let h = null;
    if (delay) {
      h = setTimeout(load, delay);
    } else {
      load();
    }
    return () => {
      clearTimeout(h);
    };
  }, []);

  // 加载中或者错误
  // 返回占位符组件
  if (isLoading || err) {
    return React.createElement(loading, { isLoading, err });
  }

  // 加载成功
  // 返回加载成功后的组件
  if (loaded) {
    const loadedComponent =
      loaded && loaded.__esModule ? loaded.default : loaded;

    return React.createElement(loadedComponent, loadedComponentProps);
  }

  return null;
}

// 默认的占位符组件
const DefaultLoading = ({ loading, error }) => {
  // 组件正在异步加载的时候
  if (loading) return <div>Loading</div>;
  // 组件加载发生了错误的时候
  if (error) return <div>Unknown error occurred</div>;
  return null;
};

/**
 * @method createLoadable
 * @desc 通过import动态导入的语法，返回一个React组件，在合适的时机展示loading与err以及异步加载组件的内容
 * @param {loadr|fn}  () => import('./DynamicTest') 动态引入
 * @param {loading|component}  占位符组件，会被注入isLoading、err的props
 * @param {delay|ms}  延迟加载的时间
 * */
const createLoadable = ({ loader, loading = DefaultLoading, delay = 0 }) => {
  return props =>
    React.createElement(Loader, {
      loader,
      loading,
      delay,
      loadedComponentProps: props,
    });
};

export default createLoadable;
