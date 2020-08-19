import { useState, useEffect } from 'React';
import useBoolean from './useBoolean';

const defaultPagination = { pageNum: 1, pageSize: 10 };

const shallowEquals = (obj1, obj2) => {
  if (obj1 == null || obj2 == null) {
    if (obj1 == null && obj2 == null) return true;
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length === keys2.length) {
    for (let i = 0; i < keys1.length; i += 1) {
      const key = keys1[i];
      if (obj1[key] !== obj2[key]) return false;
    }
    return true;
  }
  return false;
};

/**
 *
 * @hooks useTable
 * @desc 统一管理antd Table组件的状态
 * @at 2020/08/09
 * @by lmh
 *
 */
const useTable = (
  services,
  initQuery = undefined,
  initialPagination = defaultPagination,
) => {
  const [loading, { setTrue, setFalse }] = useBoolean(false);
  const [query, setQuery] = useState(initQuery);
  const [pagination, setPagination] = useState(initialPagination);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const get = () => {
    setTrue();
    services({ ...pagination, ...query })
      .then(resp => {
        if (resp.errCode === 0) {
          setTotalCount(resp.totalCount);
          setData(resp.data);
        }
      })
      .finally(() => setFalse());
  };

  useEffect(() => {
    get();
  }, [pagination]);

  // 不使用 Pagination 组件的 onShowSizeChange (antd 4.5.4)
  // ref https://github.com/ant-design/ant-design/issues/25434
  const onChange = (pageNum, pageSize) => setPagination({ pageNum, pageSize });

  const updateQuery = newQuery => {
    if (!shallowEquals(newQuery, query)) {
      setQuery(newQuery);
      setPagination({ ...pagination, pageNum: 1 });
    }
  };

  return [
    { data, loading, totalCount, pagination },
    { onChange, updateQuery },
  ];
};

export default useTable;
