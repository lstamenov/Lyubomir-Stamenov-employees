import React from "react";
import { useReadCSV } from "../hooks/useReadCSV";
import EmployeesTable from "../components/EmployeesTable/EmployeesTable";
import UploadButton from "../components/UploadButton/UploadButton";
import styles from "./App.module.css";

const App: React.FC = () => {
  const { handleFileChange, employeesWorkingTogether, hasError } = useReadCSV();

  return (
    <div className={styles.page}>
      <UploadButton onChange={handleFileChange} />
      <EmployeesTable employees={employeesWorkingTogether} hasError={hasError} />
    </div>
  );
};

export default App;
