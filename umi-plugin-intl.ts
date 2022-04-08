// add react-intl into umiExports
// and usage in your component : import { useIntl } from 'umi';
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
