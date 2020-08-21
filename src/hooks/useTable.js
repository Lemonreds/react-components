import { useState, useEffect } from 'react';
import useBoolean from './useBoolean';
import { shallowEquals } from './utils';

const defaultPagination = { pageNum: 1, pageSize: 10 };

const handleResp = (resp) => {
  const { errCode, totalCount, data /** ...rest */ } = resp;
  return errCode === 0 ? { totalCount, data } : { totalCount: 0, data: [] };
};

/**
 *
 * @hook useTable
 * @desc 统一管理antd Table组件的状态
 * @at 2020/08/09
 * @by lmh
 *
 */
const useTable = (services, initQuery = undefined, initialPagination = defaultPagination) => {
  const [loading, { setTrue, setFalse }] = useBoolean(false);
  const [query, setQuery] = useState(initQuery);
  const [pagination, setPagination] = useState(initialPagination);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const get = () => {
    setTrue();
    services({ ...pagination, ...query })
      .then((resp) => {
        const results = handleResp(resp);
        setTotal(results.totalCount);
        setData(results.data);
      })
      .finally(setFalse);
  };

  useEffect(() => {
    get();
  }, [pagination]);

  // 不使用 Pagination 组件的 onShowSizeChange (antd 4.5.4)
  // ref https://github.com/ant-design/ant-design/issues/25434
  const onChange = (pageNum, pageSize) => setPagination({ pageNum, pageSize });

  const updateQuery = (newQuery) => {
    if (!shallowEquals(newQuery, query)) {
      setQuery(newQuery);
      setPagination({ ...pagination, pageNum: 1 });
    }
  };

  return [
    { data, loading, total, pagination },
    { onChange, updateQuery },
  ];
};

export default useTable;
