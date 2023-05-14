import React from "react";
import styles from "./UploadButton.module.css";

interface UploadButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: React.FC<UploadButtonProps> = (props) => {
  return (
    <label className={styles.uploadBtn}>
      <input className={styles.input} accept=".csv" type="file" {...props} />
      Upload File
    </label>
  );
};

export default UploadButton;
