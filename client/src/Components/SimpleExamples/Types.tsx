export interface ICounter {
  value: number;
  update: (d: number) => void;
}