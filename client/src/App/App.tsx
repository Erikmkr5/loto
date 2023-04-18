import { inject, observer, Provider } from 'mobx-react';
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from './App.routes';
import { Header } from '../Header/Header';

const services = {
  appRoutes: new AppRoutes()
};

export const App = observer(() => {

  return <Provider {...services}>
    <Header title={'HELLO WORLD'} />
    <RouterProvider router={services.appRoutes.router} />
  </Provider>;
});