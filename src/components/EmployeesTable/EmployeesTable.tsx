import React from "react";
import { EmployeesWorkingTogether } from "../../types";
import styles from "./EmployeesTable.module.css";

interface EmployeesTableProps {
  employees: EmployeesWorkingTogether[];
  hasError: boolean;
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({ employees, hasError }) => {
  const headers = {
    firstEmployeeId: "Employee #1 ID",
    secondEmployeeId: "Employee #2 ID",
    projectId: "Project ID",
    daysTogether: "Days worked together",
  };

  if (hasError) {
    return (
      <h4>Something went wrong.</h4>
    );
  }

  if (employees.length === 0) {
    return (
      <h4>Upload file to see results.</h4>
    );
  }

  return (
    <table className={styles.table}>
      <thead className={styles.headers}>
        <tr>
          {Object.keys(headers).map((value) => (
            <th key={value}>{headers[value as keyof typeof headers]}</th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {employees.map(({ firstEmployeeId, secondEmployeeId, projectId, daysWorkingTogether }) => (
          <tr key={firstEmployeeId + secondEmployeeId + projectId}>
            <td>{firstEmployeeId}</td>
            <td>{secondEmployeeId}</td>
            <td>{projectId}</td>
            <td>{daysWorkingTogether}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeesTable;
