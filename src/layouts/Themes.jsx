import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import Swtich from 'components/Form/Switch';
import { Themes } from 'models/theme';
import styles from './Themes.less';

function ThemesComponent({ theme, dispatch }) {
  const [value, set] = useState(theme === Themes.DARK);
  const onChange = v => {
    set(v);
    dispatch({
      type: 'theme/changeTheme',
      payload: { theme: v ? Themes.DARK : Themes.NORMAL },
    });
  };

  return ReactDOM.createPortal(
    <div className={styles.root}>
      <Swtich value={value} onChange={onChange} />
    </div>,
    document.getElementById('root'),
  );
}

export default connect(store => ({
  theme: store.theme.theme,
}))(ThemesComponent);
