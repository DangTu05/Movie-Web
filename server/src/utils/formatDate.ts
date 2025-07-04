const formatDate = (date: Date): string => {
  // date:2025-06-05T00:00:00.000+00:00
  return date.toISOString().split("T")[0]; //'2025-07-02T14:36:51.000Z'->["2025-07-02","14:36:51.000Z"]
};
export { formatDate };
