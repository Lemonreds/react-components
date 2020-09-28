import React, { useRef } from 'react';
import cn from 'classnames';
import useValueChange from 'hooks/useValueChange';
import styles from './Input.less';

function Input(props) {
  const ref = useRef();
  const [value, setValue] = useValueChange(props);
  
  const { placeholder, style, bordered ,...rest} = props;

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
        className={cn(styles.input, { [styles.bordered]: bordered })}
        value={value || ''}
        onChange={onChange}
        placeholder="placeholder"
        {...rest}
      />
      {!bordered && <div className={styles.line} />}
      <div className={styles.label} onClick={toFocus}>
        {placeholder}
      </div>
    </div>
  );
}

export default Input;
