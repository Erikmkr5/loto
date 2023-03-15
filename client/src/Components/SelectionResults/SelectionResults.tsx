import { inject, observer } from 'mobx-react';
import { IDrawModel } from '../../Shared/types';
import './SelectionResults.scss';
import { SERVICES, STORES } from '../../Shared/enum';
import { ApiService } from '../../Services/ApiService';
import { asClassList } from '../../Shared/utils';

const SelectionResult = inject(
  STORES.SELECTION_GRID,
  STORES.DRAW
)(observer(props => {
  const model = props[STORES.SELECTION_GRID];
  const draw = props[STORES.DRAW];
  const item = props.item;
  const classList = asClassList([
    'btn selection-results__item',
    draw.coincidences.includes(item) ? 'btn-success' : 'btn-secondary'
  ]);

  return <button
    className={classList}
    onClick={() => model.toggle(item, false)}
  >
    <b>{item}</b>
  </button>

}));

const SelectionControls = inject(
  SERVICES.API_SERVICE,
  STORES.DRAW
)(observer((props) => {
  const model = props.model;
  const draw: IDrawModel = props[STORES.DRAW];
  const apiService: ApiService = props[SERVICES.API_SERVICE];
  const selection = model.selection;

  const createDraw = () => {
    apiService.createDraw()
      .then(({data}) => {
        draw.uid = data.uid;
      })
      .catch(err => console.log(err));
  };

  const getDraws = () => {
    apiService.getDraws()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const checkDraw = () => {
    apiService.checkDraw(draw.uid, selection)
      .then(({data}) => {
        draw.coincidences = data;
      })
      .catch(err => console.log(err));
  };

  return <div className={'selection-results__controls'}>
    <div className={'selection-results__buttons-set'}>
      <button
        className={'btn btn-primary selection-results__button'}
        disabled={!!model.capacity || !draw.uid}
        onClick={() => checkDraw()}>
        <span>CHECK</span>
      </button>
      <button
        className={'btn btn-secondary selection-results__button'}
        disabled={!model.capacity}
        onClick={() => model.selectRandom()}>
        <span>RANDOM</span>
      </button>
      <button
        className={'btn btn-danger selection-results__button'}
        disabled={!selection.length}
        onClick={() => model.dropSelection()}>
        <span>RESET</span>
      </button>
    </div>
    <div className={'selection-results__buttons-set'}>
      <button
        className={'btn btn-success selection-results__button'}
        onClick={() => createDraw()}>
        <span>CREATE</span>
      </button>
      <button
        className={'btn btn-warning selection-results__button'}
        onClick={() => getDraws()}>
        <span>VIEW</span>
      </button>
    </div>
  </div>;
}));

export const SelectionResults = inject(
  STORES.SELECTION_GRID,
)(observer((props) => {
  const model = props[STORES.SELECTION_GRID];
  const selection = model.selection;
  return <div className={'selection-results'}>
    <div className={'selection-results__items'}>{
      selection.map((item, i) => <SelectionResult model={model} item={item} key={i} />)
    }</div>
    <SelectionControls model={model} />
  </div>
}));