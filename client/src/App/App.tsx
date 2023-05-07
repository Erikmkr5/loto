import { inject, observer, Provider } from 'mobx-react';
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from './App.routes';
import { Header } from '../Header/Header';
import {SERVICES, STORES} from "../Shared/enum";
import {DrawModelsFactory, SelectionGridModelFactory, TestModelFactory} from "../Factories";
import {AppUser} from "../Factories/UserModel";
import {ApiService} from "../Services/ApiService";

const services = {
  appRoutes: new AppRoutes(),
  [SERVICES.API_SERVICE]: new ApiService()

};

const Stores = {
  [STORES.TEST_STORE]: TestModelFactory(),
  [STORES.USER_STORE]: new AppUser(),
  [STORES.SELECTION_GRID]: SelectionGridModelFactory(),
  [STORES.DRAW]: DrawModelsFactory()
}


export const App = observer(() => {
    const apiService: ApiService = services[SERVICES.API_SERVICE];
    const user: AppUser = Stores[STORES.USER_STORE]
    console.log(user)

    const restoreSession = (token) => {
        apiService.restoreSession(token)
            .then(
                (res) => {
                    console.log(res)
                    const { email, name, surname, age, _id } = res.data;
                    user.setUserData({
                        email: email,
                        name: name,
                        surname: surname,
                        age: age,
                        uid: _id
                    })
                }
            )
            .catch(err => console.log(err));
    };


  if (localStorage.getItem('token')) {
      const token = localStorage.getItem("token");
      console.log(token);
      restoreSession(token)

  }

  return <Provider {...Stores} {...services}>
    <Header title={'LOTTO'} />
    <RouterProvider router={services.appRoutes.router} />
  </Provider>;
});