import React from "react";
import styles from "./Tooltip.less";

function Tooltip({ data }) {
  const { name, value } = data;
  return (
    <div className={styles.root}>
      {name}
      ：
      {`lng: ${value[0]} , lat: ${value[1]}`}
    </div>
  );
}

export default Tooltip;
