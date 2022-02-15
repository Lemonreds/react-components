function getIEVersion() {
  const { userAgent } = window.navigator;
  const isIE =
    userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE;
  const isIE11 =
    userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    // eslint-disable-next-line dot-notation
    const fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion === 7) return 7;
    if (fIEVersion === 8) return 8;
    if (fIEVersion === 9) return 9;
    if (fIEVersion === 10) return 10;
    return 6;
  }
  if (isEdge) return 'edge';
  if (isIE11) return 11;
  return -1;
}

const ieVersion = getIEVersion();
const isIEBrowser = ieVersion !== -1 && ieVersion !== 'edge';

const setStyle = (dom, styleName, styleValue) => {
  if (dom) {
    const { style } = dom;
    style[styleName] = styleValue;
  }
};

export { isIEBrowser, ieVersion, setStyle };
