import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Space from 'components/Space';
import Button from 'components/Form/Button';
import useTable from 'hooks/useTable';
import delay from 'utils/delay';

const Columns = ['key', 'name', 'age', 'address'];
const getRandom = () =>
  Math.random()
    .toString(16)
    .slice(2);

const serivces = () =>
  delay(() => {
    return {
      errCode: 0,
      data: [
        {
          key: getRandom(),
          name: '胡彦祖',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: getRandom(),
          name: '胡彦祖',
          age: 18,
          address: '西湖区湖底公园2号',
        },
        {
          key: getRandom(),
          name: '胡彦祖',
          age: 22,
          address: '西湖区湖底公园3号',
        },
      ],
      totalCount: 198,
    };
  }, 500);

export default () => {
  const [
    { data, loading, total, pagination },
    { onChange /** updateQuery * */ },
  ] = useTable(serivces);

  const totalPage = Math.ceil(total / pagination.pageSize);

  const onNext = () => {
    onChange(pagination.pageNum + 1, pagination.pageSize);
  };
  const onPrev = () => {
    onChange(pagination.pageNum - 1, pagination.pageSize);
  };

  return (
    <Wrapper label="useTable" time="2020-08-26">
      <p>{loading ? '加载中...' : '加载完成'}</p>
      <p>
        {` 共有 ${total} 条 , 第 ${pagination.pageNum}/${Math.ceil(
          total / pagination.pageSize,
        )}页`}
      </p>
      <table border="1">
        <tbody>
          <tr>
            {Columns.map(c => (
              <th key={c}>{c}</th>
            ))}
          </tr>
          {data.map(i => {
            return (
              <tr key={i.key}>
                {Columns.map(column => (
                  <td key={column}>{i[column]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Space />

      <Button onClick={onPrev} disabled={pagination.pageNum - 1 === 0}>
        上一页
      </Button>
      <Button
        style={{ marginLeft: 24 }}
        onClick={onNext}
        disabled={pagination.pageNum + 1 > totalPage}
      >
        下一页
      </Button>
      <Description>
        useTable，提取了Table组件的分页、请求、响应处理、加载状态逻辑，通过暴露的方法来修改分页、更改查询参数后重新发起请求。
        主要用于Antd Table组件的状态hook抽离。
      </Description>
    </Wrapper>
  );
};
