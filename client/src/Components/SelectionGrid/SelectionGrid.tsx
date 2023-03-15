import { inject, observer } from 'mobx-react';
import { ISelectionGridModel } from '../../Shared/types';
import { splitOnChunks } from './misc/utils';
import './SelectionGrid.scss';
import { asClassList } from '../../Shared/utils';
import { STORES } from '../../Shared/enum';

const SelectionGridItem = inject(
  STORES.SELECTION_GRID,
  STORES.DRAW
)(observer(props => {
  const model = props[STORES.SELECTION_GRID];
  const draw = props[STORES.DRAW];
  const item = props.item;

  const isSelected = model.isSelected(item);
  const isDisabled = !isSelected && !model.capacity;
  const isSucceed = draw.coincidences.includes(item);
  const classList = asClassList([
    'btn',
    !isSelected
      ? 'btn-outline-secondary'
      : isSucceed
      ? 'btn-success'
      : 'btn-secondary',
    'selection-grid__item'
  ]);

  return <button
    className={classList}
    disabled={isDisabled}
    onClick={() => model.toggle(item)}
  >
    <b>{item}</b>
  </button>
}));

const SelectionGridRow = observer(({model, items}: {model: ISelectionGridModel, items: number[]}) => {
  return <div className={'selection-grid__row'}>{
    items.map((d, i) => <SelectionGridItem model={model} item={d} key={i} />)
  }</div>;
});

const SelectionGridMain = observer(({model, rows}: {model: ISelectionGridModel, rows: number[][]}) => {
  return <div className={'selection-grid'}>{
    rows.map((items, i) => {
      return <SelectionGridRow model={model} items={items} key={i} />
    })
  }</div>;
});

export const SelectionGrid = inject(
  STORES.SELECTION_GRID
)(observer(props => {
  const model = props[STORES.SELECTION_GRID];
  return <SelectionGridMain model={model} rows={splitOnChunks(model.items)} />;
}));
