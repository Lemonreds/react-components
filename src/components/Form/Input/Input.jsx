import React from 'react';
import useValueChange from 'hooks/useValueChange';
import styles from './Input.less';

function Input(props) {
  const [value, setValue] = useValueChange(props);
  const { placeholder, style } = props;

  const onChange = e => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.container} style={style}>
      <input
        type="input"
        className={styles.input}
        value={value || ''}
        onChange={onChange}
        placeholder="placeholder"
      />
      <div className={styles.line} />
      <div className={styles.label}>{placeholder}</div>
    </div>
  );
}

export default Input;
