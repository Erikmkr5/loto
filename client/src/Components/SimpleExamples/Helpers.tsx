export const getButtonsSet = (N: number = 10): number[] => {
  return Array.from( new Set<number>([...Array(N).keys()].map(key => (key + 1) - (N * .5))));
};