export const getRefetchInterval = (refreshInterval: string) =>
  Number.isInteger(Number(refreshInterval)) ? Number(refreshInterval) : false
