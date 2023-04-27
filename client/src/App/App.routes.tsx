import { createBrowserRouter, generatePath } from 'react-router-dom';
import { AuthPage } from '../Pages/AuthPage';
import {MainView} from "../Pages/MainView";
import {RegPage} from "../Pages/RegPage";
import {StatPage} from "../Pages/StatPage";

export class AppRoutes {

  public readonly router: any;

  public readonly routes: any = [
    {
      name: 'home',
      path: '/',
      element: <MainView />
    },
    {
      name: 'authPage',
      path: '/authPage',
      element: <AuthPage />,
    },
    {
      name: 'regPage',
      path: '/regPage',
      element: <RegPage />,
    },
    {
      name: 'statPage',
      path: '/statPage',
      element: <StatPage />,
    },
    {
      name: 'withParams',
      path: '/withParams/:someId',
      element: <h1>WITH PARAMS</h1>,
      action: async ({params}) => {
        console.log(params);
      }
    },
    {
      name: '404',
      path: '*',
      element: <h1>NOT FOUND</h1>,
      action: async () => {
        console.log('FCKOFF');
      }
    }

  ];

  public goTo = (route: any = 'home', params: any = null): void => {
    const path = this.routes.find(r => r.name === route)?.path;
    this.router.navigate(path ? generatePath(path, params) : '404');
  };

  constructor() {
    this.router = createBrowserRouter(this.routes);

    console.log(this.routes);

  }
}