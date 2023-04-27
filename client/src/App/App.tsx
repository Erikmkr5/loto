import { inject, observer, Provider } from 'mobx-react';
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from './App.routes';
import { Header } from '../Header/Header';
import {STORES} from "../Shared/enum";
import {DrawModelsFactory, SelectionGridModelFactory, TestModelFactory} from "../Factories";
import {AppUser} from "../Factories/UserModel";

const services = {
  appRoutes: new AppRoutes()
};

const Stores = {
  [STORES.TEST_STORE]: TestModelFactory(),
  [STORES.USER_STORE]: new AppUser()
}

export const App = observer(() => {

  return <Provider {...Stores} {...services}>
    <Header title={'LOTTO'} />
    <RouterProvider router={services.appRoutes.router} />
  </Provider>;
});