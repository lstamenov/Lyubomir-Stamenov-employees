import React, { useEffect, useMemo, useState } from "react";
import { parseDate } from "../utils/dateParser";
import { Record } from "../types";
import { mapInputRecordsToProjects, mapProjectToEmployeesWorkingTogether } from "../utils/dataMapper";

export const useReadCSV = () => {
  const [file, setFile] = useState<File>();
  const [records, setRecords] = useState<Record[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const reader: FileReader = new FileReader();

  // handles file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecords([]);
    setHasError(false);
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // maps csv file to an array of type Record
  const onFileReaderLoad = (event: ProgressEvent<FileReader>) => {
    const csvOutput = event.target?.result;

    if (!csvOutput) {
      setHasError(true);
      return;
    }

    const reggex = new RegExp(/[^'"\n\r]+/g);
    const csvData = csvOutput.toString();
    let currentLine = reggex.exec(csvData);

    while (currentLine) {
      const [employeeId, projectId, dateFromAsString, dateToAsString] =
        currentLine[0].split(/,\s+/);
      const dateFrom: Date = parseDate(dateFromAsString);
      const dateTo: Date = parseDate(dateToAsString);

      if (!projectId || !employeeId) {
        currentLine = reggex.exec(csvData);
        continue;
      }

      const employeeRecord: Record = {
        employeeId,
        projectId,
        dateFrom,
        dateTo,
      };

      setRecords((prev) => [...prev, employeeRecord]);
      currentLine = reggex.exec(csvData);
    }
  };


  const handleParseFile = () => {
    if (!file) return;

    reader.onload = onFileReaderLoad;
    reader.readAsText(file);
  };

  // maps an array of type Record to an array of type Project holding information about projects and it's employees
  const projects = useMemo(
    () => mapInputRecordsToProjects(records),
    [records, mapInputRecordsToProjects]
  );

  // groups employees which have worked together and sorts them by days working together in descending order
  const employeesWorkingTogether = useMemo(
    () =>
      projects
        .map(mapProjectToEmployeesWorkingTogether)
        .flat()
        .sort((a, b) => b.daysWorkingTogether - a.daysWorkingTogether),
    [projects, mapProjectToEmployeesWorkingTogether]
  );

  useEffect(() => {
    handleParseFile();
  }, [file]);

  return { handleFileChange, employeesWorkingTogether, hasError };
};
