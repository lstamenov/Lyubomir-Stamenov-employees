export type Record = {
  employeeId: string;
  projectId: string;
  dateFrom: Date;
  dateTo: Date;
};

export type Project = {
  projectId: string;
  employees: {
    employeeId: string;
    dateFrom: Date;
    dateTo: Date;
  }[];
};

export type EmployeesWorkingTogether = {
  firstEmployeeId: string;
  secondEmployeeId: string;
  daysWorkingTogether: number;
  projectId: string;
};
