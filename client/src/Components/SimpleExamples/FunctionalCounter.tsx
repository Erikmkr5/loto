// import {  } from 'mobx-react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ICounter } from './Types';
import { getButtonsSet } from './Helpers';

export const getCounterModel = (): ICounter => {
  const countStore = observable<ICounter>({
    value: 0,
    update: (d: number) => countStore.value += d
  });

  return countStore;
};

const FunctionalCounterComponent = observer(({countStore}: {countStore: ICounter}) => {
  const buttons = getButtonsSet();

  return <div className={'counter-form'}>
    <h1>FUNCTIONAL</h1>
    <input
      type={'text'}
      className={'counter-form__display'}
      value={countStore.value}
      readOnly={true}
      disabled={true}
    />
    {buttons.map((n, i) => {
      return <button
        className={"counter-form__button"}
        key={`btn_${i}`}
        onClick={() => countStore.update(n)}>
        <span>{n}</span>
      </button>;
    })}
  </div>;
});

const FunctionalCounter = () => <FunctionalCounterComponent countStore={getCounterModel()} />;

export default FunctionalCounter;
