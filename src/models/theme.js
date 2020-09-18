import StorageTool from 'tools/StorageTool';
import { addClassName, clearClassName } from 'utils/dom';

export const Themes = {
  NORMAL: 'theme-normal',
  DARK: 'theme-dark',
};

export default {
  namespace: 'theme',
  state: {
    theme: Themes.NORMAL,
  },
  subscriptions: {
    setup({ dispatch }) {
      const theme = StorageTool.get('theme', Themes.NORMAL);
      dispatch({ type: 'update/theme', payload: { theme } });
    },
  },
  effects: {
    /**
     * 切换主题
     */
    *changeTheme({ payload }, { put }) {
      const { theme = Themes.NORMAL } = payload;
      yield put({ type: 'update/theme', payload: { theme } });
      return 'HELLO WORLD';
    },
  },
  reducers: {
    'update/theme': (state, { payload }) => {
      const { body } = document;
      const { theme = Themes.NORMAL } = payload;
      clearClassName(body);
      addClassName(body, theme);
      StorageTool.set('theme', theme);
      return { ...state, theme };
    },
  },
};
