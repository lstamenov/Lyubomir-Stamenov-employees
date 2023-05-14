import { EmployeesWorkingTogether, Project, Record as RecordT } from "../types";
import { getDaysDifference } from "./dateParser";

export const mapInputRecordsToProjects = (records: RecordT[]): Project[] => {
  const projects: Record<string, Project> = {};

  records.forEach(({ projectId, ...rest }) => {
    let currentProject: Project = projects[projectId];

    if (!currentProject) {
      currentProject = {
        projectId,
        employees: [rest],
      };
      projects[projectId] = currentProject;
    } else {
      currentProject.employees = [...currentProject.employees, rest];
    }
  });

  return Object.keys(projects).map((projectId) => projects[projectId]);
};

export const mapProjectToEmployeesWorkingTogether = (
  project: Project
): EmployeesWorkingTogether[] => {
  const { projectId, employees } = project;
  let employeesWorkingTogether: EmployeesWorkingTogether[] = [];

  if (employees.length <= 1) return employeesWorkingTogether;

  for (let i = 0; i < employees.length - 1; i++) {
    for (let j = i + 1; j < employees.length; j++) {
      const firstEmployee = employees[i];
      const secondEmployee = employees[j];

      const dateFrom = Math.max(
        firstEmployee.dateFrom.getTime(),
        secondEmployee.dateFrom.getTime()
      );
      const dateTo = Math.min(
        firstEmployee.dateTo.getTime(),
        secondEmployee.dateTo.getTime()
      );
      const daysWorkingTogether = getDaysDifference(dateFrom, dateTo);

      const newEntry: EmployeesWorkingTogether = {
        daysWorkingTogether,
        firstEmployeeId: firstEmployee.employeeId,
        secondEmployeeId: secondEmployee.employeeId,
        projectId,
      };

      employeesWorkingTogether = [...employeesWorkingTogether, newEntry];
    }
  }

  return employeesWorkingTogether;
};
