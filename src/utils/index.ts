// 过滤掉所有的HTML标签
const remoHTMLTag = str => {
  return typeof str === 'string' ? str.replace(/<[^>]+>/g, '') : str;
};
// 除了without 的标签外，其他的HTML标签都过滤掉
const removeHTMLTagWithout = (str, without) => {
  // without  =  font|/font|div|/div
  return typeof str === 'string'
    ? str.replace(new RegExp(`(?!<(${without}).*?>)<.*?>`, 'gm'), '')
    : str;
};
// Entity字符转成HTMLtag
const entityToHTMLTag = str => {
  return typeof str === 'string'
    ? str
        .replace(/<\/?[^>]*>/g, '')
        .replace(/[|]*\n/, '')
        .replace(/&npsp;/gi, '')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
    : str;
};

const u = window.navigator.userAgent;
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
export const isIOS = /(iPhone|iPad|iPod|iOS|Mac)/i.test(u);
