import React from 'react';
import Wrapper from 'components/Wrapper';
import MarQuee from 'components/MarQuee';
import Description from 'components/Description';
import Part from 'components/Part';

export default () => {
  return (
    <Wrapper label="MarQuee" time="2021-07-28">
      <Part>正常速度</Part>
      <MarQuee>
        蛮蚊淡恋电硷笋米秤豆隙油表凶苦祖吭柜甩闹蜕幅扣轲…胎搏差额！车亭状摇处帝囊埃耙迫占哟痢俭兹由绵马秧！煮悄扩踪舆跟撇甲眼洞撒允锦碍际铂析浦症庭汰戊喊砾绝币扩锈兼隘食蝶答享猛娟本陆巢使嘴瞅它留因露谣腹榴兔尔同惠酒钦蹈由胡艰帮满显，慢续招党寮畜击堵轴驯零呼垮汽魁质冒数郎吓肯。普汗藏糖战坛诞地管阎微王坑吨离渍蔑。
        功环捍昭验否巾谷梨早畴摧帐押弱蚊姓杀陷炎肢祖唉十罕，蝗仆丢拼。琼谁监躁赠戊羊己钵血叛昨新狱衷迁甜威丽晶刽妄汉受刹毁篮泡号拍俘冰灰教嘲鼠熏译裹佩招梭蝗凿棋栗煌燕媒柳晋盒晰超阀遍西何蛄钓泄县盈臼始撮象上腋推侮镁俘面延迈！伍况粹？骗痹暂段燕寇图南虚警嘛退议臀眶骤裹肺籽喘藻埂监拓秋酱竖开栽，髓。
      </MarQuee>
      <Part>速度较快</Part>
      <MarQuee speed={80}>
        Originally, chunks (and modules imported inside them) were connected by
        a parent-child relationship in the internal webpack graph. The
        CommonsChunkPlugin was used to avoid duplicated dependencies across
        them, but further optimizations where not possible Since version 4 the
        CommonsChunkPlugin was removed in favor of optimization.splitChunks and
        optimization.runtimeChunk options. Here is how the new flow works.
      </MarQuee>
      <Description>
        [2021-07-28] MarQuee 文字走马灯组件，根据滚动宽度生成
        keyframes，插入到页面中，并添加CSS相关类来实现的。
      </Description>
    </Wrapper>
  );
};
