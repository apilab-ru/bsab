import styles from './progress-loader.module.scss';
import React from "react";

export interface ProgressLoaderProps {
  className?: string;
}

export function ProgressLoader({ className }: ProgressLoaderProps) {
  return (
    <div className={styles.loader + ' ' + className}></div>
  );
}

export default ProgressLoader;
