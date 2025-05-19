export const isObjectEmpty = (obj: object | null) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

export const getYearRange = (offset: number): string[] => {
  const result: string[] = [];
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - offset;
  const endYear = currentYear + offset;

  for (let i = startYear; i < endYear; i++) {
    result.push(String(i));
  }

  return result;
};
