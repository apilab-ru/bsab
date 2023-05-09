import styles from './file-control.module.scss';
import React, { ReactNode } from "react";

export interface FileControlProps {
  children: ReactNode;
  className?: string;
  fileChange?: (file: File) => void;
}

export function FileControl({ children, className, fileChange }: FileControlProps) {
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      if (fileChange) {
        fileChange(file);
      }
    }
  }

  return (
    <label className={styles.label + ' ' + className}>
      <span>{ children }</span>
      <input className={styles.file} type='file' accept={'.mp4'} onChange={onFileChange}/>
    </label>
  );
}

export default FileControl;
