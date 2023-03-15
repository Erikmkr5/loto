import { inject, observer } from 'mobx-react';
import { STORES } from '../../Shared/enum';
import { asClassList } from '../../Shared/utils';

export const TestView = inject(STORES.TEST_STORE)(observer(
  (props) => {
    const model = props.TestModel;
    const classList = asClassList(['btn', model.value ? 'btn-success' : 'btn-danger']);

    return <button
      className={classList}
      onClick={() => model.toggle()}
    >
      <span>{model.value ? 'OFF' : 'ON'}</span>
    </button>
  }
));