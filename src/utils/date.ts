export const startOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
};

export const endOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setUTCHours(23, 59, 59, 999);
  return newDate;
};

export const durationInMinutes = (from: Date | string, to: Date | string): number => {
  const diff = new Date(to).getTime() - new Date(from).getTime();
  const millisecondsInMinute = 60000;
  return Math.floor(diff / millisecondsInMinute);
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return startOfDay(date1).toUTCString() === startOfDay(date2).toUTCString();
};

export const formateTaskDate = (date: Date | string): string => {
  return new Date(date).toISOString().split('T')[0];
};

export const isDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};
