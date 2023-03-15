import { DEFAULT_LIMIT, DEFAULT_SELECTION_LIMIT } from '../Components/SelectionGrid/misc/cnst';
import { ISelectionGridModel } from '../Shared/types';
import { observable } from 'mobx';
import { isNull } from '../Shared/utils';

export const SelectionGridModelFactory = (
  limit: number = DEFAULT_LIMIT,
  selectionLimit: number = DEFAULT_SELECTION_LIMIT
): ISelectionGridModel => {
  const model: Partial<ISelectionGridModel> = observable({
    _selection: new Set<number>(),

    _items: new Set<number>([...Array(limit).keys()].map(i => i + 1)),

    _selectionLimit: selectionLimit,

    isSelected: (val: number): boolean => model._selection.has(val),

    toggle: (val: number, state: boolean = null): ISelectionGridModel => {
      (isNull(state)
          ? !model._selection.has(val)
          : !!state
      )
        ? model.capacity && model._selection.add(val)
        : model._selection.delete(val);

      return model as ISelectionGridModel;
    },

    dropSelection: (): ISelectionGridModel => {
      model.selection.forEach(n => model.toggle(n, false));
      return model as ISelectionGridModel;
    },

    selectRandom: (): ISelectionGridModel => {
      const items = model.items
        .sort(() => Math.random() > .5 ? 1 : -1)
        .filter(val => !model.isSelected(val))
        .slice(0, model.capacity);

      items.forEach(val => model.toggle(val, true));

      return model as ISelectionGridModel;
    }
  });

  Object.defineProperties(model, {
    capacity: {
      get: () => model._selectionLimit - model._selection.size
    },
    items: {
      get: () => Array.from(model._items.values())
    },
    selection: {
      get: () => Array.from(model._selection.values())
    }
  });

  return model as ISelectionGridModel;
};