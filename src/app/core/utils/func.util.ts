export const getStatusKey = (keyword: string): boolean | null => {
  let statusKey: boolean | null = null;
  if ('active'.includes(keyword)) {
    statusKey = true;
  } else if ('inactive'.includes(keyword)) {
    statusKey = false;
  }
  return statusKey;

}
