import React, { memo } from 'react';
import styles from './FormValue.less';

function FormValue({ children, errors }) {
  const hasErrors = Array.isArray(errors) && errors.length > 0;
  return (
    <div className={styles.formValue}>
      <div className={styles.children}>{children}</div>
      <div className={styles.errorsWrapper}>
        {hasErrors && <span className={styles.error}>{errors[0]}</span>}
      </div>
    </div>
  );
}

export default memo(FormValue);
