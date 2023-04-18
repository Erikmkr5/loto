import { createBrowserRouter, generatePath } from 'react-router-dom';

export class AppRoutes {

  public readonly router: any;

  public readonly routes: any = [
    {
      name: 'home',
      path: '/',
      element: <h1>HOME</h1>
    },
    {
      name: 'anotherRoute',
      path: '/anotherRoute',
      element: <h1>ANOTHER ROUTE</h1>
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

    console.log(route);

    const path = this.routes.find(r => r.name === route)?.path;
    this.router.navigate(path ? generatePath(path, params) : '404');
  };

  constructor() {
    this.router = createBrowserRouter(this.routes);

    console.log(this.routes);

  }
}