// add react-intl into umiExports
// and usage in your component : import { useIntl } from 'umi';

/**
 * @plugin umi-plugin-intl
 * @des  
   不使用umi-locacle-plugin时，umi 不会增加 react-intl 的导出
   这个插件可以增加默认的 useIntl 导出到 umi，组件中可以 import { useIntl } from 'umi' 或者 import { useIntl } from 'react-intl' 来使用
 * @by lmh
 * @at 2021-04-14
 *
 */
export default function(api) {
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: 'plugin-intl/rcintl.js',
      content: `
        const { useIntl } = require('react-intl');
        export { useIntl };
        `,
    });
  });

  api.addUmiExports(() => {
    return {
      exportAll: true,
      source: '../plugin-intl/rcintl.js',
    };
  });
}
