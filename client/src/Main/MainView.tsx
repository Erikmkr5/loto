import { Provider } from 'mobx-react';
import { SelectionGrid, SelectionResults } from '../Components';
import { TestView } from '../Components/SimpleExamples/TestView';
import { SERVICES, STORES } from '../Shared/enum';
import { SelectionGridModelFactory, TestModelFactory, DrawModelsFactory } from '../Factories';
import { ApiService } from '../Services/ApiService';

const Stores = {
  [STORES.SELECTION_GRID]: SelectionGridModelFactory(),
  [STORES.TEST_STORE]: TestModelFactory(),
  [STORES.DRAW]: DrawModelsFactory()
}

const Services = {
  [SERVICES.API_SERVICE]: new ApiService()
};

export const MainView = () => {
  return <div className={'lotto-main'}>
    <Provider {...Stores} {...Services}>
      <div className={'container'}>
        <div className={'row'}>
          <div className={'col-12'}>
            <h1>SELECT ITEMS</h1>
            <SelectionGrid />
            <hr />
            <h3>SELECTION</h3>
            <SelectionResults />
          </div>
          <div className={'col-12'}>
            <TestView />
          </div>
        </div>
      </div>
    </Provider>
  </div>;
};