import React from "react";
import styles from "./css/PongSlider.module.css";

export function PaddleSlider() {
  return <div className={styles.slider}>
    <div className={styles.paddle}/>
  </div>
}