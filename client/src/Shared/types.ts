export interface ISelectionGridModel {
  _selection: Set<number>;
  _items: Set<number>;
  _selectionLimit: number;

  isSelected: (val: number) => boolean;
  toggle: (val: number, state?: boolean) => ISelectionGridModel;
  dropSelection: () => ISelectionGridModel;
  selectRandom: () => ISelectionGridModel;
  capacity: number;
  selection: number[];
  items: number[];
}

export interface IDrawModel {
  _uid?: string;
  _values?: Set<number>;
  _coincidences?: Set<number>;

  uid?: string;
  values?: [];
  coincidences?: [];
}

export interface IUserModel {
  _uid?: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  password?: string;
}
