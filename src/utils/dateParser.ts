export const parseDate = (dateAsString: string): Date => {
  let date: Date;

  if (dateAsString === "NULL") {
    date = new Date();
  } else {
    date = new Date(dateAsString);
  }

  return date;
};

export const getDaysDifference = (
  startMilliseconds: number,
  endMilliseconds: number
): number => {
  const millisecondsInADay = 1000 * 60 * 60 * 24;

  if (startMilliseconds > endMilliseconds) return 0;

  return (endMilliseconds - startMilliseconds) / millisecondsInADay;
};

