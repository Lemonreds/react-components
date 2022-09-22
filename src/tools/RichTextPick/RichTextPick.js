const TAG = {
  VEDIO: '__vedio__',
  IMG: '__img__',
};

const createConfig = () => [
  {
    type: 'vedio',
    reg: RegExp(/<video.*?>.*?<\/video>/),
    placeholoer: TAG.VEDIO,
    matches: [],
  },
  {
    type: 'img',
    reg: RegExp(/<img.*?\/>/),
    placeholoer: TAG.IMG,
    matches: [],
  },
];

function pick(richText) {
  const nodeConfig = createConfig();

  // 并且将匹配的字符串，push进入mathes
  let finalText = richText;
  for (const d of nodeConfig) {
    const { reg, placeholoer, type, matches } = d;

    finalText = finalText.replace(reg, match => {
      matches.push({ type, origin: match });
      return placeholoer;
    });
  }

  // 转成Map结构
  const nodesMap = nodeConfig.reduce((pre, cur) => {
    const { matches } = cur;
    return matches.length === 0 ? pre : { ...pre, [cur.placeholoer]: matches };
  }, {});

  const split = nodeConfig.map(i => i.placeholoer).join('|');
  const splitReg = RegExp(split, 'g');

  // [__img__,__vedio__]
  const flags = [];

  const p = finalText.match(splitReg);
  for (let i = 0; i < p?.length ?? 0; i += 1) {
    flags[i] = p[i];
  }

  // [<span>123</span>,<span>131</span>,<span>3131</span>]
  const strArray = finalText.split(splitReg);

  // [<span>123</span>,__vedio__,<span>131</span>,__img__,<span>3131</span>,__vedio__]
  const nodeSplits = [];
  for (let i = 0; i < strArray.length; i += 1) {
    nodeSplits.push(strArray[i]);
    if (flags[i]) {
      nodeSplits.push(flags[i]);
    }
  }
  return { nodesMap, nodeSplits };
}

export { TAG, pick };
