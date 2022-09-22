import React, { useEffect, useState } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import { TAG, pick } from 'tools/RichTextPick';
import Part from 'components/Part';

const richText = `<p>p标签</p><p>p标签</p><img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /><span>span标签</span><video src="//player.alicdn.com/video/aliyunmedia.mp4"></video><div>div标签</div>`;

export default () => {
  const [result, setResult] = useState();
  useEffect(() => {
    const d = pick(richText);
    setResult(d);
  }, []);
  return (
    <Wrapper label="富文本HTML标签提取" time="2022-09-20">
      <Part>富文本内容</Part>
      <p>{richText}</p>
      <Part>处理后，提取了img标签和video标签，可以s受用自定义组件来渲染</Part>

      <Part>nodesMap</Part>
      <p>{JSON.stringify(result?.nodesMap || {})}</p>

      <Part>nodeSplits</Part>
      <p>{JSON.stringify(result?.nodeSplits || {})}</p>
      <Description>
        富文本HTML标签提取，能提取img/video（或者其他标签），使用自定义组件来渲染。
      </Description>
    </Wrapper>
  );
};
