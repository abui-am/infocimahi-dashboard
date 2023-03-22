export const cleanObject = (obj: Record<string, unknown>) => {
  const newObj = { ...obj };
  Object.keys(obj).forEach((key) => {
    if (newObj[key] === undefined) {
      delete newObj[key];
    }
  });

  return newObj;
};
