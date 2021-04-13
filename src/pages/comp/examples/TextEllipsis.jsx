import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import TextEllipsis from '@/components/TextEllipsis';

export default () => {
  return (
    <Wrapper label="TextEllipsis" time="2021-04-13">
      英文，宽度500px
      <TextEllipsis
        style={{
          width: 500,
          marginBottom: 24,
          background: 'gray',
          color: '#fff',
        }}
        value="The following contents should be invisible in home/archive page.The following contents should be invisible in home/archive page."
      />
      中文，宽度500px
      <TextEllipsis
        style={{
          width: 500,
          marginBottom: 24,
          background: 'gray',
          color: '#fff',
        }}
        value="豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。"
      />
      宽度100%
      <TextEllipsis
        style={{
          width: '100%',
          marginBottom: 24,
          background: 'gray',
          color: '#fff',
        }}
        value="豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。"
      />
      <Description>
        TextEllipsis
        单行文本省略组件，通过Cavans的measureText来循环计算能展示的最长文本。
      </Description>
    </Wrapper>
  );
};
