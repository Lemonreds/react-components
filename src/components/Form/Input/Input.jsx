import React, { useRef } from 'react';
import useValueChange from 'hooks/useValueChange';
import styles from './Input.less';

function Input(props) {
  const ref = useRef();
  const [value, setValue] = useValueChange(props);
  const { placeholder, style } = props;

  const onChange = e => {
    setValue(e.target.value);
  };
  const toFocus = e => {
    ref.current.focus();
    e.stopPropagation();
  };
  return (
    <div className={styles.container} style={style}>
      <input
        ref={ref}
        type="input"
        className={styles.input}
        value={value || ''}
        onChange={onChange}
        placeholder="placeholder"
      />
      <div className={styles.line} />
      <div className={styles.label} onClick={toFocus}>
        {placeholder}
      </div>
    </div>
  );
}

export default Input;
