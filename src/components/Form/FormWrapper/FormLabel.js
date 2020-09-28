import React, { memo } from "react";
import styles from "./FormLabel.less";

function FormLabel({ isRequired, label }) {
  return (
    <div className={styles.formlabel}>
      <span className={styles.required}>{isRequired && "*"}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default memo(FormLabel);
